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
            if (App.titleInput.val() !== undefined) {
                App.createLoader();
                App.currentTitle = App.titleInput.val().trim().replace(/\s/g, '+');
                App.currentYear = App.yearInput.val();
                App.getMovie(App.titleInput.val(), App.yearInput.val());
            }
        });
};

App.createLoader = () => {
    const loaderElement = $(`<div class="loader"><div>`);
    App.results.empty().append(loaderElement);
};

App.getMovie = (title, year) => {
    console.log(App.currentTitle, App.currentYear);
    console.log(`${App.apiUrl}?t=${title}&y=${year}&apikey=${App.apiKey}`);
    if (`?titleInput=${App.currentTitle}&yearInput=${App.currentYear}` !== window.location.search) {
        history.pushState({ title: App.currentTitle, year: App.currentYear }, '', `?titleInput=${App.currentTitle}&yearInput=${App.currentYear}`);
    }
    $.getJSON(`${App.apiUrl}?s=${title}&y=${year}&type=movie&apikey=${App.apiKey}`).done((data) => {
        if (data.Response === "True") {
            console.log(data);
            App.createMovies(data);
        } else {
            console.log(data);
            App.createNotFound(data);
        }

    }).fail((resp) => {
        console.log(resp);
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

    let infoContainer = $(`
    <div class ="movie-info-container">
    </div>
    `);

    let title = $(`
    <div class ="movie-info">
    <p>Title: </p>
    <p>${data.Title}</p>
    </div>
    `);
    infoContainer.append(title);

    let year = $(`
    <div class ="movie-info">
    <p>Year: </p>
    <p>${data.Year}</p>
    </div>
    `);
    infoContainer.append(year);

    let genre = $(`
    <div class ="movie-info">
    <p>Genre: </p>
    <p>${data.Genre}</p>
    </div>
    `);
    infoContainer.append(genre);

    let runtime = $(`
    <div class ="movie-info">
    <p>Runtime: </p>
    <p>${data.Runtime}</p>
    </div>
    `);
    infoContainer.append(runtime);

    let director = $(`
    <div class ="movie-info">
    <p>Director: </p>
    <p>${data.Director}</p>
    </div>
    `);
    infoContainer.append(director);

    let plot = $(`
    <div class ="movie-info">
    <p>Plot: </p>
    <p>${data.Plot}</p>
    </div>
    `);

    infoContainer.append(plot);

    infoContainer.append(App.createRatings(data.Ratings));

    movieElement.append(infoContainer);

    return movieElement;
};

App.createRatings = (data) => {
    let ratingsContainer = $(`
    <div class ="movie-ratings-container">
    <p>Ratings: </p>
    </div>
    `);
    Object.keys(data).forEach(function (key) {
        let ratingElement = $(`
        <div class ="rating">
        <p>${data[key].Source}:</p>
        <p>${data[key].Value}</p>
        </div>
        `);
        ratingsContainer.append(ratingElement);
    });
    return ratingsContainer;

};

App.createNotFound = (data) => {
    let notFound = $(`
    <div class ="not-found">
    <p>${data.Error}</p>
    </div>
    `);
    App.results.empty().append(notFound);
};

App.createPoster = (posterUrl, title) => {
    let posterContainer = $(`
    <div class ="movie-poster-container">
    </div>
    `);
    if (posterUrl !== 'N/A') {
        let posterElement = $(`
    <img class ="movie-poster" src="${posterUrl}" alt="${title}">
    </img>
    `);
        posterContainer.append(posterElement);
    }
    return posterContainer;
};

$(document).ready(() => {
    App.init();
    if (!window.location.search) {
        history.replaceState('', '?titleInput=""&yearInput=""');
    } else {
        params = {};
        let pageURL = window.location.search.substring(1);
        let urlParams = pageURL.split('&');
        for (i = 0; i < urlParams.length; i++) {
            let param = urlParams[i].split('=');
            console.log(param);
            if (param[0] === 'titleInput') {
                params.title = param[1];
            }
            if (param[0] === 'yearInput') {
                params.year = param[1];
            }
        }
        console.log(params);
        history.replaceState('', `?titleInput="${params.title}"&yearInput="${params.year}"`);
        App.getMovie(params.title, params.year);
    }

    window.onpopstate = (e) => {
        console.log(e);
        console.log(e.state);
        if (e.state.title === undefined) {
            App.results.empty();
        } else {
            App.getMovie(e.state.title, e.state.year);
        }
    }
});