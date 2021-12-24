const App = {
    apiKey: '39d44f53',
    apiUrl: 'https://www.omdbapi.com/',
};

App.init = () => {
    App.app = $('#app'),
    App.searchForm = $('#search-form'),
    App.titleInput = $('input[name="title-input"]'),
    App.yearInput = $('input[name="year-input"]'),
    App.results = $('#results'),
    App.searchForm = $('#search-form'),
    App.searchForm.submit((e) => {
        e.preventDefault();
        App.createLoader();
        App.getMovie(App.titleInput.val(), App.yearInput.val());
    });
};

App.createLoader = () => {
    const loaderElement = $(`<div class="loader"><div>`);
    App.results.empty().append(loaderElement);
};

//TODO: input checks, browser history, finish movie elements
App.getMovie = (title, year) => {
    title = title.trim().replace(/\s/g, '+');
    console.log(`${App.apiUrl}?t=${title}&y=${year}&apikey=${App.apiKey}`);
    $.getJSON(`${App.apiUrl}?s=${title}&y=${year}&type=movie&apikey=${App.apiKey}`).done((data) => {
        App.createMovies(data);
    }).fail((resp) => {
    });
};

App.createMovies = (data) => {
    let moviesContainer = $(`
    <div class ="movies-container"></div>
  `);
    Object.keys(data.Search).forEach(function (key) {
        if (data.Search[key] !== null) {
            $.getJSON(`${App.apiUrl}?i=${data.Search[key].imdbID}&apikey=${App.apiKey}`).done((data) => {
                moviesContainer.append(App.createMovie(data));
            }).fail((resp) => {
                console.log(resp);
            });
        }
    });

    App.results.empty().append(moviesContainer);
};
App.createMovie = (data) => {
    console.log(data);
    let movieElement = $(`
    <div class ="movie">
    </div>
    `);

    movieElement.append(App.createPoster(data.Poster, data.Title));

    let title = $(`
    <div class ="movie-title">
    <p>Title: </p>
    <p>${data.Title}</p>
    </div>
    `);
    movieElement.append(title);

    let year = $(`
    <div class ="movie-year">
    <p>Year: </p>
    <p>${data.Year}</p>
    </div>
    `);
    movieElement.append(year);

    let genre = $(`
    <div class ="movie-genre">
    <p>Genre: </p>
    <p>${data.Genre}</p>
    </div>
    `);
    movieElement.append(genre);

    let runtime = $(`
    <div class ="movie-runtime">
    <p>Runtime: </p>
    <p>${data.Runtime}</p>
    </div>
    `);
    movieElement.append(runtime);

    let director = $(`
    <div class ="movie-director">
    <p>Director: </p>
    <p>${data.Director}</p>
    </div>
    `);
    movieElement.append(director);

    let plot = $(`
    <div class ="movie-plot">
    <p>Plot: </p>
    <p>${data.Plot}</p>
    </div>
    `);
    movieElement.append(plot);

    movieElement.append(App.createRatings(data.Ratings));


    return movieElement;
}

App.createRatings = (data) =>{
    let ratingsContainer = $(`
    <div class ="movie-ratings-container">
    <p>Ratings: </p>
    </div>
    `);
    Object.keys(data).forEach(function (key) {
        let ratingElement = $(`
        <div class ="rating">
        </div>
        `);
        let ratingSource = $(`
        <div class ="rating-source">
        <p>Source: </p>
        <p>${data[key].Source}</p>
        </div>
        `);
        let ratingValue = $(`
        <div class ="rating-value">
        <p>Score: </p>
        <p>${data[key].Value}</p>
        </div>
        `);
        ratingElement.append(ratingSource);
        ratingElement.append(ratingValue);
        ratingsContainer.append(ratingElement);
    });
    return ratingsContainer;
    
}

App.createPoster = (posterUrl, title) =>{
    let posterContainer = $(`
    <div class ="movie-poster-container">
    </div>
    `);
    if(posterUrl !== 'N/A'){
    let posterElement = $(`
    <img class ="movie-poster" src="${posterUrl}" alt="${title}">
    </img>
    `);
    posterContainer.append(posterElement);
    }
    return posterContainer;
}

$(document).ready(() => {
    App.init();
});