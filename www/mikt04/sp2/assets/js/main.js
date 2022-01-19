$(document).ready(function () {

  // date and time from jQueryUI//

  var strDate = $.datepicker.formatDate('dd.mm.yy', new Date());
  var strYear = $.datepicker.formatDate('yy', new Date());
  $('#date').append(strDate);
  $('#year').append(strYear);

  // Svatky //

  $.ajax({
    url: "https://svatky.adresa.info/json",
    type: 'GET',
    dataType: 'json',
    success: function (res) {
      var parsed = JSON.parse(JSON.stringify(res));
      $.each(parsed, function (key, val) {
        $('#svatek').append(val.name);
      });
    }
  });

  // Movie database API //

  // variables for searching
  const searchForm = $('#search-box');
  const movieContainer = $('#results');
  const collectionContainer = $('#collection-content');
  const movieNameInput = $('input[name="search"]');
  let searchColl = [];
  let libraryColl = [];

  // variables for custom adding
  const addForm = $('#add-box');
  const customMovieNameInput = $('input[name="add-name"]');
  const customMoviePictureInput = $('input[name="add-picture"]');
  
  // spinner loading
  const showSpinner = () => {
    const spinner = $('<div>').addClass('spinner');
    searchForm.append(spinner);
    return spinner;
  };

  // handling search button
  searchForm.submit((e) => {
    e.preventDefault();
    movieContainer.empty();
    const movieName = movieNameInput.val();

    if(movieName.length < 3){
      return;
    }

    // Creates spinner
    spinner = showSpinner();

    // Ajax
    $.ajax({
      statusCode: {
        500: function() {
          console.log('error status code 500');
        }
      },
      url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=cs-CZ&query=" + movieName + "&page=1&include_adult=true",
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        searchColl.length = 0;
        const n = Math.min(4, res.total_results);
        for (let i = 0; i < n; i += 1) {
          const movieData = {
            id: res.results[i].id,
            name: res.results[i].original_title,
            description: res.results[i].overview,
            year: res.results[i].release_date,
            rating: res.results[i].vote_average,
            image: 'https://image.tmdb.org/t/p/original' + res.results[i].poster_path,
          };
        // Ajax
        $.ajax({
          url: "https://api.themoviedb.org/3/movie/" + res.results[i].id +"?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=cs-CZ",
          type: 'GET',
          dataType: 'json',
          success: function (response) {
            movieData.budget = response.budget;
            movieData.revenue = response.revenue;
            movieData.language = response.original_language;
            movieData.status = response.status;
            movieData.imdb= response.imdb_id;
          },
        });
        searchColl.push(movieData);
        console.log(searchColl);
        }
        $('.main-content-results').removeClass('non-active');
        spinner.remove();
        showMovie(searchColl);
        console.log(searchColl);
      },
      error: function (data) {
        console.log('ajax error' + data);
      }
    });
  });

  addForm.submit((e) => {
    e.preventDefault();
    
    const customMovieName = customMovieNameInput.val();
    const customMoviePicture = customMoviePictureInput.val();

    // validation of user input checks url img format
    const picture = new RegExp('(https?:\/\/.*\.(?:png|jpg?g))');
    if (!customMoviePicture.match(picture) || customMovieName.length >= 50) {
      console.log('vlozte spravny fomat obrazku jpe?g,png')
      return false;
    }

    const movieData = {
      id: customMovieName,
      name: customMovieName,
      description: 'Tento film byl přidán ručně',
      year: '----',
      rating: 0,
      image: customMoviePicture,
      budget: '----',
      revenue: '----',
      language: 'Tento film byl přidán ručně',
      status: 'Tento film byl přidán ručně',
      imdb: 'Tento film byl přidán ručně',
    };
    insertMovie(movieData);
    saveData();
  });

  // appends movie to search collection div 
  const showMovie = (collection) => {
    collection.forEach(function (element) {
      movieContainer.append(createMovie(element));
    });
  }

  // ads movie to library collection array and html
  const insertMovie = (movie) => {
    let idExists = false;
    libraryColl.forEach(function (element) {
      if (element.id == movie.id) {
        idExists = true;
      }
    });
    if (idExists == false) {
      libraryColl.push(movie);
      collectionContainer.append(addMovie(movie));
      console.log(libraryColl);
      return true;
    }
  }

  // removes movie from library collection array
  const deleteMovie = (movie) => {
    libraryColl.splice(libraryColl.findIndex(element => element.id == movie.id), 1);
  }

  // Creates movie html structure for search sellection
  const createMovie = (movie) => {
    const movieContainer = $('<div>').addClass('movie-result');
    const movieNameContainer = $('<div>').addClass('movie-result-name').text(movie.name);
    const movieImageContainer = $('<img>').addClass('movie-result-image').attr('src', movie.image).attr('alt', 'movie-image');
    const movieMessageContainer = $('<div>').addClass('movie-result-message').text('Film byl přidán');

    const movieAddButton = $('<button>').text('Přidat').click(() => {
      insertMovie(movie);
      saveData();
      console.log(libraryColl);
      movieAddButton.remove();
      movieContainer.append(movieMessageContainer);
    });

    movieContainer.append(
      movieNameContainer,
      movieImageContainer,
      movieAddButton,
    );

    return movieContainer;
  };

  // creates movie html structure for library collection
  const addMovie = (movie) => {
    const infoBox = $('#info-box');
    const paramBox = $('#param-box');
    const ratingBox = $('#rating-box');
    
    const movieContainer = $('<div>').addClass('movie').click(() => {
      infoBox.empty();
      paramBox.empty();
      ratingBox.empty();
      infoBox.append(addMovieInfo(movie));
      paramBox.append(addMovieParam(movie));
      ratingBox.append(addMovieRating(movie));
      $('.movie').removeClass('active-movie');
      movieContainer.addClass('active-movie');
    });

    const movieImageContainer = $('<img>').addClass('movie-image').attr('src', movie.image).attr('alt', 'movie-image');

    const movieAddButton = $('<button>').text('Odebrat').click(() => {
      movieContainer.remove();
      deleteMovie(movie);
      saveData();
    });

    movieContainer.append(
      //movieNameContainer,
      movieImageContainer,
      movieAddButton,
    );

    return movieContainer;
  };

  // creates movie html structure for movie description
  const addMovieInfo = (movie) => {
    const movieInfoContainer = $('<div>').addClass('movie-info');
    const movieInfoNameContainer = $('<div>').addClass('movie-info-name').text(movie.name);
    const movieInfoDescriptionContainer = $('<div>').addClass('movie-description').text(movie.description);

    movieInfoContainer.append(
      movieInfoNameContainer,
      movieInfoDescriptionContainer,
    );

    return movieInfoContainer;
  };

  const addMovieParam  = (movie) => {
    const movieParamContainer = $('<div>').addClass('movie-param');
    const movieParamBudget = $('<div>').addClass('movie-param-budget').text('Rozpočet: $' + movie.budget);
    const movieParamRevenue = $('<div>').addClass('movie-param-revenue').text('Tržby: $' + movie.revenue);
    const movieParamLanguage = $('<div>').addClass('movie-param-language').text('Původní jazyk: '+ movie.language);
    const movieParamStatus = $('<div>').addClass('movie-param-status').text('Stav: '+ movie.status);
    const movieParamImdb = $('<div>').addClass('movie-param-imdb').text('ID v IMDB: '+ movie.imdb);

    movieParamContainer.append(
      movieParamBudget,
      movieParamRevenue,
      movieParamLanguage,
      movieParamStatus,
      movieParamImdb,
    );


    return movieParamContainer;
  };

  const addMovieRating = (movie) => {
    const movieRatingContainer = $('<div>').addClass('movie-rating');
    const movieRatingNumber = $('<div>').addClass('movie-rating-number').text((movie.rating*10) + '%');
    const movieRatingBar = $('<div>').addClass('movie-rating-bar').progressbar({value: movie.rating*10});

    movieRatingContainer.append(
      movieRatingNumber,
      movieRatingBar,
    );


    return movieRatingContainer;
  };

  /// SAVING DATA
  // saving data to localStorage
  const saveData = () => {
    localStorage["libraryCollection"] = JSON.stringify(libraryColl);
  };

  // loading data from localStorage
  const lib = localStorage.getItem("libraryCollection");
  if (lib) {
    libraryColl = JSON.parse(lib);
    if (libraryColl.length > 0)
    libraryColl.forEach(function (element) {
      collectionContainer.append(addMovie(element));
    });
  }


  // MAIN CONTENT MENU - SEARCH ADD CLICK //
  $('#main-content-menu .click').click(function () {
    const mainContentSearch = $('#main-content-search');
    const mainConntentAdd = $('#main-content-add');
    const index = $(this).attr('data-content');

    $('#main-content-menu .click').removeClass('active');
    $(this).addClass('active');

    if (index == 0) {
      mainContentSearch.removeClass('non-active');
      mainConntentAdd.addClass('non-active');
    }

    if (index == 1) {
      mainConntentAdd.removeClass('non-active');
      mainContentSearch.addClass('non-active');
      $('.main-content-results').addClass('non-active');
    }
  });

    // MAIN CONTENT INFOBOX - SEARCH ADD CLICK //
  $('#main-content-infobar-menu .click').click(function () {
    const mainContentInfo = $('#main-content-infobar-info');
    const mainContentParam = $('#main-content-infobar-param');
    const mainContentRating = $('#main-content-infobar-rating');
    var index = $(this).attr('data-content');

    $('#main-content-infobar-menu .click').removeClass('active');
    $(this).addClass('active');

    if (index == 0) {
      mainContentInfo.removeClass('non-active');
      mainContentParam.addClass('non-active');
      mainContentRating.addClass('non-active');
    }

    if (index == 1) {
      mainContentParam.removeClass('non-active');
      mainContentInfo.addClass('non-active');
      mainContentRating.addClass('non-active');
    }
    if (index == 2) {
      mainContentRating.removeClass('non-active');
      mainContentParam.addClass('non-active');
      mainContentInfo.addClass('non-active');
    }
  });

});