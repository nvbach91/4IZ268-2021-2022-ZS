const API_KEY = 'api_key=ccc8923f4778b647253c7f0f5e0f2c6d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');

getMovies(API_URL);

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                <img src="${IMG_URL+poster_path}" alt="${title}">
            
                <div class="movie-info">
                    <h3>${title}</h3>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
                `
        main.appendChild(movieEl);
        
    })
}


/*

*/
