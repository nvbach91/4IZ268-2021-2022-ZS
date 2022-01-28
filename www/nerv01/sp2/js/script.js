$(function () {
    /* Deklarace konstant s URL adresami */
    const baseSearchUrl = 'https://api.themoviedb.org/3/search/tv';
    const baseUrl = 'https://api.themoviedb.org/3/tv/';
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
    const apiKey = '?api_key=24d519ba38eaacef95f5c46bc71f2996';

    /* Deklarace konstant s odkazy na elementy */
    const searchInputBox = document.getElementById('search-input-box');
    const clearLocalStorageButton = document.getElementById('clear-local-storage');
    const searchResultsContainer = document.getElementById('search-results-container');
    const savedShowsContainer = document.getElementById('saved-shows-container');
    const loading = document.getElementById('loading');
    const logo = document.getElementById('logo');
    const dummyDataButton = document.getElementById('insert-dummy-data');
    searchResultsContainer.style.display = 'none';

    searchInputBox.addEventListener("input", debounce((event) => {
        clearSearchResultsContainer();
        let keyword = event.target.value.trim(); // Očištění vstupu

        if (keyword) {
            searchResultsContainer.style.display = 'block';
            runSearch(keyword);
        } else {
            searchResultsContainer.style.display = 'none';
        }
    }, 300));

    function debounce(callback, wait) {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                callback(...args);
            }, wait);
        };
    }


    logo.addEventListener("click", (event) => {
        document.title = 'Series Tracker';
        history.pushState(renderSavedShowTiles(), '', '.');
        setLoading(false);
    });

    clearLocalStorageButton.addEventListener('click', () => {
        localStorage.clear();
        document.title = 'Series Tracker';
        renderSuccessToast("Všechny uložené seriály smazány");
        history.pushState(renderSavedShowTiles(), '', '.');
        setLoading(false);
    });

    dummyDataButton.addEventListener('click', () => {
        setLoading(true);
        localStorage.clear();
        document.title = 'Series Tracker';
        $.ajax({
            type: 'GET',
            url: 'assets/dummy_data.json',
            success: function (data) {
                for (let showId in data) {
                    console.log(data[showId].id);
                    localStorage.setItem(data[showId].id, JSON.stringify(data[showId]));
                }
                renderSavedShowTiles();
                history.pushState(renderSavedShowTiles(), '', '.');
                renderSuccessToast("Dummy data byla přidána do localStorage.");
                setLoading(false);
            }
        })
    });

    if (localStorage.length === 0) {
        setIntroductoryNotes();
    } else {
        renderBasedOnHash(location.hash);
    }


    setLoading(false);

    function renderBasedOnHash(hash) {
        if (hash === '') {
            renderSavedShowTiles();
            document.title = 'Series Tracker';
        } else {
            let hashShowId = hash.substring(1);
            let tvShowData = localStorage[hashShowId];
            if (tvShowData === undefined) {
                clearSavedShowsContainer();
                renderError();
            } else {
                tvShowData = JSON.parse(tvShowData);
                renderTvShowDetails(tvShowData);
            }
        }
        setLoading(false);
    }

    /**
     * Funkce pro vyčištění výsledků vyhledávání
     */
    function clearSearchResultsContainer() {
        while (searchResultsContainer.firstChild) {
            searchResultsContainer.removeChild(searchResultsContainer.firstChild);
        }
    }

    function clearSavedShowsContainer() {
        while (savedShowsContainer.firstChild) {
            savedShowsContainer.removeChild(savedShowsContainer.firstChild);
        }
    }


    function runSearch(keyword) {
        $.ajax({
            type: 'GET',
            url: baseSearchUrl + apiKey + '&query=' + keyword,
            success: function (data) {
                let tvShowsArray = [];
                for (let tvShow in data.results) {
                    let tvShowData = data.results[tvShow];
                    let tvShowInfo = {
                        id: tvShowData.id,
                        name: tvShowData.name,
                        poster_path: tvShowData.poster_path
                    }
                    tvShowsArray.push(tvShowInfo);
                }
                renderSearchResults(tvShowsArray);
            },
            error: function () {
                console.log('API error');
            }
        });

    }

    /**
     * Funkce pro zobrazení výsledků vyhledávání na stránku
     */
    function renderSearchResults(tvShowsArray) {
        clearSearchResultsContainer();
        let showTilesWrapper = document.createElement('div');
        showTilesWrapper.setAttribute('class', 'show-tiles-wrapper');
        for (let tvShow in tvShowsArray) {
            let showTile = createSearchResultTile(tvShowsArray[tvShow]);

            showTilesWrapper.appendChild(showTile);
        }
        searchResultsContainer.appendChild(showTilesWrapper);
    }

    /**
     * Funkce pro vytvoření linku daného seriálu.
     * 
     * @param {*} tvShow 
     * @returns node A, s napojenýma elementama daného seriálu
     */
    function createSearchResultTile(tvShow) {
        let searchResultLink = document.createElement('a');
        searchResultLink.addEventListener('click', function () {
            saveTvShow(tvShow.id);
            searchInputBox.value = '';
            searchResultsContainer.style.display = 'none';
        });


        let searchResultWrapper = document.createElement('div');
        searchResultWrapper.setAttribute('class', 'search-result-wrapper');

        let searchResultName = document.createElement('span');
        searchResultName.textContent = tvShow.name;

        searchResultWrapper.appendChild(searchResultName);

        searchResultLink.appendChild(searchResultWrapper);
        return searchResultLink;
    }

    function saveTvShow(tvShowId) {
        setLoading(true);
        $.ajax({
            type: 'GET',
            url: baseUrl + tvShowId + apiKey,
            success: function (data) {

                let seasons = [];
                for (let seasonNumber in data.seasons) {
                    let seasonOriginalData = data.seasons[seasonNumber];

                    let seasonData = {
                        id: seasonOriginalData.id,
                        name: seasonOriginalData.name,
                        season_number: seasonOriginalData.season_number
                    }
                    seasons.push(seasonData);
                }

                let tvShowData = {
                    id: data.id,
                    name: data.name,
                    poster_path: data.poster_path,
                    seasons: seasons
                };
                if (seasons.length > 0) {
                    getEpisodes(tvShowData, data.number_of_seasons, data.name);
                } else {
                    renderErrorToast("Seriál " + data.name + " nebyl přidán, protože neobsahuje žádné epizody.");
                    setLoading(false);
                }

            },
            error: function () {
                console.log('API error');
                setLoading(false);
                return renderErrorToast("Chyba získávání dat o seriálu");
            }
        });
    }

    function getEpisodes(tvShowData, numberOfSeasons, showName) {
        let seasonIndex;
        seasonIndex = 0;

        let episodesArr = [];
        getEpisodesOfSeason(seasonIndex, tvShowData.seasons[0].season_number, numberOfSeasons);

        function getEpisodesOfSeason(seasonIndex, seasonNumber, numberOfSeasons) {
            $.ajax({
                type: 'GET',
                url: baseUrl + tvShowData.id + '/season/' + seasonNumber + apiKey,
                success: function (data) {
                    for (let episodeIndex in data.episodes) {

                        let episodeData = data.episodes[episodeIndex];

                        episodesArr.push({
                            id: episodeData.id,
                            episode_number: episodeData.episode_number,
                            name: episodeData.name,
                            seen: false
                        })
                    }

                    if (episodesArr.length !== 0) {
                        tvShowData.seasons[seasonIndex].episodes = episodesArr;
                    }

                    episodesArr = [];

                    if (seasonNumber < numberOfSeasons) {
                        seasonIndex++;
                        seasonNumber++;
                        getEpisodesOfSeason(seasonIndex, seasonNumber, numberOfSeasons);
                    } else {
                        localStorage.setItem(tvShowData.id, JSON.stringify(tvShowData));
                        renderSuccessToast("Seriál " + showName + " byl úspěšně přidán.")
                        renderSavedShowTiles();
                        clearSearchResultsContainer;
                        setLoading(false);
                    }
                },
                error: function () {
                    console.log("API error");
                    setLoading(false);
                    return renderErrorToast("Chyba získávání dat o sériích seriálu");
                }
            })
        }
    }

    function renderSavedShowTiles() {
        clearSavedShowsContainer();
        setLoading(true);

        let div = document.createElement('div');
        Object.keys(localStorage).forEach(function (tvShowId) {
            let tvShowData = JSON.parse(localStorage[tvShowId]);
            div.appendChild(createTvShowTile(tvShowData));
        });
        savedShowsContainer.appendChild(div);
    }

    function createTvShowTile(tvShowData) {
        let savedShowLink = document.createElement('a');

        savedShowLink.addEventListener('click', function () {
            document.title = tvShowData.name;
            setLoading(true);
            history.pushState(renderTvShowDetails(tvShowData), '', '#' + tvShowData.id);
            setLoading(false);
        })

        let savedShowWrapper = document.createElement('div');
        savedShowWrapper.setAttribute('class', 'saved-show-tile-wrapper');

        let savedShowContainer = document.createElement('div');
        savedShowContainer.setAttribute('class', 'saved-show-container');
        savedShowContainer.setAttribute('id', tvShowData.id);

        let savedShowPoster = document.createElement('img');
        if (tvShowData.poster_path === null) {
            savedShowPoster.setAttribute('src', 'assets/no_poster.png');
            savedShowPoster.setAttribute('alt', 'Blank poster');
        } else {
            savedShowPoster.setAttribute('src', baseImageUrl + tvShowData.poster_path);
            savedShowPoster.setAttribute('alt', 'Poster of ' + tvShowData.name);
        }

        let savedShowInfoWrapper = document.createElement('div');
        savedShowInfoWrapper.setAttribute('class', 'saved-show-info-wrapper');

        let savedShowName = document.createElement('h2');
        savedShowName.textContent = tvShowData.name;

        let numberOfSeenEpisodes = countSeenEpisodes(tvShowData);
        let numberOfEpisodes = countEpisodes(tvShowData);

        savedShowInfoWrapper.appendChild(savedShowName);

        let savedShowProgressBar = seenEpisodesProgressBar(numberOfSeenEpisodes, numberOfEpisodes);

        let progressBarWrapper = document.createElement('div');
        progressBarWrapper.setAttribute('class', 'progress-bar-wrapper');


        let seenEpisodeStatus = document.createElement('span');
        seenEpisodeStatus.textContent = numberOfSeenEpisodes + ' / ' + numberOfEpisodes;

        savedShowWrapper.addEventListener('mouseover', function () {
            let percentage = (numberOfSeenEpisodes / numberOfEpisodes) * 100;
            let output = '';
            if (!Number.isInteger(percentage)) {
                percentage = Math.floor(percentage);
                output = '~';
            }
            output = output + percentage + ' %';
            seenEpisodeStatus.textContent = output;
        });
        savedShowWrapper.addEventListener('mouseout', function () {
            seenEpisodeStatus.textContent = numberOfSeenEpisodes + ' / ' + numberOfEpisodes;
        });

        progressBarWrapper.appendChild(seenEpisodeStatus);

        progressBarWrapper.appendChild(savedShowProgressBar);
        savedShowInfoWrapper.appendChild(progressBarWrapper);






        savedShowContainer.appendChild(savedShowPoster);
        savedShowContainer.appendChild(savedShowInfoWrapper);

        savedShowLink.appendChild(savedShowContainer);

        savedShowWrapper.appendChild(savedShowLink);
        return savedShowWrapper;
    }

    function renderTvShowDetails(tvShowData) {
        clearSavedShowsContainer();

        let controlButtons = document.createElement('div');
        controlButtons.setAttribute('class', 'control-buttons-container');

        let backButton = createButton('arrow_back', 'zpět na kolekci');
        backButton.addEventListener("click", () => {
            document.title = 'Series Tracker';
            history.pushState(renderSavedShowTiles(), '', '.');
            setLoading(false);
        });
        controlButtons.appendChild(backButton);

        let spacingDiv = document.createElement('div');
        spacingDiv.setAttribute('class', 'control-buttons-spacer');
        controlButtons.appendChild(spacingDiv);

        let checkAll = createButton('done_all', 'označit vše jako zhlédnuto');
        checkAll.addEventListener("click", () => {
            rewriteAllSeenStatuses(tvShowData, true);
            renderTvShowDetails(JSON.parse(localStorage.getItem(tvShowData.id)));
            renderSuccessToast("Vše označeno jako zhlédnuto");
        });
        controlButtons.appendChild(checkAll);

        let uncheckAll = createButton('remove_done', 'označit vše jako nezhlédnuto');
        uncheckAll.addEventListener("click", () => {
            rewriteAllSeenStatuses(tvShowData, false);
            renderTvShowDetails(JSON.parse(localStorage.getItem(tvShowData.id)));
            renderSuccessToast("Vše označeno jako nezhlédnuto");
        });
        controlButtons.appendChild(uncheckAll);

        let deleteShow = createButton('delete', 'smazat seriál');
        deleteShow.addEventListener("click", () => {
            localStorage.removeItem(tvShowData.id);
            document.title = 'Series Tracker';
            history.pushState(renderSavedShowTiles(), '', '.');
            renderSuccessToast("Seriál " + tvShowData.name + " byl smazán z kolekce");
            setLoading(false);
        });
        controlButtons.appendChild(deleteShow);


        let savedTvShowWrapper = document.createElement('div');
        savedTvShowWrapper.setAttribute('class', 'saved-tvshow-wrapper');

        let savedTvShowContainer = document.createElement('div');
        savedTvShowContainer.setAttribute('class', 'saved-tvshow-container');

        savedTvShowWrapper.appendChild(savedTvShowContainer);

        let savedTvShowHeader = document.createElement('div');
        savedTvShowHeader.setAttribute('class', 'saved-tvshow-header');

        let h1 = document.createElement('h1');
        h1.textContent = tvShowData.name;

        let numberOfSeenEpisodes = countSeenEpisodes(tvShowData);
        let numberOfEpisodes = countEpisodes(tvShowData);
        let progressBarWrapper = document.createElement('div');
        progressBarWrapper.setAttribute('class', 'progress-bar-wrapper');

        let savedShowProgressBar = seenEpisodesProgressBar(numberOfSeenEpisodes, numberOfEpisodes);

        let seenEpisodeStatus = document.createElement('span');
        seenEpisodeStatus.textContent = numberOfSeenEpisodes + ' / ' + numberOfEpisodes;
        savedTvShowHeader.addEventListener('mouseover', function () {
            let percentage = (numberOfSeenEpisodes / numberOfEpisodes) * 100;
            let output = '';
            if (!Number.isInteger(percentage)) {
                percentage = Math.floor(percentage);
                output = '~';
            }
            output = output + percentage + ' %';
            seenEpisodeStatus.textContent = output;
        });
        savedTvShowHeader.addEventListener('mouseout', function () {
            seenEpisodeStatus.textContent = numberOfSeenEpisodes + ' / ' + numberOfEpisodes;
        });

        progressBarWrapper.addEventListener('mouseover', function () {
            let percentage = (numberOfSeenEpisodes / numberOfEpisodes) * 100;
            let output = '';
            if (!Number.isInteger(percentage)) {
                percentage = Math.floor(percentage);
                output = '~';
            }
            output = output + percentage + ' %';
            seenEpisodeStatus.textContent = output;
        });
        progressBarWrapper.addEventListener('mouseout', function () {
            seenEpisodeStatus.textContent = numberOfSeenEpisodes + ' / ' + numberOfEpisodes;
        });

        progressBarWrapper.appendChild(savedShowProgressBar);
        savedTvShowHeader.appendChild(h1);

        savedTvShowHeader.appendChild(seenEpisodeStatus);


        savedTvShowContainer.appendChild(controlButtons);
        savedTvShowContainer.appendChild(savedTvShowHeader);
        savedTvShowContainer.appendChild(progressBarWrapper);
        savedTvShowContainer.appendChild(renderSeasons(tvShowData.seasons, tvShowData.id));


        savedShowsContainer.appendChild(savedTvShowWrapper);
        setLoading(false);
        document.title = tvShowData.name;
    }

    function renderSeasons(seasons, tvShowId) {
        let savedShowSeasonsWrapper = document.createElement('div');
        savedShowSeasonsWrapper.setAttribute('class', 'saved-show-seasons-wrapper');

        for (let seasonNumber in seasons) {
            let season = seasons[seasonNumber];

            let savedShowSeasonWrapper = document.createElement('div');
            savedShowSeasonWrapper.setAttribute('class', 'saved-show-season-wrapper');

            let seasonHeaderContainer = document.createElement('div');
            seasonHeaderContainer.setAttribute('class', 'season-header-container');

            let seasonHeaderSettings = document.createElement('div');
            seasonHeaderSettings.setAttribute('class', 'season-header-settings');

            let checkAll = createButton('done_all', 'označit sérii jako zhlédnutou');
            checkAll.addEventListener('click', () => {
                rewriteSeasonSeenStatuses(season, seasonNumber, true, tvShowId);
                renderTvShowDetails(JSON.parse(localStorage.getItem(tvShowId)));
                renderSuccessToast('Všechny díly ' + season.name + ' označeny jako zhlédnuto');
            });
            seasonHeaderSettings.appendChild(checkAll);

            let uncheckAll = createButton('remove_done', 'označit sérii jako nezhlédnutou');
            uncheckAll.addEventListener("click", () => {
                rewriteSeasonSeenStatuses(season, seasonNumber, false, tvShowId);
                renderTvShowDetails(JSON.parse(localStorage.getItem(tvShowId)));
                renderSuccessToast('Všechny díly ' + season.name + ' označeny jako nezhlédnuto');
            });
            seasonHeaderSettings.appendChild(uncheckAll);


            let seasonHeader = document.createElement('h2');
            seasonHeader.textContent = season.name;

            seasonHeaderContainer.appendChild(seasonHeader);
            seasonHeaderContainer.appendChild(seasonHeaderSettings);

            let episodesTable = document.createElement('table');
            for (let episodeNumber in season.episodes) {
                let episodeTableRow = document.createElement('tr');

                let episode = season.episodes[episodeNumber];

                let episodeCode = document.createElement('td');
                let episodeCodeString = episode.episode_number < 10 ? 'E0' + episode.episode_number : 'E' + episode.episode_number;
                let seasonCodeString = season.season_number < 10 ? 'S0' + season.season_number : 'S' + season.season_number;
                episodeCode.textContent = seasonCodeString + episodeCodeString;
                episodeTableRow.appendChild(episodeCode);

                episodeTableRow.addEventListener("click", () => {
                    let storage = localStorage[tvShowId];
                    storage = JSON.parse(storage);
                    let status;
                    if (storage.seasons[seasonNumber].episodes[episodeNumber].seen) {
                        storage.seasons[seasonNumber].episodes[episodeNumber].seen = false;
                        status = false;
                    } else {
                        storage.seasons[seasonNumber].episodes[episodeNumber].seen = true;
                        status = true;
                    }
                    localStorage.setItem(tvShowId, JSON.stringify(storage));
                    renderTvShowDetails(storage);

                    let toastMessage = "Stav u " + seasonCodeString + episodeCodeString + " změněn na " + (status ? "ZHLÉDNUT" : "NEZHLÉDNUT");
                    renderSuccessToast(toastMessage);
                });

                let episodeName = document.createElement('td');
                episodeName.textContent = episode.name;
                episodeTableRow.appendChild(episodeName);


                let episodeStatusLogo = document.createElement('span');


                if (episode.seen) {
                    episodeStatusLogo.textContent = 'visibility';
                    episodeStatusLogo.setAttribute('class', 'material-icons seen-icon');
                } else {
                    episodeStatusLogo.textContent = 'visibility_off';
                    episodeStatusLogo.setAttribute('class', 'material-icons not-yet-seen');
                }

                episodeTableRow.appendChild(episodeStatusLogo);

                episodesTable.appendChild(episodeTableRow);
            }

            savedShowSeasonWrapper.appendChild(seasonHeaderContainer);
            savedShowSeasonWrapper.appendChild(episodesTable);
            savedShowSeasonsWrapper.appendChild(savedShowSeasonWrapper);
        }

        return savedShowSeasonsWrapper;
    }

    function writeSeenStatus(tvShowId) {
        let storage = localStorage[tvShowId];
        storage = JSON.parse(storage);
        console.log(storage.seasons);
    }

    function rewriteAllSeenStatuses(tvShow, newStatus) {
        console.log(tvShow);
        for (let seasonNumber in tvShow.seasons) {
            let season = tvShow.seasons[seasonNumber];
            for (let episodeNumber in season.episodes) {
                let episode = season.episodes[episodeNumber];
                tvShow.seasons[seasonNumber].episodes[episodeNumber].seen = newStatus;
            }
            localStorage.setItem(tvShow.id, JSON.stringify(tvShow));
        }

    }

    function rewriteSeasonSeenStatuses(season, seasonNumber, newStatus, tvShowId) {
        for (let episodeNumber in season.episodes) {
            season.episodes[episodeNumber].seen = newStatus;
        }
        let tvShowData = JSON.parse(localStorage[tvShowId]);
        console.log();
        tvShowData.seasons[seasonNumber] = season;
        localStorage.setItem(tvShowId, JSON.stringify(tvShowData));

    }

    function countEpisodes(tvShowData) {
        let episodesCount = 0;

        for (let seasonNumber in tvShowData.seasons) {
            season = tvShowData.seasons[seasonNumber];
            for (let episodeNumber in season.episodes) {
                episodesCount++;
            }
        }

        return episodesCount;
    }

    function countSeenEpisodes(tvShowData) {
        let seenEpisodesCount = 0;

        for (let seasonNumber in tvShowData.seasons) {
            season = tvShowData.seasons[seasonNumber];
            for (let episodeNumber in season.episodes) {
                if (season.episodes[episodeNumber].seen) {
                    seenEpisodesCount++;
                }
            }
        }

        return seenEpisodesCount;
    }

    function seenEpisodesProgressBar(numberOfSeenEpisodes, numberOfEpisodes) {
        let progressBar = document.createElement('div');

        progressBar.setAttribute('class', 'progress-bar-container');

        let outerDiv = document.createElement('div');
        outerDiv.setAttribute('class', 'progress-bar-box-outer');

        let innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'progress-bar-box-inner');
        let seenEpisodesPercentage = ((numberOfSeenEpisodes / numberOfEpisodes) * 100);
        innerDiv.style.width = seenEpisodesPercentage + "%";


        outerDiv.appendChild(innerDiv);
        progressBar.appendChild(outerDiv);

        return progressBar;
    }

    window.addEventListener('popstate', () => {
        renderBasedOnHash(location.hash);
    });

    function renderError() {
        document.title = 'HASH ERROR';
        let errorHeader = document.createElement('h1');
        errorHeader.textContent = "HASH ERROR";

        let errorText = document.createElement('p');
        errorText.textContent = "Zadané id seriálu (hash v URL adrese) nekoresponduje se žádným z uložených seriálů!";

        let div = document.createElement('div');
        div.setAttribute('id', 'error-container');

        let outerDiv = document.createElement('div');

        div.appendChild(errorHeader);
        div.appendChild(document.createElement('br'));
        div.appendChild(errorText);

        outerDiv.appendChild(div);

        savedShowsContainer.appendChild(outerDiv);
    }

    function setLoading(value) {
        if (value) {
            loading.style.display = 'block';
        } else {
            loading.style.display = 'none';
        }
    }

    function renderSuccessToast(toastMessage) {
        Toastify({
            text: toastMessage,
            duration: 1000,
            newWindow: false,
            gravity: "bottom",
            position: "center",
            style: {
                background: "#158000"
            }
        }).showToast();
    }

    function renderErrorToast(toastMessage) {
        Toastify({
            text: toastMessage,
            duration: 2000,
            newWindow: false,
            gravity: "bottom",
            position: "center",
            style: {
                background: "#80000b"
            }
        }).showToast();
    }

    function createButton(icon, text) {
        let button = document.createElement('button');
        let iconSpan = document.createElement('span');
        iconSpan.setAttribute('class', 'material-icons');
        iconSpan.textContent = icon;

        let textSpan = document.createElement('span');
        textSpan.textContent = text;

        button.appendChild(iconSpan);
        button.appendChild(textSpan);
        return button;
    }

    function setIntroductoryNotes() {
        let header = document.createElement('h1');
        header.textContent = 'Kolekce seriálů je prázdná'
        let firstParagrapgh = document.createElement('p');
        firstParagrapgh.textContent = 'Pro přidání nového seriálu kliněte do horního inputboxu a začněte psát název hledaného seriálu.';

        let secondParagrapgh = document.createElement('p');
        secondParagrapgh.textContent = 'Po vypsání výsledků klikněte na dláždici daného seriálu, tím se seriál uloží do kolekce.';

        let thirdParagrapgh = document.createElement('p');
        thirdParagrapgh.textContent = 'Po následném uložení aplikace automaticky zobrazí kolekci s daným seriálem.';

        let fourthParagrapgh = document.createElement('p');
        fourthParagrapgh.textContent = 'Kliknutím na dláždici v kolekci otevřete okno pro zápis stavu rozkoukanosti seriálu.';


        let notesWrapper = document.createElement('div');
        notesWrapper.setAttribute('id', 'introductory-notes-container')
        notesWrapper.appendChild(header);
        notesWrapper.appendChild(firstParagrapgh);
        notesWrapper.appendChild(secondParagrapgh);
        notesWrapper.appendChild(thirdParagrapgh);
        notesWrapper.appendChild(fourthParagrapgh);
        savedShowsContainer.appendChild(notesWrapper);
    }
});