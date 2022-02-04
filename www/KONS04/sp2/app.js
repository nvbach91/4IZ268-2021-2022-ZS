const APIController = (function () {

    const clientId = 'bbdbe788328745839692d696ab547cfc';
    const clientSecret = '9e6aa0a4f5394b1cb0e67ed9ea67c57c';



    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _searchPlaylists = async (token, text, quantity) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=${text}&type=playlist&market=ES&limit=${quantity}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.playlists.items;

    }

    const _getPlaylistTracks = async (token, playlist_id) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    }

    return {
        getToken() {
            return _getToken();
        },
        searchPlaylists(token, text, quantity) {
            return _searchPlaylists(token, text, quantity);
        },
        getPlaylistTracks(token, playlist_id) {
            return _getPlaylistTracks(token, playlist_id);
        }
    }
})();

const UIController = (function () {



    const DOMElements = {
        hfToken: '#hidden_token',
        divPlaylistList: '.playlist-list',
        search: '#search',
        quantity: '#quantity',
        button: '#searchButton',
        trackList: '#trackList'
    }

    return {

        inputField() {
            // document.querySelector(DOMElements.search).value = localStorage.getItem('seached_text');

            const txt = localStorage.getItem('searched_text');
            const qtt = localStorage.getItem('quantityOfTracks');
            document.querySelector(DOMElements.search).value = txt;
            document.querySelector(DOMElements.quantity).value = qtt;



            if (txt && qtt) {
                setTimeout(function () { document.querySelector(DOMElements.button).click() }, 100);
            }
            
            return {
                playlists: document.querySelector(DOMElements.divPlaylistList),
                search: document.querySelector(DOMElements.search),
                quantity: document.querySelector(DOMElements.quantity),
                button: document.querySelector(DOMElements.button),
                trackList: document.querySelector(DOMElements.trackList)
            }
        },

        createTrack(name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light">${name}</a>`;
            document.querySelector(DOMElements.trackList).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(name, id) {

            const div = document.createElement("div");

            const a = document.createElement("a");
            a.setAttribute('href', `https://open.spotify.com/playlist/${id}`);
            a.setAttribute('target', '_blank');
            a.setAttribute('class', 'list-group-item list-group-item-action list-group-item-light')
            a.innerText = name;

            const button = document.createElement("button");
            button.setAttribute('class', 'btn btn-info btn-block');
            button.id = "exportButton"
            button.innerText = "Export"

            button.addEventListener("click", async () => {
                const token = await APIController.getToken();
                const tracks = await APIController.getPlaylistTracks(token, id);
                const exportJson = tracks.map(m => {
                    return {
                        artistName: m.track.artists[0].name,
                        songName: m.track.name
                    }
                });

                //https://stackoverflow.com/a/34156339
                var a = document.createElement("a");
                var file = new Blob([JSON.stringify(exportJson)], { type: 'text/json' });
                a.href = URL.createObjectURL(file);
                a.download = 'export.json';
                a.click();
            });

            const view = document.createElement("button");
            view.id = "viewButton"
            view.innerText = "View"

            view.addEventListener("click", async (e) => {
                e.preventDefault;


                this.resetTracklist();

                const token = await APIController.getToken();

                const tracks = await APIController.getPlaylistTracks(token, id);

                tracks.forEach(element => {
                    this.createTrack(element.track.name)
                });

                // this.createTracklist(id);
            })

            div.append(a)
            div.append(button)
            div.append(view)


            document.querySelector(DOMElements.divPlaylistList).append(div);
        },

        resetPlaylist() {
            document.querySelector(DOMElements.divPlaylistList).innerHTML = '';

        },

        resetTracklist() {
            trackList.innerHTML = '';
            // document.querySelector(DOMElements.trackList).innerHTML = '';
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        },

        getSearchText() {
            return {
                value: document.querySelector(DOMElements.search).value
            }
        },

        getPlaylistQuantity() {
            localStorage.setItem('quantityOfTracks', document.querySelector(DOMElements.quantity).value)
            return document.querySelector(DOMElements.quantity).value
        }
    }



})();

const APPController = (async function (UICtrl, APICtrl) {

    const DOMInputs = UICtrl.inputField();
    const token = await APICtrl.getToken();

    DOMInputs.button.addEventListener('click', async (e) => {

        e.preventDefault();

        const quantity = UICtrl.getPlaylistQuantity();

        UICtrl.resetPlaylist();

        UICtrl.storeToken(token);

        const text = UICtrl.getSearchText().value;
        localStorage.setItem('searched_text', text);


        const playlists = await APICtrl.searchPlaylists(token, text, quantity);


        playlists.forEach(Element => {
            UICtrl.createPlaylist(Element.name, Element.id);
        });
        // UICtrl.createTracklist(playlists[0].id);
    })

    // DOMInputs.playlists.addEventListener('click', async (e) => {
    //     e.preventDefault;

    //     console.log("bruh");
    //     UICtrl.resetTracklist();
    // })


    return {
        init() {
            console.log('App is starting');

        }
    }


})(UIController, APIController);

