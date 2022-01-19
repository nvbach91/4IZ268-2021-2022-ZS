$(document).ready(() => {
    $.ajax({
        "type": "POST",
        "url": "https://us.battle.net/oauth/token",
        "headers": {
            "Accept": "application/json",
            "Authorization": "Basic " + btoa('127f6dc43d7345c9b79633f66f2878f6:b0Ha73YhZzuhmACFxulJxjT0RKGZUQ41')
        },

        "data": {
            "grant_type": "client_credentials"
        },


        "success": function (response) {
            token = response.access_token;
            expiresIn = response.expires_in;
        },

    });

    let granimInstance = new Granim({
        element: '#canvas-image-blending',
        direction: 'top-bottom',
        isPausedWhenNotInView: true,
        image: {
            blendingMode: 'screen'

        },
        states: {
            'default-state': {
                gradients: [
                    ['#29323c', '#485563'],
                    ['#FF6B6B', '#556270'],
                    ['#80d3fe', '#7ea0c4'],
                    ['#b851f0', '#f051eb']
                ],
                transitionSpeed: 7000
            }
        }
    });

    var canvas = document.getElementById('canvas-image-blending');
    var heightRatio = 1.5;
    canvas.height = canvas.width * heightRatio;


    const appContainer = $('#app');
    const mainHeader = $(`
        <div class="main-header" id="main-header">
        <img src="https://www.nicepng.com/png/full/76-767609_world-of-warcraft-logo-png-loot-crate-world.png" width="250" alt="logo" class="logo">
        <h1>World of Warcraft Basic Wiki</h1>
        </div>;
    `);

    const nav = $(`
        <div class="nav">
        <button class="nav-button" id="race">Race</button>
        <button class="nav-button" id="class">Class</button>
        <button class="nav-button" id="profession">Profession</button>
        <button class="nav-button" id="items">Items sets</button>
        <button class="nav-button" id="mounts">Mounts</button>
        <button class="nav-button" id="pets">Pets</button>
        </div>;
    `);

    const centerBar = $(`
    <div class="center-bar" id="center-bar">
    <input type="text" class="search-bar" id="search-bar" onkeyup = "searchBar()"  placeholder="Search..">
    <button class="center-button" id="action1">A-Z</button>
    <button class="center-button" id="action2">Z-A</button>
    <button class="center-button" id="action3">Your PvP stats</button>
    <div class="page-header" id="page-header"></div>
    </div>;
    `);

    const mainBox = $(`
    <div class="main-box" id="main-box">
    </div>;
    `);

    mainHeader.appendTo(appContainer);
    centerBar.appendTo(appContainer);
    mainBox.appendTo(appContainer);
    nav.appendTo(appContainer);

    $('#race').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });
        mainBox.LoadingOverlay('show');

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/playable-race/index?namespace=static-us&locale=en_US&access_token=' + token);
        const head = $('<div>').addClass('head');
        const name = $('<div>').addClass('name');
        name.append('Name');
        const faction = $('<div>').addClass('fac');
        faction.append('Faction');
        const id = $('<div>').addClass('id');

        id.append('ID');
        head.append(name);
        head.append(id);
        head.append(faction);

        pageHeader.append(head);

        for (let i = 0; i < apiRes.races.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('information');
            const setName = $('<div>').addClass('name');

            const newContent = document.createTextNode(apiRes.races[i].name);
            setName.append(newContent);

            let raceID = apiRes.races[i].id;
            let raceRes = await callApi('https://us.api.blizzard.com/data/wow/playable-race/' + raceID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);

            const setID = $('<div>').addClass('id');
            setID.append(raceRes.id);
            const setFaction = $('<div>').addClass('fac');
            setFaction.append(raceRes.faction.name);

            setBox.append(setName);
            setBox.append(setID);
            setBox.append(setFaction);

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);
        };
    });



    $('#class').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-us&locale=en_US&access_token=' + token);



        for (let i = 0; i < apiRes.classes.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('list');
            const newContent = document.createTextNode(apiRes.classes[i].name);
            setBox.append(newContent);

            setBox.click(async function () {
                mainBox.LoadingOverlay('show', {
                    background: 'rgba(0, 0, 255, 0.5)',
                });

                mainBox.empty();
                let classID = apiRes.classes[i].id;

                let classRes = await callApi('https://us.api.blizzard.com/data/wow/playable-class/' + classID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);
                let classImg = await callApi('https://us.api.blizzard.com/data/wow/media/playable-class/' + classID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);

                const setDetail = $('<div>').addClass('information');
                const setName = $('<div>').addClass('detail');
                setName.append(classRes.name);
                const setID = $('<div>').addClass('detail');
                setID.append(classRes.id);
                const setPower = $('<div>').addClass('detail');
                setPower.append(classRes.power_type.name);
                const specList = $('<div>').addClass('detail');

                for (let j = 0; j < classRes.specializations.length; j++) {
                    const setSpec = $('<div>').addClass('list-detail');
                    setSpec.append(classRes.specializations[j].name);
                    specList.append(setSpec);
                };

                const classImage = $('<img>').attr('src', classImg.assets[0].value).attr('alt', 'class image').width('150px').height('150px');
                const setImg = $('<div>').addClass('detail');
                setImg.append(classImage);


                setDetail.append('<h2>Name</h2>');
                setDetail.append(setName);
                setDetail.append('<h2>ID</h2>');
                setDetail.append(setID);
                setDetail.append('<h2>Power Type</h2>');
                setDetail.append(setPower);
                setDetail.append('<h2>Specializations</h2>');
                setDetail.append(specList);
                setDetail.append(setImg);


                mainBox.append(setDetail);
                mainBox.LoadingOverlay('hide', true);
            });

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);
        };
    });

    $('#profession').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/profession/index?namespace=static-us&locale=en_US&access_token=' + token);

        for (let i = 0; i < apiRes.professions.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('list');
            const newContent = document.createTextNode(apiRes.professions[i].name);
            setBox.append(newContent);

            setBox.click(async function () {
                mainBox.LoadingOverlay('show', {
                    background: 'rgba(0, 0, 255, 0.5)',
                });

                mainBox.empty();
                let professionID = apiRes.professions[i].id;

                let professionRes = await callApi('https://us.api.blizzard.com/data/wow/profession/' + professionID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);
                let professionImg = await callApi('https://us.api.blizzard.com/data/wow/media/profession/' + professionID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);

                const setDetail = $('<div>').addClass('information');
                const setName = $('<div>').addClass('detail');
                setName.append(professionRes.name);
                const setID = $('<div>').addClass('detail');
                setID.append(professionRes.id);
                const setType = $('<div>').addClass('detail');
                setType.append(professionRes.type.name);
                const setDescription = $('<div>').addClass('detail');
                setDescription.append(professionRes.description);
                const professionTier = $('<div>').addClass('detail');

                if (professionRes.skill_tiers != null) {
                    for (let j = 0; j < professionRes.skill_tiers.length; j++) {
                        const tiers = $('<div>').addClass('list-detail');
                        tiers.append(professionRes.skill_tiers[j].name);
                        professionTier.append(tiers);
                    };
                } else {
                    professionTier.append('Unspecified');
                }

                const professionImage = $('<img>').attr('src', professionImg.assets[0].value).attr('alt', 'profession image').width('150px').height('150px');
                const setImg = $('<div>').addClass('detail');
                setImg.append(professionImage);

                setDetail.append('<h2>Name</h2>');
                setDetail.append(setName);
                setDetail.append('<h2>ID</h2>');
                setDetail.append(setID);
                setDetail.append('<h2>Type</h2>');
                setDetail.append(setType);
                setDetail.append('<h2>Tiers</h2>');
                setDetail.append(professionTier);
                setDetail.append('<h2>Description</h2>');
                setDetail.append(setDescription);
                setDetail.append(setImg);

                mainBox.append(setDetail);
                mainBox.LoadingOverlay('hide', true);
            });

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);
        };
    });

    $('#mounts').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/mount/index?namespace=static-us&locale=en_US&access_token=' + token);

        for (let i = 0; i < apiRes.mounts.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('list');
            const newContent = document.createTextNode(apiRes.mounts[i].name);
            setBox.append(newContent);

            setBox.click(async function () {
                mainBox.LoadingOverlay('show', {
                    background: 'rgba(0, 0, 255, 0.5)',
                });

                mainBox.empty();
                let mountID = apiRes.mounts[i].id;

                let mountRes = await callApi('https://us.api.blizzard.com/data/wow/mount/' + mountID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);

                const setDetail = $('<div>').addClass('information');
                const setName = $('<div>').addClass('detail');
                setName.append(mountRes.name);
                const setID = $('<div>').addClass('detail');
                setID.append(mountRes.id);
                const setSource = $('<div>').addClass('detail');
                setSource.append(mountRes.source.name);
                const setDescription = $('<div>').addClass('detail');
                setDescription.append(mountRes.description);
                const setFaction = $('<div>').addClass('detail');

                if (mountRes.faction != null) {
                    setFaction.append(mountRes.faction.name);
                } else {
                    setFaction.append('Unspecified');
                }

                setDetail.append('<h2>Name</h2>');
                setDetail.append(setName);
                setDetail.append('<h2>ID</h2>');
                setDetail.append(setID);
                setDetail.append('<h2>Source</h2>');
                setDetail.append(setSource);
                setDetail.append('<h2>Faction</h2>');
                setDetail.append(setFaction);
                setDetail.append('<h2>Description</h2>');
                setDetail.append(setDescription);

                mainBox.append(setDetail);
                mainBox.LoadingOverlay('hide', true);
            });

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);
        };
    });

    $('#pets').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/pet/index?namespace=static-us&locale=en_US&access_token=' + token);
      
        for (let i = 0; i < apiRes.pets.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('list');
            const newContent = document.createTextNode(apiRes.pets[i].name);
            setBox.append(newContent);

            setBox.click(async function () {
                mainBox.LoadingOverlay('show', {
                    background: 'rgba(0, 0, 255, 0.5)'
                });

                mainBox.empty();
                let petID = apiRes.pets[i].id;

                let petRes = await callApi('https://us.api.blizzard.com/data/wow/pet/' + petID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);
               
                const setDetail = $('<div>').addClass('information');
                const setName = $('<div>').addClass('detail');
                setName.append(petRes.name);
                const setID = $('<div>').addClass('detail');
                setID.append(petRes.id);
                const setSource = $('<div>').addClass('detail');
                setSource.append(petRes.source.name);
                const setDescription = $('<div>').addClass('detail');
                setDescription.append(petRes.description);
                const setAbilities = $('<div>').addClass('detail');

                for (let j = 0; j < petRes.abilities.length; j++) {
                    const ability = $('<div>').addClass('list-detail');
                    ability.append(petRes.abilities[j].ability.name);
                    setAbilities.append(ability);
                };

                const petImage = $('<img>').attr('src', petRes.icon).attr('alt', 'pet image').width('150px').height('150px');
                const setImg = $('<div>').addClass('detail');
                setImg.append(petImage);

                setDetail.append('<h2>Name</h2>');
                setDetail.append(setName);
                setDetail.append('<h2>ID</h2>');
                setDetail.append(setID);
                setDetail.append('<h2>Source</h2>');
                setDetail.append(setSource);
                setDetail.append('<h2>Abilities</h2>');
                setDetail.append(setAbilities);
                setDetail.append('<h2>Description</h2>');
                setDetail.append(setDescription);
                setDetail.append(setImg);

                mainBox.append(setDetail);
                mainBox.LoadingOverlay('hide', true);
            });

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);
        };

    });

    $('#items').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        mainBox.LoadingOverlay('show', {
            background: 'rgba(0, 0, 255, 0.5)',
        });

        let apiRes = await callApi('https://us.api.blizzard.com/data/wow/item-set/index?namespace=static-us&locale=en_US&access_token=' + token);

        for (let i = 0; i < apiRes.item_sets.length; i++) {
            const setBox = $('<div class="setBox">').addClass('sort').addClass('list');
            const newContent = document.createTextNode(apiRes.item_sets[i].name);
            setBox.append(newContent);

            setBox.click(async function () {
                mainBox.LoadingOverlay('show', {
                    background: 'rgba(0, 0, 255, 0.5)',
                });

                mainBox.empty();
                let itemID = apiRes.item_sets[i].id

                let itemRes = await callApi('https://us.api.blizzard.com/data/wow/item-set/' + itemID.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);

                const setDetail = $('<div>').addClass('information');
                const setName = $('<div>').addClass('detail');
                setName.append(itemRes.name);
                const setID = $('<div>').addClass('detail');
                setID.append(itemRes.id);
                const setItems = $('<div>').addClass('detail');

                for (let j = 0; j < itemRes.items.length; j++) {
                    const items = $('<div>').addClass('list-detail');
                    items.append(itemRes.items[j].name);
                    const img = itemRes.items[j].id;

                    let itemsImage = await callApi('https://us.api.blizzard.com/data/wow/media/item/' + img.toString() + '?namespace=static-us&locale=en_US&access_token=' + token);
                    const itemImage = $('<img>').attr('src', itemsImage.assets[0].value).attr('alt', 'item image').width('50px').height('50px');
                   
                    setItems.append(items);
                    setItems.append(itemImage);
                }

                const setEffects = $('<div>').addClass('detail');

                for (let j = 0; j < itemRes.effects.length; j++) {
                    const effect = $('<div>').addClass('list-detail');
                    effect.append(itemRes.effects[j].display_string);
                    setEffects.append(effect);
                }

                setDetail.append('<h2>Name</h2>');
                setDetail.append(setName);
                setDetail.append('<h2>ID</h2>');
                setDetail.append(setID);
                setDetail.append('<h2>Items</h2>');
                setDetail.append(setItems);
                setDetail.append('<h2>Effects</h2>');
                setDetail.append(setEffects);

                mainBox.append(setDetail);
                mainBox.LoadingOverlay('hide', true);
            });

            mainBox.append(setBox);
            mainBox.LoadingOverlay('hide', true);

        };


    });

    $('#action1').click(function () {
        $('.sort').sort(function (a, b) {
            if (a.textContent < b.textContent) {
                return -1;
            } else {
                return 1;
            }
        }).appendTo('.main-box');
    });

    $('#action2').click(function () {
        $('.sort').sort(function (a, b) {
            if (a.textContent < b.textContent) {
                return 1;
            } else {
                return -1;
            }
        }).appendTo('.main-box');
    });

    $('#action3').click(async function () {
        let mainBox = $('#main-box');
        let pageHeader = $('#page-header');
        pageHeader.empty();
        mainBox.empty();

        const playerForm = $(`
        <div class="player-form">

        <div class="form-input">
        <label>Name :</label>
        <input type="text" name="name" id="name" placeholder="name" value="procesor"/></div>

        <div class="form-input">
        <label>Realm :</label>
        <input type="text" name="realm" id="realm" placeholder="realm" value="ravencrest"/></div>

        <div class="form-input">
        <label>Region :</label>
        <input type="text" name="region" id="region" placeholder="eu, us, ..." value="eu"/></div>

        <div class="form-input">
        <label>Profile :</label>
        <input type="text" name="profile" id="profile" placeholder="profile-eu, profile-us, ..." value="profile-eu"/></div>

        <div class="form-input">
        <label>Locale :</label>
        <input type="text" name="locale" id="locale" placeholder="en_gb, en_us, ..." value="en_gb"/></div>

        <div class="form-input"><input type="button" name="submit_id" id="btn_id" value="Submit" onclick="submit_by_id()"/></div>

        </div>

        `);

        mainBox.append(playerForm);

    });

});

