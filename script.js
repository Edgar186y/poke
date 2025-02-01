async function fetchPokemon(pokemonNameOrId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        displayError();
    }
}

function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById("pokemon-container");
    if (!pokemon) {
        pokemonContainer.innerHTML = `<p class="error">Pokémon not found!</p>`;
        return;
    }

    // Map through the stats and create a list
    const statsList = pokemon.stats.map(stat => `
        <li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>
    `).join("");

    pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Height: ${pokemon.height / 10}m</p>
            <p>Weight: ${pokemon.weight / 10}kg</p>
            <p>Types: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
            <h3>Stats:</h3>
            <ul>${statsList}</ul>
        </div>
    `;
}

function displayError() {
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML = `<p class="error">Pokémon not found!</p>`;
}

function searchPokemon() {
    const searchInput = document.getElementById("pokemon-search").value;
    fetchPokemon(searchInput.toLowerCase());
}

// Example: Fetch Pikachu's data on page load
fetchPokemon("pikachu");