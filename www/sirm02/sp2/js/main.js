$(document).ready(() => {

    //whet reset, set url to default
    history.pushState(null, 'Flicker recent' ,'../sp2/' );
    
    
    const appContainer = $(`#app`);

    // building tag buttons
    const tags = $(`
<nav class="tags">
<button class="tagButton" id="airport">#airport</button>
<button class="tagButton" id="apple">#apple</button>
<button class="tagButton" id="bridge">#bridge</button>
<button class="tagButton" id="car">#car</button>
<button class="tagButton" id="cat">#cat</button>
<button class="tagButton" id="czechia">#czechia</button>
<button class="tagButton" id="dog">#dog</button>
<button class="tagButton" id="landscape">#landscape</button>
<button class="tagButton" id="smartphone">#smartphone</button>
<button class="tagButton" id="winter">#winter</button>
</nav>;
`);

    const photosContainer = $(`<div id=photos>`);

    const footer = $(`<footer> Martin Šír &copy; 2022</footer>`);

    let photosCollection = [];

    tags.appendTo(appContainer);
    photosContainer.appendTo(appContainer);
    footer.appendTo(appContainer);

    //when change history
    window.addEventListener('popstate', function () {
        if (history.state === null) {
            $('#photos').empty();
        }else {
            whatPicturesGet(history.state);
        };
    });

    //adding actions to buttons
    $('#cat').click(function () {
        whatPicturesGet('cat');

    });
    $('#airport').click(function () {
        whatPicturesGet('airport');

    });
    $('#apple').click(function () {
        whatPicturesGet('apple');
    });
    $('#winter').click(function () {
        whatPicturesGet('winter');
    });
    $('#czechia').click(function () {
        whatPicturesGet('czechia');
    });
    $('#smartphone').click(function () {
        whatPicturesGet('smartphone');
    });
    $('#dog').click(function () {
        whatPicturesGet('dog');
    });
    $('#landscape').click(function () {
        whatPicturesGet('landscape');
    });
    $('#car').click(function () {
        whatPicturesGet('car');
    });
    $('#bridge').click(function () {
        whatPicturesGet('bridge');
    });


    //click action on title h1
    $('#title').click( function() {
        window.history.go();
    });


    // do the magic with ajax
    const whatPicturesGet = (tag) => {

        //first of all empty website from older search
        $('#photos').empty();

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
                    };
                    photosCollection.push(photoResult);


                }
                spinner.remove();
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
        const recievedPhoto = $('<img>').addClass('result-image').attr('src', photo.url).attr('alt', 'recieved-recent-image');
        photosContainer.append(recievedPhoto);
    };

    //creates loading spinner
    const showSpinner = () => {
        const spinner = $('<div>').addClass('spinner');
        spinner.appendTo(appContainer);
        return spinner;
    };


});