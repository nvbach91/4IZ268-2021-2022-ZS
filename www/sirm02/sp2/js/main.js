$(document).ready(() => {

    //whet reset, set url to default
    history.pushState(null, 'Flicker recent', '../sp2/');


    const appContainer = $(`#app`);
    const tagsContainer = $('<nav>').addClass('tags');

    const tags = ['airport', 'apple', 'bridge', 'car', 'cat', 'czechia', 'dog', 'landscape', 'smartphone', 'winter'];


    const tagsForm = $('#tagsForm');
    const tagsInput = $('input[name="tagsInput"]');

    tagsForm.submit((event) => {
        event.preventDefault();
        const inputValue = tagsInput.val();
        const tagsNames = inputValue.replace(' ', ',');


        if (!tags.includes(tagsNames)) {
            tags.push(tagsNames);
            createButton(tagsNames);

            $('.tagButton').unbind();

            $('.tagButton').click(function () {
                whatPicturesGet($(this).attr('id'));
            });

        };

        whatPicturesGet(tagsNames);


    });



    //deal with array with tags and creates buttons
    const createButtons = (tags) => {
        tags.forEach(element => {
            tagsContainer.append(createButton(element));
        });
    };


    //creates html button from tag on input
    const createButton = (tag) => {
        const tagButton = $('<button>').addClass('tagButton').attr('id', tag).text('#' + tag);
        tagsContainer.append(tagButton);
        return tagButton;
    };

    createButtons(tags);

    const photosContainer = $('<div>').attr('id', 'photos');

    const footer = $('<footer>').text('Martin Šír © 2022');


    let photosCollection = [];

    tagsContainer.appendTo(appContainer);
    photosContainer.appendTo(appContainer);
    footer.appendTo(appContainer);

    //when change history
    window.addEventListener('popstate', function () {
        if (history.state === null) {
            $('#photos').empty();
        } else {
            whatPicturesGet(history.state);
        };
    });

    //adding actions to buttons

    $('.tagButton').click(function () {
        whatPicturesGet($(this).attr('id'));
    });


    //click action on title h1
    $('#title').click(function () {
        window.history.go();
    });


    // do the magic with ajax
    const whatPicturesGet = (tag) => {




        //spinner, user needs to know that something is happening
        spinner = showSpinner();

        //going back in history, don't add new
        if (history.state !== tag) {
            history.pushState(tag, 'Flicker recent tag #' + tag, '?tag=' + tag);
        };

        $.ajax({
            statusCode: {
                500: function () {
                }
            },
            url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fa2b372bf7233549b925129ff663abee&format=json&tags=' + tag + '&per_page=50&nojsoncallback=1',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                photosCollection.length = 0;
                for (let i = 0; i < res.photos.photo.length; i++) {
                    const photoResult = {

                        url: 'https://live.staticflickr.com/' + res.photos.photo[i].server + '/' + res.photos.photo[i].id + '_' + res.photos.photo[i].secret + '_n.jpg',
                        title: res.photos.photo[i].title
                    };
                    photosCollection.push(photoResult);


                }
                spinner.remove();
                $('#photos').empty();
                createPhotos(photosCollection);

            },
            error: function (err) {
                console.log('error:' + err);
            }

        });
    }

    //deal with array with info about photos
    const createPhotos = (photos) => {
        photos.forEach(element => {
            photosContainer.append(createPhoto(element));
        });

    };


    //creates html img with picture and append to container on page
    const createPhoto = (photo) => {
        const recievedPhoto = $('<img>').addClass('result-image').attr('src', photo.url).attr('alt', 'recieved-recent-image').attr('title', photo.title);
        photosContainer.append(recievedPhoto);
    };

    //creates loading spinner
    const showSpinner = () => {
        const spinner = $('<div>').addClass('spinner');
        spinner.appendTo(tagsContainer);
        return spinner;
    };


});
