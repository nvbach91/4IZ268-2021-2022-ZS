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
  const movieNameInput = $('input[name="search"]');

  searchForm.submit((e)=> {
    e.preventDefault();
    movieContainer.html("");
    $('.main-content-results').removeClass('non-active');
    const inputValue = movieNameInput.val();
    const movieName = inputValue;

    for (let i = 0; i < 4; i += 1) {
      $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=en-US&query=" + movieName + "&page=1&include_adult=true",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const movieData = {
              name: res.results[i].original_title,
              image: 'https://image.tmdb.org/t/p/original' + res.results[i].poster_path,
            };
        const movie = createMovie(movieData);
        movieContainer.append(movie);
        }
      });
    }
  });


  const createMovie = (movie) => {
    const movieContainer = $('<div>').addClass('movie');
    const movieNameContainer = $('<div>').addClass('movie-name').text(movie.name);
    const movieImageContainer = $('<img>').addClass('movie-image').attr('src', movie.image).attr('alt', 'movie-image');

    const movieRemoveButton = $('<button>').text('dismiss').click(() => {
        movieContainer.remove();
    });

    movieContainer.append(
      movieNameContainer,
      movieImageContainer,
      movieRemoveButton,
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

