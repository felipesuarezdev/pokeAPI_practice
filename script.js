
// Pruebas con la API

// const pokemones = fetch("https://pokeapi.co/api/v2/pokemon/")
// .then(response => response.json())
// .then(data => {
//     console.log(data.results)
// })
// .catch(error => console.error(error))

document.addEventListener('DOMContentLoaded', () => {
    const pokemonContainer = document.getElementById('pokemon-container');

    async function fetchPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            if (!response.ok) throw new Error('Error en la respuesta de la API');
            
            const data = await response.json();
            const pokemons = data.results;

            for (const pokemon of pokemons) {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                
                // Cada pokemon debe ir en un articulo!
                const cartaPokemon = document.createElement('article');
                cartaPokemon.className = 'pokemon-card';

                // Agreamos el spirte del pokemon de frente y el nombre, pero podríamos agregar muchas más información,
                // como sus tipos
                const imagenPokemon = document.createElement('img');
                imagenPokemon.src = pokemonData.sprites.front_default;
                imagenPokemon.alt = pokemon.name;

                const pokemonName = document.createElement('h3');
                // charAt toUpperCase + el pokemon name slice 1 es para poner en mayúsculas la primera letra del nombre
                pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                

                const pokemonTipos = document.createElement('h4');
                pokemonTipos.textContent = pokemonData.types.map(type => type.type.name);
                // console.log(pokemonData.types)
                

                cartaPokemon.appendChild(imagenPokemon);
                cartaPokemon.appendChild(pokemonName);
                cartaPokemon.appendChild(pokemonTipos);

                pokemonContainer.appendChild(cartaPokemon);
            }
            // Atrapamos el error
        } catch (error) {
            console.error('Error al cargar los Pokémon:', error);
            pokemonContainer.innerHTML = '<p>Error al cargar los Pokémon. Por favor, intenta nuevamente más tarde.</p>';
        }
    }

    fetchPokemons();
});
