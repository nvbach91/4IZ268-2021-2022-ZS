document.addEventListener("DOMContentLoaded", function (event) {

   const form = document.querySelector('form');
   const factDiv = document.querySelector('.number-fact');
   const getRndm = document.querySelector('.getRandom');
   const saveToFav = document.querySelector('.button-save');
   const favorites = document.querySelector('.favorites');
   const clearstrg = document.querySelector('.clearstrg');
   const inp = document.querySelector('#num');
   let arr = [];



   

   const createDiv = (number) => {

      const numberCont = document.createElement('button');
      numberCont.innerText = number;
      numberCont.addEventListener('click', () => {

         inp.value = number;
       
         form.dispatchEvent(new Event('submit'));

      })

      return numberCont;


   }

   function div(x, y) {
      return (x - x % y) / y;
   }



   const arr2 = [];
   arr = JSON.parse(localStorage.getItem('favorite'));

   if (arr === null){
      arr = [];

   }

   for (let i = 0; i < arr.length; i++) {
      const nom = createDiv(arr[i]);
      arr2.push(nom);
   }
   favorites.innerHTML = '';
   favorites.append(...arr2);




   //funkce na generování náhodného čísla 
   function randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
   }
   //funkce na zvolení typu faktu pomocí zgenerovaného čísla 
   function randomType() {
      const num = randomInteger(1, 4);
      if (num == 1) {
         const typ = "trivia";
         console.log(typ);
         return typ;
      }

      if (num == 2) {
         const typ = "math";
         console.log(typ);
         return typ;
      }

      if (num == 3) {
         const typ = "year";
         console.log(typ);
         return typ;
      }

      if (num == 4) {
         const typ = "date";
         console.log(typ);
         return typ;
      }


   }



   form.addEventListener('submit', (e) => {
      e.preventDefault();
      const loadText = 'wait a little bit ⌛';
      factDiv.innerHTML = loadText;
      const baseURL = 'http://numbersapi.com/';
      const number = e.target.querySelector('input[type="number"]').value;
      let type = e.target.querySelector('input[type="radio"]:checked').value;
      if (type == 'date') {
         const numbermonth = number % 100;
         const numberday = div(number, 100);
         fetch(baseURL + numbermonth + '/' + numberday + '/' + type, {
               headers: {
                  'x-requested-with': 'text/plain'
               }
            })
            .then(response => response.text())
            .then(text => factDiv.innerText = text)
            .catch(e => console.log(e));
      } else {
         if (type == 'random') {
            const typ = '/' + randomType();
            const number2 = e.target.querySelector('input[type="number"]').value;
            fetch(baseURL + number2 + typ, {
                  headers: {
                     'x-requested-with': 'text/plain'
                  }
               })
               .then(response => response.text())
               .then(text => factDiv.innerText = text)
               .catch(e => console.log(e));


         } else {
            fetch(baseURL + number + '/' + type, {
                  headers: {
                     'x-requested-with': 'text/plain'
                  }
               })
               .then(response => response.text())
               .then(text => factDiv.innerText = text)
               .catch(e => console.log(e));
         }
      }

   })


   //Generování faktu náhodného typu o náhodnem čísle
   getRndm.addEventListener('click', () => {
      const loadText = 'wait a little bit ⌛';
      factDiv.innerHTML = loadText;
      const baseURL = 'http://numbersapi.com/';
      const number = randomInteger(0, 2000);
      console.log(number);
      const typ = '/' + randomType();
      fetch(baseURL + number + typ, {
            headers: {
               'x-requested-with': 'text/plain'
            }
         })
         .then(response => response.text())
         .then(text => factDiv.innerText = text)
         .catch(e => console.log(e));

   })

   saveToFav.addEventListener('click', () => {
      const number = document.querySelector('input[type="number"]').value;

      if (number > 0) {

         arr.unshift(number);

         

         const arr2 = [];

         for (let i = 0; i < arr.length; i++) {
            const nom = createDiv(arr[i]);
            arr2.push(nom);
         }
         favorites.innerHTML = '';
         favorites.append(...arr2);


         localStorage.setItem('favorite', JSON.stringify(arr));
      } else {
         favorites.innerText = "Fill the number > 0 ";;
      }


   })


   clearstrg.addEventListener('click', () => {
      /*localStorage.clear();*/
      delete localStorage.favorite;
      favorites.innerHTML = '';
      favorites.innerText = 'Nothing here yet...';

   })

});

//https://cors-anywhere.herokuapp.com/