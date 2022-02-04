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
        button: '#searchButton'
    }

    return {

        inputField() {
            return {
                playlists: document.querySelector(DOMElements.divPlaylistList),
                search: document.querySelector(DOMElements.search),
                quantity: document.querySelector(DOMElements.quantity),
                button: document.querySelector(DOMElements.button)
            }
        },

        createPlaylist(name, id) {
            
            const div = document.createElement("div");

            const a = document.createElement("a");
            a.setAttribute('href', `https://open.spotify.com/playlist/${id}`);
            a.setAttribute('target', '_blank');
            a.setAttribute('class', 'list-group-item list-group-item-action list-group-item-light')
            a.innerText = name;

            const button = document.createElement("button");
            button.id = "exportButton"
            button.innerText = "Export"
            button.onclick = async () => {
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
            };

            div.append(a)
            div.append(button)


            document.querySelector(DOMElements.divPlaylistList).append(div);
        },

        resetPlaylist() {
            document.querySelector(DOMElements.divPlaylistList).innerHTML = '';
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
        const x = UICtrl.getSearchText();
        const y = await APICtrl.searchPlaylists(token, x.value, quantity);
        console.log(y);
        y.forEach(Element => {
            UICtrl.createPlaylist(Element.name, Element.id);
        });
    })


    return {
        init() {
            console.log('App is starting');
        }
    }


})(UIController, APIController);

APPController.init();
