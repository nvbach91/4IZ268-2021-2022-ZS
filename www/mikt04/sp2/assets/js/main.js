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
