const form = document.querySelector('form');
const factDiv = document.querySelector('.number-fact');
const getRndm = document.querySelector('.getRandom');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

function randomType(){
   const num =  randomInteger(1,4);
   if (num == 1) {
      const typ = "trivia";
      console.log(typ);
      return typ;
   } 

   if (num == 2){
      const typ = "math";
      console.log(typ);
      return typ;
   }

   if (num == 3){
      const typ = "year";
      console.log(typ);
      return typ;
   }

   if (num == 4){
    const typ = "date";
    console.log(typ);
    return typ;
 }
   
   
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const loadText ="wait a little bit ⌛";
  factDiv.innerHTML = loadText;
  const baseURL = "https://cors-anywhere.herokuapp.com/http://numbersapi.com/";
  const number = e.target.querySelector('input[type="number"]').value;
  fetch(baseURL + number,{
    headers:{
      'x-requested-with': 'text/plain'
    }})
    .then(response => response.text())
    .then(text => factDiv.innerHTML = text)
    .catch(e=>console.log(e));
})

getRndm.addEventListener('click', () => {
    const loadText ="wait a little bit ⌛";
    factDiv.innerHTML = loadText;
    const baseURL = "https://cors-anywhere.herokuapp.com/http://numbersapi.com/";
    const number = randomInteger(0, 2000);
    const typ = "/" + randomType();
    fetch(baseURL + number + typ,{
        headers:{
            'x-requested-with': 'text/plain'
          }})
          .then(response => response.text())
          .then(text => factDiv.innerHTML = text)
          .catch(e=>console.log(e));

    })


