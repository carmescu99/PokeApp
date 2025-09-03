

// Selectores
const searchBox     = document.querySelector("#searchBox");
const buttonSearch  = document.querySelector("#searchButton");

// Pokemons
const pokemonsContainer = document.querySelector(".pokemon-section");


document.addEventListener("DOMContentLoaded", () => {

    const matchColor = (tipo) => {
       
        switch (tipo) {
            case "fire":
                return "rgba(247, 176, 176, 1)";
            case "flying":
                return "#ffceceff";

            case "grass":
                return "#b1fdb8ff";

            case "water":
                return "#a3ffffff";

            case "bug":
                return "#c2d6a4ff";

            case "normal":
                return "#f5f5f5ff";

            case "poison":
                return "#d2a6d2ff";
            
            case "electric":
                return "#f2e94cff";

            case "fairy":
                return "#f2a6f2ff";

            case "rock":
                return "#d2c6a4ff";

            case "ice":
                return "#a8e1f4ff";

            case "psychic":
                return "#f2a6e1ff";

            case "ghost":
                return "#d2a6e1ff";

            case "dragon":
                return "#f2a6e1ff";

            default:
                break;
        }
        
    }


    const pintarPokemons = (pokemonsConDetalle) => {

        console.log(pokemonsConDetalle)
        pokemonsContainer.innerHTML= pokemonsConDetalle.map((pokemon) => 
            `
            <div class="pokemon-card">
                <header id="pokemonHeader">
                    <h5>${pokemon.name}</h5>
                    <p>${pokemon.id}</p>
                </header>

                <a
                    href="pokemondetail.html?id=${pokemon.id}"
                >
                    <img 
                        src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg" 
                        alt="${pokemon.name}" 
                        id="pokemonImage"
                    />
                </a>

                <div class="pokemon-info-container">
                    <ul class="pokemon-info">
                        ${pokemon.stats.map((value) => `
                            <li>
                                <p>${value.stat.name}</p> - <span>${value.base_stat}</span>
                            </li>
                        `).join("")}
                    </ul>

                    <ul class="pokemon-types">
                        ${pokemon.types.map((value) => `
                            <li style="background-color: ${matchColor(value.type.name)}">${value.type.name}</li>
                        `).join("")}
                    </ul>
                </div>

            </div> 
        `).join("");
    }


    const fetchPokemons = async() => {
        try {

            const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
            const datos     = await respuesta.json();

            let pokemonsConDetalle = [];

            for (let i = 0; i < datos.results.length; i++){
                const detallePoke = await fetch(datos.results[i].url);
                const pokeInfo    = await detallePoke.json();

                pokemonsConDetalle.push(pokeInfo);
            }

            pintarPokemons(pokemonsConDetalle);

        } catch (error) {
            console.error(error)
        }
    }

    fetchPokemons();

})