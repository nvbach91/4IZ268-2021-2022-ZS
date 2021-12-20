const form = document.querySelector('form');
const factDiv = document.querySelector('.number-fact');
const getRndm = document.querySelector('.getRandom');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

function randomType(){
   const typ = ""; 
   const num =  randomInteger(1,3);
   if (num == 1) {
        typ == "trivia";
   } 

   if (num == 2){
        typ == "math";
   }

   if (num == 3){
        typ == "year";
   }
   return typ;
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const loadText ="wait a little bit";
  factDiv.innerHTML = loadText;
  const baseURL = "http://numbersapi.com/";
  const number = e.target.querySelector('input[type="number"]').value;
  fetch(baseURL + number,{
    headers:{
      'x-requested-with': 'text/plain'
    }})
    .then(response => response.text())
    .then(text => factDiv.innerHTML = text)
    .catch(e=>console.log(e));
})




