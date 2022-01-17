/** MAIN CONTENT MENU - SEARCH ADD CLICK */
$('#main-content-menu .click').click(function () {
  if ($(this).hasClass('active')) {
    return;
  }

  var index = $(this).attr('data-content');

  /**
  $('#main-content-search').fadeOut(200,function(){
      $(this).text(data[index]).fadeIn(200);
  });
   */

  $('#main-content-menu .click').removeClass('active');
  $(this).addClass('active');

  if (index == 0) {
    $('#main-content-search').removeClass('non-active');
    $('#main-content-add').addClass('non-active');
  }

  if (index == 1) {
    $('#main-content-add').removeClass('non-active');
    $('#main-content-search').addClass('non-active');
    $('.main-content-results').addClass('non-active');
  }
});

/**MAIN CONTENT INFOBOX - SEARCH ADD CLICK */
$('#main-content-infobar-menu .click').click(function () {
  var index = $(this).attr('data-content');

  $('#main-content-infobar-menu .click').removeClass('active');
  $(this).addClass('active');

  if (index == 0) {
    $('#main-content-infobar-info').removeClass('non-active');
    $('#main-content-infobar-random').addClass('non-active');
    $('#main-content-infobar-really').addClass('non-active');
  }

  if (index == 1) {
    $('#main-content-infobar-random').removeClass('non-active');
    $('#main-content-infobar-info').addClass('non-active');
    $('#main-content-infobar-really').addClass('non-active');
  }
  if (index == 2) {
    $('#main-content-infobar-really').removeClass('non-active');
    $('#main-content-infobar-random').addClass('non-active');
    $('#main-content-infobar-info').addClass('non-active');
  }
});


$(document).ready(function () {

  // Svatky //

  var strDate = $.datepicker.formatDate('dd.mm.yy', new Date());
  var strYear = $.datepicker.formatDate('yy', new Date());
  $('#date').append(strDate);
  $('#year').append(strYear);

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

  const searchForm = $('#search-box');
  const addForm = $('#add-box');
  const movieContainer = $('#results');
  const collectionContainer = $('#collection-content');
  const movieNameInput = $('input[name="search"]');
  const jsonInput = [];
  let searchColl = [];
  const libraryColl = [];

  const showSpinner = () => {
    const spinner = $('<div>').addClass('spinner');
    searchForm.append(spinner);
    console.log(spinner);
    return spinner;
  };


  searchForm.submit((e) => {
    e.preventDefault();
    movieContainer.empty();
    const movieName = movieNameInput.val();
    spinner = showSpinner();
    $.ajax({
      statusCode: {
        500: function() {
          
        }
      },
      url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=cs-CZ&query=" + movieName + "&page=1&include_adult=true",
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        searchColl.length = 0;
        for (let i = 0; i < 4; i += 1) {
          const movieData = {
            id: res.results[i].id,
            name: res.results[i].original_title,
            description: res.results[i].overview,
            year: res.results[i].release_date,
            image: 'https://image.tmdb.org/t/p/original' + res.results[i].poster_path,
          };
          searchColl.push(movieData);
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

  function insertMovie(movie) {
    let idExists = false;
    libraryColl.forEach(function (element) {
      if (element.id == movie.id) {
        idExists = true;
      }
    });
    if (idExists == false) {
      libraryColl.push(movie);
      collectionContainer.append(addMovie(movie));
      return true;
    }
  }

  function deleteMovie(movie) {
    libraryColl.splice(libraryColl.findIndex(element => element.id == movie.id), 1);
  }

  const showMovie = (collection) => {
    collection.forEach(function (element) {
      movieContainer.append(createMovie(element));
    });
  }

  // Creates movie html structure for search sellection
  const createMovie = (movie) => {
    const movieContainer = $('<div>').addClass('movie-result');
    const movieNameContainer = $('<div>').addClass('movie-result-name').text(movie.name);
    const movieImageContainer = $('<img>').addClass('movie-result-image').attr('src', movie.image).attr('alt', 'movie-image');
    const movieMessageContainer = $('<div>').addClass('movie-result-message').text('Film byl přidán');

    const movieAddButton = $('<button>').text('Přidat').click(() => {
      insertMovie(movie);
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
    const movieContainer = $('<div>').addClass('movie').click(() => {
      infoBox.empty();
      infoBox.append(addMovieInfo(movie));
      $('.movie').removeClass('active-movie');
      movieContainer.addClass('active-movie');
    });
    const movieNameContainer = $('<div>').addClass('movie-name').text(movie.name);
    const movieImageContainer = $('<img>').addClass('movie-image').attr('src', movie.image).attr('alt', 'movie-image');

    const movieAddButton = $('<button>').text('Odebrat').click(() => {
      movieContainer.remove();
      deleteMovie(movie);
    });

    movieContainer.append(
      movieNameContainer,
      movieImageContainer,
      movieAddButton,
    );

    return movieContainer;
  };

  // creates movie html structure for movie information
  const addMovieInfo = (movie) => {
    const movieInfoContainer = $('<div>').addClass('movie-info');
    const movieInfoDescriptionContainer = $('<div>').addClass('movie-description').text(movie.description);

    movieInfoContainer.append(
      movieInfoDescriptionContainer,
    );

    return movieInfoContainer;
  };

  // active library 
  /*
  const movie = $(document).on('click', '.movie', function(){
    $(".movie").removeClass("active-movie");
    $(this).addClass("active-movie");
    console.log(this);
  });
  */

  addForm.submit((e) => {
    e.preventDefault();

  });




  /**

   */


});