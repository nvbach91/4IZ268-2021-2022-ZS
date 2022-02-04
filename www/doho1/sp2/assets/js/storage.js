// basic "backend" data manipulation, persistence layer (localStorage)
export default class Storage {
    //get all notes (array) for selected (matching) marker
    static getAll(marker) {
        const notes = JSON.parse(localStorage.getItem(marker) || "[]");
        //console.log(localStorage.getItem(marker));
        return notes.sort((a, b) => {
            return new Date(a.time) > new Date(b.time) ? -1 : 1;
        });
    }

    //store notes for selected (matching) marker
    static store(noteToSave, marker) {
        const notes = Storage.getAll(marker);
        const existing = notes.find(note => note.id == noteToSave.id);
        const lat = JSON.parse(marker).lat;
        const lon = JSON.parse(marker).lng;
        
       const APIkey = '73fa1324ca4ae251247fe725704ae465';
            $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
                .done((data) => {
                    const temperature = data.main.temp;
                    const timeHtml = $(`.notes-item-time[data-note-id=${noteToSave.id}]`);
                    const tempHtml = $(`<div class="notes-item-temp" data-note-id="${noteToSave.id}">`).text(`${temperature} °C`);
                    timeHtml.append(tempHtml);
                    //console.log(timeTemp);
                })
                .fail((resp) => {
                    switch (resp.status) {
                        case 404: return console.log('Not found');
                        case 401: return console.log('You are not logged in');
                    }
                });
        
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.time = new Date().toISOString();
            //existing.temp = temperature;
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000);
            noteToSave.time = new Date().toISOString();
            //noteToSave.temp = temperature;
            notes.push(noteToSave);
        }

        localStorage.setItem(marker, JSON.stringify(notes));
    }

    

    //delete notes for selected (matching) marker
    static delete(id, marker) {
        const notes = Storage.getAll(marker);
        const newNotes = notes.filter(note => note.id != id);
        
        localStorage.setItem(marker, JSON.stringify(newNotes));
    }
}

/* Data ,model, mapping marker (latlng) to list of individual notes
{
    latitude: '-50',
    longtitude: '30'
 } map {
    id: '8000', --> note identifier
    title: 'My note',
    body: 'Custom note'
    time: (updated time)
}
*/