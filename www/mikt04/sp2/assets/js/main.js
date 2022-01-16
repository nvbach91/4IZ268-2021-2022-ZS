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

var nameOf = "";

$.ajax({
  url: "https://api.themoviedb.org/3/search/movie?api_key=ac508bc638f7b6f9435980b8c95da7f2&language=en-US&query=" + nameOf + "&page=1&include_adult=true",
  type: 'GET',
  dataType: 'json',
  success: function(res) {
    var show = console.log(res.results[0].original_title);
    //$('#collection-content').append(res.results[0].original_title);        
  }
});

$(document).ready(function() {
  $("#button-search").click(function(e){
    e.preventDefault();
    $('#main-content-results').removeClass('non-active');
  }); 
});

