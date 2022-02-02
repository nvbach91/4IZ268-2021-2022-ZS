import Notes from "./Notes.js";


 window.addEventListener('locationchange', () => {
    let focusMarker = sessionStorage.getItem('helper').toString();
    const root = document.getElementById("notes");
    const app = new Notes(root, focusMarker);
    console.log(focusMarker);
    // It's local storage

    const textarea = $('#notes-body');
    textarea.addEventListener("keyup", (e) => {
        textarea.style.height = "70px";
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
    });
});

window.addEventListener('popstate', (e) => {
    console.log(`location: ${document.location}, state: ${JSON.stringify(e.state)}`)
});


history.pushState = ( f => function pushState() {
    let custom = f.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return custom;
})(history.pushState);