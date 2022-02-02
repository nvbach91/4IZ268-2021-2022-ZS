import Notes from "./Notes.js";

$(document).ready(() => { 
    // event locationchange is added by modified function pushState below
    window.addEventListener('locationchange', () => {
        let focusMarker = sessionStorage.getItem('helper').toString();
        const root = document.getElementById("notes");
        const app = new Notes(root, focusMarker);

        //text area (notes body) height depends on amount of (rows) of text
        const textarea = document.getElementById('notes-body');
        textarea.addEventListener("keyup", (e) => {
            textarea.style.height = "70px";
            let scHeight = e.target.scrollHeight;
            textarea.style.height = `${scHeight}px`;
        });
    });

    //add listener for (history) popstate
    window.addEventListener('popstate', (e) => {
        console.log(`location: ${document.location}, state: ${JSON.stringify(e.state)}`)
    });

    //This modifies pushState function so that it fires a custom locationchange event
    //for me to use, and also pushstate events if I want to use those.
    history.pushState = ( f => function pushState() {
        let custom = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return custom;
    })(history.pushState);
});