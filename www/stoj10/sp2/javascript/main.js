//uses API The Movie Database

const showSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerText = 'Loading...';
    const body = document.querySelector('main');
    body.appendChild(spinner);
    
    return spinner;
};

const API_KEY = 'api_key=ccc8923f4778b647253c7f0f5e0f2c6d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

let selectedGenres = []

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    }
]

//creates genres tabs, which can be used as filters, uses the highlightSelection function
function setGenre(tagsEl, main) {
    tagsEl.innerHTML = '';

    genres.forEach(genre => {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.id = genre.id;
        tag.innerText = genre.name;

        tag.addEventListener('click', () => {
            if (selectedGenres.length === 0) {
                selectedGenres.push(genre.id);
            } else {
                if (selectedGenres.includes(genre.id)) {
                    selectedGenres = selectedGenres.filter((id) => id !== genre.id)
                } else {
                    selectedGenres.push(genre.id);
                }
            }
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenres.join(',')), main)
            highlightSelection(tagsEl, main)
        })
        tagsEl.append(tag);
    })
}

//highlighting the tabs, uses the clearBtn function
function highlightSelection(tagsEl, main) {
    //second click will remove the highlight
    $('.tag').each(function () {
        $(this).removeClass('highlight');
    })
    clearBtn(tagsEl, main)
    //first click highlights the tabs
    if ($(selectedGenres).length > 0) {
        $.each(selectedGenres, function (index, id) {
            const highlightedTag = $('#' + id);
            highlightedTag.addClass('highlight')[0]
        })
    }
}

//once genres are selected, a clear button appers and it can reset the selection
function clearBtn(tagsEl, main) {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('highlight')
    } else {
        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenres = [];
            setGenre(tagsEl, main);
            getMovies(API_URL, main);
        })
        tagsEl.append(clear);
    }
}

//creates the movie tabs in the structure with the title, poster and overview
function showMovies(data, main) {
    main.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
        
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

//gets the data from TMDB and uses the showMovies function
async function getMovies(url, main) {
    const spinner = showSpinner();
    try {
        const data = await fetch(url);
        const jsondata = await data.json();
        spinner.remove();
        if (jsondata.results.length !== 0) {
            showMovies(jsondata.results, main);
        } else {
            main.innerHTML = `<h2 class="no-results">No Results Found</h2>`;
        }
    } catch (e) {
        main.innerHTML = `<h2 class="no-results">Developer's mistake</h2>`;
    }
}

window.onload = () => {
    const main = $('#main')[0];
    const search = $('#search')[0];
    const tagsEl = $('#tags')[0];
    const form = $('#form')[0];

    //creates genres tabs, which can be used as filters, uses the highlightSelection function
    setGenre(tagsEl, main);

    //gets the data from TMDB and uses the showMovies function
    getMovies(API_URL, main);

    //after submiting the form it searches the term and then viewing the results with getMovies function
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchTerm = search.value;
        selectedGenres = [];

        highlightSelection(tagsEl, main)
        if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm, main)
        } else {
            getMovies(API_URL, main);
        }
    })
}