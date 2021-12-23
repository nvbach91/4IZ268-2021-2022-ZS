
$(document).ready(() => {
    const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

    const main = $('#main');
    const form = $('#form');
    const search = $('#search');
    const button = $('#search-button');

    showMovies(apiUrl);

    function showMovies(url){
        fetch(url).then(res => res.json())
        .then(function(data){
        data.results.forEach(element => {
    
            const container = $('<div></div>').addClass('container');
            
            const column1 = $('<div></div>').addClass('column');
            const column2 = $('<div></div>').addClass('column');
    
            const image = document.createElement('img');
            image.src = IMGPATH + element.poster_path;
            column2.append(image);
    
            const name = $('<h2></h2>').text(element.title);
    
            const rating = $('<div></div>').addClass('rating').html(
                convertToStars(element.vote_average)
            );
            
            const description = $('<div></div>').text(element.overview);
    
            const pickerContainer = $('<div></div>').addClass('picker-container');
    
            const dateRow = $('<div></div>').addClass('row');
            const dateText = $('<p></p>').html('<strong>Select a date:</strong>');
    
            const dateInput = $('<input/>').attr('type','date');
            
            dateRow.append(dateText,dateInput);
    
            const timeRow = $('<div></div>').addClass('row');
            const timeText = $('<p></p>').html('<strong>Select a time:</strong>');
            const timeInput = $('<input/>').attr('type','time');
             
            timeRow.append(timeText,timeInput);
    
            const submitButton = $('<button></button>').addClass('submit-button').text('Add to google calendar');
    
            pickerContainer.append(dateRow,timeRow,submitButton);
    
            column1.append(name,rating,description,pickerContainer);
    
            container.append(column1,column2);
            main.append(container);
            
        }); 
    });
    }
    
    const convertToStars = (rating) => {
        const numberOfStars = Math.round(rating / 2);
        let stars = '';
        for(let i = 0; i < numberOfStars; i++){
            stars = stars + '&starf;';
        }
        return stars;
    }
    
    button.click((e) => {
        e.preventDefault();
        main.empty();
         
        const searchTerm = search.val();
    
        if (searchTerm) {
            showMovies(SEARCHAPI + searchTerm);
            search.value = searchTerm;
        }
    });
    


});
