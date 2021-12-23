$(document).ready(() => {

    const appContainer = $('#app');
    const mainHeader = $(`
        <div class="main-header">
        WOW wiki
        </div>;
    
    `);

    const nav = $(`
        <div class="nav">
        <button class="nav-button" id="race">Race</button>
        <button class="nav-button" id="profession">Profession</button>
        <button class="nav-button" id="mounts">Mounts</button>
        <button class="nav-button" id="pets">Pets</button>
        <button class="nav-button" id="items">Items</button>
        </div>;
    
    `);

    const centerBar = $(`
    <div class="center-bar">
    <input class="search-bar" type="text" placeholder="Search..">
    <button class="center-button" id="action1">Action1</button>
    <button class="center-button" id="action2">Action2</button>
    <button class="center-button" id="action3">Action3</button>
    </div>;
    `);

    const mainBox = $(`
    <div class="main-box">
    Content
    </div>;
    `);

    mainHeader.appendTo(appContainer);   
    centerBar.appendTo(appContainer);
    mainBox.appendTo(appContainer);
    nav.appendTo(appContainer);

   $('#race').click(function(){
    console.log('ahoj');
   }); 


});

