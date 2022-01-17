const data = [
  'Content 1', 'Content 2',
];

/** MAIN CONTENT MENU - SEARCH ADD CLICK */
$('#main-content-menu .click').click(function(){
  if($(this).hasClass('active')){
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

  if (index == 0){
    $('#main-content-search').removeClass('non-active');
    $('#main-content-add').addClass('non-active');
  }

  if(index == 1){
    $('#main-content-add').removeClass('non-active');
    $('#main-content-search').addClass('non-active');
    $('.main-content-results').addClass('non-active');
  }
});

/**MAIN CONTENT INFOBOX - SEARCH ADD CLICK */
$('#main-content-infobar-menu .click').click(function(){
  var index = $(this).attr('data-content');

  $('#main-content-infobar-menu .click').removeClass('active');
  $(this).addClass('active');

  if (index == 0){
    $('#main-content-infobar-info').removeClass('non-active');
    $('#main-content-infobar-random').addClass('non-active');
    $('#main-content-infobar-really').addClass('non-active');
  }

  if(index == 1){
    $('#main-content-infobar-random').removeClass('non-active');
    $('#main-content-infobar-info').addClass('non-active');
    $('#main-content-infobar-really').addClass('non-active');
  }
  if(index == 2){
    $('#main-content-infobar-really').removeClass('non-active');
    $('#main-content-infobar-random').addClass('non-active');
    $('#main-content-infobar-info').addClass('non-active');
  }
});

// Svatky //

var strDate = $.datepicker.formatDate('dd.mm.yy', new Date());
$('#date').append(strDate);

$.ajax({
  url: "https://svatky.adresa.info/json",
  type: 'GET',
  dataType: 'json',
  success: function(res) {
    var parsed =  JSON.parse(JSON.stringify(res));
    $.each(parsed, function (key, val) {
      $('#svatek').append(val.name);             
    });
  }
});

// Movie database API //

$(document).ready(function() {

  const searchForm = $('#search-box');
  const addForm = $('#add-form');
  const movieContainer = $('#results');
  const collectionContainer = $('#collection-content');
  const movieNameInput = $('input[name="search"]');
  const movie = $('.movie');
  const jsonInput = [];
  let searchColl = [];
  const libraryColl = [];


  searchForm.submit((e)=> {
    e.preventDefault();
    movieContainer.empty();
    const movieName = movieNameInput.val();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=en-US&query=" + movieName + "&page=1&include_adult=true",
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        $('.main-content-results').removeClass('non-active');
        searchColl.length = 0;
        for (let i = 0; i < 4; i += 1) {
          const movieData = {
            id: res.results[i].id,
            name: res.results[i].original_title,
            year: res.results[i].release_date,
            image: 'https://image.tmdb.org/t/p/original' + res.results[i].poster_path,
          };
          searchColl.push(movieData);
        }
        showMovie(searchColl);
        console.log(searchColl);
      }
    });
      //const movie = createMovie(movieData);
      //movieContainer.append(movie);
  });

  function insertMovie(movie) {
    let idExists = false;
    libraryColl.forEach(function(element) {
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

  /*
  const insertMovie = (movieData1) => {
    libraryColl.forEach(element => {
      if(element.id === movieData1.id){
        console.log('Chyba');
        return false;
      }
    });
    libraryColl.push(movieData1);
    console.log(libraryColl);
  }
  */

  const showMovie = (collection) => {
    collection.forEach(function(element) {
      movieContainer.append(createMovie(element));
    });
  }


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

  const addMovie = (movie) => {
    const movieContainer = $('<div>').addClass('movie');
    const movieNameContainer = $('<div>').addClass('movie-name').text(movie.name);
    const movieImageContainer = $('<img>').addClass('movie-image').attr('src', movie.image).attr('alt', 'movie-image');
    
    const movieAddButton = $('<button>').text('Odebrat').click(() => {
      movieContainer.remove();
    });

    movieContainer.append(
      movieNameContainer,
      movieImageContainer,
      movieAddButton,
    );

    return movieContainer;
  };






  /**
  $("#button-search").click(function(e){
    e.preventDefault();
    $('#main-content-results').removeClass('non-active');

    const movieNameInput = $('input[name="search"]');
    const inputValue = movieNameInput.val().trim();
    const movieNames = inputValue.split(/ +/);

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=en-US&query=" + movieNames + "&page=1&include_adult=true",
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.results[0].original_title);
        $('#main-content-results').append(res.results[0].original_title);      
      }
    });
  }); 


///////////////
    const existingMovieNames = [];
    const existingMovies = $('.movie');
    for (let i = 0; i < existingMovies.length; i++) {
        const existingMovie = existingMovies.eq(i);
        const existingMovieNameContainer = existingMovie.find('.movie-name');
        const existingMovieName = existingMovieNameContainer.text();
        existingMovieNames.push(existingMovieName);
        console.log(existingMovie, existingMovieNameContainer, existingMovieName);
    }

  
   */


});