function callApi(address) {
    return $.ajax({
        type: 'GET',
        url: address,
        contentType: 'application/json',
    });


};

function searchBar() {
    var input = document.getElementById('search-bar');
    var filter = input.value.toLowerCase();
    var nodes = $('.setBox');

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = 'block';
        } else {
            nodes[i].style.display = 'none';
        }
    }
}

async function submit_by_id() {
    let mainBox = $('#main-box');

    var elementExist = document.getElementById('information')
    if (!!elementExist) {
        var child = elementExist.lastElementChild;
        while (child) {
            elementExist.removeChild(child);
            child = elementExist.lastElementChild;
        }
        elementExist.parentNode.removeChild(elementExist);
    }

    const name = document.getElementById('name').value;
    const realm = document.getElementById('realm').value;
    const region = document.getElementById('region').value;
    const profile = document.getElementById('profile').value;
    const locale = document.getElementById('locale').value;

    try {
        let apiRes = await callApi('https://' + region + '.api.blizzard.com/profile/wow/character/' + realm + '/' + name + '/pvp-summary?namespace=' + profile + '&locale=' + locale + '&access_token=' + token);

        let wonGames = 0;
        let lostGames = 0;

        for (let i = 0; i < apiRes.pvp_map_statistics.length; i++) {
            wonGames = wonGames + (apiRes.pvp_map_statistics[i].match_statistics.won);
            lostGames = lostGames + (apiRes.pvp_map_statistics[i].match_statistics.lost);

        };

        const chartBox = $('<div>').addClass('chart')
        let ctxCanvas = $('<canvas>');
        new Chart(ctxCanvas, {
            type: 'pie',
            data: {
                labels: ['Won', 'lost'],
                datasets: [
                    {
                        data: [wonGames, lostGames],
                        backgroundColor: [
                            'blue',
                            'violet',
                        ],

                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            responsive: true,
            maintainAspectRation: false,
        });

        chartBox.append(ctxCanvas);

        const setDetail = $('<div id="information">').addClass('information');
        const setName = $('<div>').addClass('detail');
        setName.append(apiRes.character.name);
        const setRealm = $('<div>').addClass('detail');
        setRealm.append(apiRes.character.realm.name);
        const setHonorLevel = $('<div>').addClass('detail');
        setHonorLevel.append(apiRes.honor_level);

        const setMaps = $('<div>').addClass('detail');
        for (let j = 0; j < apiRes.pvp_map_statistics.length; j++) {
            const map = $('<div>').addClass('list-detail');
            map.append(apiRes.pvp_map_statistics[j].world_map.name);
            setMaps.append(map);
        };

        setDetail.append('<h2>Name</h2>');
        setDetail.append(setName);
        setDetail.append('<h2>Realm</h2>');
        setDetail.append(setRealm);
        setDetail.append('<h2>Honor level</h2>');
        setDetail.append(setHonorLevel);
        setDetail.append('<h2>Maps</h2>');
        setDetail.append(setMaps);
        setDetail.append('<h2>Win-loss ratio</h2>');
        setDetail.append(chartBox);

        mainBox.append(setDetail);
    } catch (e) {
        const setDetail = $('<div id="information">').addClass('information');
        setDetail.append('<h2>Not found</h2>');
        mainBox.append(setDetail);
    }

};
