$(document).ready(() => {

  const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  const SEARCHAPI =
    'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

  const main = $('#main');
  const form = $('#form');
  const search = $('#search');
  const button = $('#search-button');

  const mediaQuery = window.matchMedia('(max-width:725px)');
  const mediaQueryBig = window.matchMedia('(min-width:725px)');

  const showMovies = (url) => {
    main.empty();
    try {
      appendLoader();
      createResultPage(url);
    } catch (e) {
      appendSomethingWentWrong();
    }
  }

  const convertToEuropeanDate = (dateInput) => {
    const dateValues = dateInput.split('-');
    let humanReadableDate = [];
    for (let i = dateValues.length - 1; i >= 0; i--) {
      humanReadableDate.push(dateValues[i]);
    }
    return humanReadableDate.join('/');
  };

  const getGoogleDatetimeString = (dateString, timeString, minutes) => {
    let date = new Date(dateString + 'T' + timeString);
    date = addMinutesToDate(date, minutes);
    return turnDateToIsoFormat(date);
  }

  const addMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  }

  const turnDateToIsoFormat = (date) => {
    const isoString = date.toISOString();
    const isoArray = isoString.split('.');
    return isoArray[0];
  }

  const getReleaseYear = (releaseDate) => {
    if (releaseDate == undefined || releaseDate == '') {
      return 'unknown';
    } else {
      return releaseDate.split('-')[0];
    }
  }

  const convertToStars = (rating) => {
    const numberOfStars = Math.round(rating / 2);
    let stars = '';
    for (let i = 0; i < numberOfStars; i++) {
      stars = stars + '&starf;';
    }
    return stars;
  }


  const getLengthFromId = async (movieId) => {
    const data = await $.getJSON(`https://api.themoviedb.org/3/movie/${movieId}?api_key=04c35731a5ee918f014970082a0088b1`);
    return data.runtime;
  };

  const appendNoMoviesFound = () => {
    main.empty();
    const emptyText = $('<h2>No movies found.</h2>').addClass('no-movies');
    main.append(emptyText);
  }

  const appendLoader = () => {
    const loaderWrapper = $('<div></div>').addClass('loader-wrapper');
    const loader = $('<div></div>').addClass('loader');
    loaderWrapper.append(loader);
    main.append(loaderWrapper);
  }

  const appendSomethingWentWrong = () => {
    main.append('<h2>Something went wrong.</h2>');
  }

  const createMovieDom = async (element) => {
    const container = $('<div></div>').addClass('container');
    const columnText = $('<div></div>').addClass('column-text');
    const columnPoster = $('<div></div>').addClass('column-poster');
    const lengthAndRelease = $('<div></div>');

    let poster = createPoster(element);
    columnPoster.append(poster);

    const name = $('<h2></h2>').text(element.title).addClass('movie-title');

    const rating = $('<div></div>').addClass('rating').html(
      convertToStars(element.vote_average)
    );

    const releaseYear = $('<div></div>').html(
      `<strong>Release: </strong>${getReleaseYear(element.release_date)}`
    ).addClass('release-year');

    const description = $('<div></div>').text(element.overview).addClass('description');

    const pickers = $('<div></div>').addClass('pickers');

    const dateRow = $('<div></div>').addClass('row');
    const dateText = $('<p></p>').html('<strong>Select a date:</strong>');
    const dateInput = $('<input/>').attr('type', 'date');
    dateRow.append(dateText, dateInput);

    const timeRow = $('<div></div>').addClass('row');
    const timeText = $('<p></p>').html('<strong>Select a time:</strong>');
    const timeInput = $('<input/>').attr('type', 'time');
    timeRow.append(timeText, timeInput);

    let length = await getLengthFromId(element.id);
    let lenghtText = (length == 0 || length == undefined) ? 'unknown' : `${length} min`;
    const lengthDiv = $('<div></div>').html(`<strong>Length: </strong> ${lenghtText}`).addClass('length');

    const submitButton = $('<button></button>')
      .addClass('submit-button')
      .text('Add to google calendar')
      .click(() => {
        if (isSignedIn()) {
          createButtonListener(dateInput, timeInput, length, element);
        } else {
          promptToLogIn();
        }
      });

    lengthAndRelease.append(lengthDiv, releaseYear);
    columnText.append(name, rating, lengthAndRelease, description, pickers);
    pickers.append(dateRow, timeRow, submitButton);
    container.append(columnText, columnPoster);
    main.append(container);
  };


  const createEvent = (element, dateInput, timeInput, length) => {
    return {
      'summary': `Watch ${element.title}`,
      'start': {
        'dateTime': `${getGoogleDatetimeString(dateInput.val(), timeInput.val(), 0)}-00:00`
      },
      'end': {
        'dateTime': `${getGoogleDatetimeString(dateInput.val(), timeInput.val(), length)}-00:00`
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      }
    };
  };

  const createPoster = (element) => {
    let image = undefined;

    if (element.poster_path == null) {
      image = $('<div></div>').text('Poster for this movie is missing').addClass('missing');
    } else {
      image = $('<img/>').attr('src', IMGPATH + element.poster_path).attr('alt', `Poster of ${element.title}`);
    }
    return image;
  }

  const initialSetup = () => {
    addFormListeners();
    initialQueryCheck();
    addResolutionChangeListeners();
  }

  const initialQueryCheck = () => {
    if (mediaQuery.matches) {
      search.val('enter a movie name');
      search.click(() => {
        search.val('');
      });
    }
  }

  const addResolutionChangeListeners = () => {
    addListenerSmallScreen();
    addListenerBigScreen();
  }


  const addListenerBigScreen = () => {
    mediaQueryBig.addEventListener('change', event => {
      if (event.matches && search.val() == 'enter a movie name') {
        search.val('');
      }
    });
  }

  const addListenerSmallScreen = () => {
    mediaQuery.addEventListener('change', event => {
      if (event.matches && search.val().trim() == '') {
        search.val('enter a movie name');
        search.click(() => {
          search.val('');
        });
      }
    });
  }

  const appendNoInternet = () => {
    Swal.fire({
      title: 'Error!',
      text: 'No internet connection',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const appendSuccessMesage = (element, dateInput, timeInput) => {
    Swal.fire({
      title: 'Event added!',
      html: `${element.title} has been added to your google calendar!
        <div id="alert-datetime">
        <strong>Date:</strong> ${convertToEuropeanDate(dateInput.val())}
        <strong>Time:</strong> ${timeInput.val()}
        </div>`,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const promptToLogIn = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Log in to your google account first',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const appendNoTime = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Enter time first',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const appendNoDate = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Enter date first',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const appendNoDateAndTime = () => {
    Swal.fire({
      title: 'Error!',
      text: 'Enter date and time first',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'grey'
    });
  }

  const addFormListeners = () => {
    button.click((e) => {
      e.preventDefault();
      showMovies(SEARCHAPI + search.val().trim());
    });

    form.submit((e) => {
      e.preventDefault();
      showMovies(SEARCHAPI + search.val().trim());
    });
  }


  const createResultPage = async (url) => {
    if (inputIsEmpty() && isRegularSearch(url)) {
      appendNoMoviesFound();
    } else {
      const data = await $.getJSON(url);
      if (noMoviesFound(data)) {
        appendNoMoviesFound();
      } else {
        createMovieContainers(data);
      };
    }
  }

  const createMovieContainers = (data) => {
    main.empty();
    data.results.forEach(element => {
      createMovieDom(element);
    });
  }

  const noMoviesFound = (data) => {
    return data.total_results == 0;
  }

  const inputIsEmpty = () => {
    return search.val().trim() == '';
  }

  const isSignedIn = () => {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  /**
   * The website is initially loaded with user input having no value ->
   * without this check, it would always show "No movies found".
   * 
   * returns true if api is called with user input
   * 
   * returns false if showMovies(url) was executed as initial webpage load 
   */
  const isRegularSearch = (url) => {
    return url != apiUrl;
  }

  const createButtonListener = (dateInput, timeInput, length, element) => {
    if (emptyInput(dateInput) && emptyInput(timeInput)) {
      appendNoDateAndTime();
    } else if (emptyInput(dateInput)) {
      appendNoDate();
    } else if (emptyInput(timeInput)) {
      appendNoTime();
    } else if (!hasInternetConnection()) {
      appendNoInternet();
    } else {
      createAndInsertEvent(dateInput, timeInput, length, element);
    }
  }

  const insertEvent = (event, element, dateInput, timeInput) => {
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    request.execute(() => {
      appendSuccessMesage(element, dateInput, timeInput);
    });
  }

  const hasInternetConnection = () => {
    return navigator.onLine;
  }

  const createAndInsertEvent = (dateInput, timeInput, length, element) => {
    const event = createEvent(element, dateInput, timeInput, length);
    insertEvent(event, element, dateInput, timeInput);
  }

  const emptyInput = (dateInput) => {
    return dateInput.val() == '';
  }

  initialSetup();
  showMovies(apiUrl);

});
