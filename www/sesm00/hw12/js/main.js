

(() => {

  const CLIENT_ID = '2ceafa16f913786528fd';
  const CLIENT_SECRET = 'd0d25497422cad74ccb1815b95f716cd44cf417d';
  const baseApiUrl = 'https://api.github.com';

  const body = $('body');
  const userProfileContainer = $('#user-profile');
  const userReposContainer = $('#repositories');
  const input = $('#search-form input');
  const submitButton = $('#search-form button');
  const errorWrapper = $('.js-error');
  const loader = $('.js-loader');
  let userData = null;
  let userRepos = null;

  body.on('click', '#search-form button', function (event) {
    loader.css('display', 'flex');
    doSearch();
  });

  function doSearch() {

    const searchValue = input.val();

    const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(url).done(function(user) {
      userData = user;
      getRepos();
    }).fail(function() {
      userData = null;
      userRepos = null;
      drawResults();
    });

  }

  function getRepos() {
    const searchValue = input.val();

    const url = `${baseApiUrl}/users/${searchValue}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(url).done(function(repos) {
      userRepos = repos;
    }).fail(function() {
      userRepos = null;
    }).always(function () {
      drawResults();
    });

  }

  function drawResults() {
    loader.hide();
    if (userData === null) {
      errorWrapper.html('<p>Načtení uživatelského profilu nebylo úspěšné</p>');
      userProfileContainer.css('display', '');
      return;
    }

    errorWrapper.html('');

    userProfileContainer.find('.js-name').text(userData.name);
    userProfileContainer.find('.js-login').text(userData.login);
    userProfileContainer.find('.js-bio').text(userData.bio);
    userProfileContainer.find('.js-location').text(userData.location);
    userProfileContainer.find('.js-description').text(userData.company);
    userProfileContainer.find('.js-email').text(userData.email);
    userProfileContainer.find('.js-flwrs').text(userData.followers);

    let date = new Date(userData.created_at).toLocaleDateString('cs-CZ');
    userProfileContainer.find('.js-rgstrd').text(date);

    userProfileContainer.find('.js-image-part').css('background-image', 'url(' + userData.avatar_url + ')');
    const linkinfo = userProfileContainer.find('.js-link');
    linkinfo.text(userData.html_url);
    linkinfo.attr('href', userData.html_url);

    userProfileContainer.show();

    userReposContainer.empty();

    if (userRepos === null) {
      userReposContainer.html('<li>Načtení repozitářu se nedařilo</li>');
      return;
    }

    userRepos.forEach(function (repo) {
      userReposContainer.append('<li class="info-col"><span>' + repo.name + '</span><a href="' + repo.html_url + '">' + repo.html_url + '</a></li>');
    });

  }




})();
