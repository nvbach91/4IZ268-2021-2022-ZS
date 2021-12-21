const url= "https://opentdb.com/api.php?amount=1";
const urlMultiple = "https://opentdb.com/api.php?amount=1&type=multiple"

async function getTrivia(){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function shuffleArray(arr){
    for (let i = arr.lenght - 1; i >= 0; i--){
        const shuffle = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[shuffle]] = [arr[shuffle], arr[i]];
    }
}

getTrivia().then((data) => {
    const results = data.results[0];
    console.log(results); 
    document.getElementById('question').innerHTML= results.question;
    document.getElementById('category').innerHTML= results.category;
    const answers = [...results.incorrect_answers, results.correct_answer];
    shuffleArray(answers);
    for(let i = 0; i < 4; i++) {
        let index =i+1
        document.getElementById('choice'+index+'label').innerHTML = answers[i];
    }

    let form=document.querySelector('form');

    document.addEventListener('submit', (event) => {
        alert('good!');
        event.preventDefault;
    })
});