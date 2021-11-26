/*console.log('ahoj svete-');

const sentence = '   kobyla ma  maly bok    kajak je blbej';

console.log(sentence.length);

console.log(sentence.charAt(5));
console.log(sentence.charAt(sentence.length - 1));

console.log(
    sentence.charAt(sentence.indexOf('b'))
);

console.log(sentence.slice(0, 5));
console.log(sentence.slice(5));
console.log(sentence.slice(-5));

console.log(sentence.replace('k', 'xxx'));
console.log(sentence.replace(/[kal]/g, 'x'));
console.log(sentence.replace(/ +/g, '-'));

console.log(sentence.toUpperCase());
console.log(sentence.toUpperCase().toLowerCase());


console.log(sentence.trim());
console.log(sentence.trim().split(/ +/));

const words = ['kobyla', 'ma', 'maly', 'bok'];

console.log(words.join('+'));*/

window.onload = () => {
    const pokemonForm = document.querySelector('#pokemon-form');
    // console.log(pokemonForm);
    const pokemonNameInput = document.querySelector('input[name="pokemon-name"]');
    const pokemonList = document.querySelector('#pokemons');
    const pokemonRemoveAllButton = document.querySelector('#remove-all');
    const pokemonCountContainer = document.querySelector('#pokemon-count');

    pokemonRemoveAllButton.addEventListener('click', () => {
        pokemonList.innerHTML = '';
        pokemonCountContainer.innerText = '0';
    });

    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // 'pikachu squirtle charmander' -> ['pikachu', 'squirtle', 'charmander'];
        const inputValue = pokemonNameInput.value.trim();
        const pokemonNames = inputValue.split(/ +/);
        const pokemonCount = parseInt(pokemonCountContainer.innerText);
        // const temporaryPokemons = [];
        
        for (let i = 0; i < pokemonNames.length; i += 1) {
            const pokemonName = pokemonNames[i];
            
            fetch('https://pokeapi.co/api/v2/pokemon/charizard').then((resp) => {
                return resp.json();
            }).then((resp) => {
                const pokemonType = resp.types[0].type.name;
                const pokemonData = {
                    name: pokemonName,
                    id: resp.id,
                    imageUrl: 'https://www.postavy.cz/foto/' + pokemonName + '-foto.jpg',
                    type: pokemonType,
                    height: resp.height,
                };
                const pokemon = createPokemon(pokemonData);
                // temporaryPokemons.push(pokemon);
                pokemonList.appendChild(pokemon);
                updatePokemonCount(pokemonCount + 1);
            });

        }
    });



    const updatePokemonCount = (newCount) => {
        pokemonCountContainer.innerText = newCount;
    };

    const createPokemon = (pokemon) => {

        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon');

        const pokemonNameContainer = document.createElement('div');
        pokemonNameContainer.classList.add('pokemon-name');
        pokemonNameContainer.innerText = pokemon.name;

        const pokemonImageContainer = document.createElement('img');
        pokemonImageContainer.classList.add('pokemon-image');
        pokemonImageContainer.setAttribute('src', pokemon.imageUrl);
        
        const pokemonNameDisplay = document.querySelector('#pokemon-display');
        // nabindujeme udalost click
            // vybereme misto pro zobrazeni jmena pokemona
            // dosadime text do tohoto elementu
        pokemonImageContainer.addEventListener('click', () => {
            pokemonNameDisplay.innerText = pokemon.name;
        });

        const pokemonTypeContainer = document.createElement('div');
        pokemonTypeContainer.classList.add('pokemon-type');
        pokemonTypeContainer.innerText = pokemon.type;

        const pokemonHeightContainer = document.createElement('div');
        pokemonHeightContainer.classList.add('pokemon-height');
        pokemonHeightContainer.innerText = `height: ${pokemon.height}`;

        
        const pokemonIdContainer = document.createElement('div');
        pokemonIdContainer.classList.add('pokemon-id');
        pokemonIdContainer.innerText = `ID: ${pokemon.id}`;

        const pokemonRemoveButton = document.createElement('button');
        pokemonRemoveButton.innerText = `Dismiss ${pokemon.name}`;
        pokemonRemoveButton.addEventListener('click', () => {
            pokemonContainer.remove();
            const currentPokemonCount = pokemonCountContainer.innerText;
            const newPokemonCount = currentPokemonCount - 1;
            updatePokemonCount(newPokemonCount);
        });

        pokemonContainer.append(
            pokemonNameContainer,
            pokemonIdContainer,
            pokemonTypeContainer,
            pokemonHeightContainer,
            pokemonImageContainer,
            pokemonRemoveButton,
        );

        return pokemonContainer;

    };



    
};