

// /pokemondetail.html?id=1 ??? como extraemos ese valor de la url con js ???

document.addEventListener("DOMContentLoaded", () => {
    
    const pokemonId = new URLSearchParams(window.location.search).get("id")

    const MainTitle = document.querySelector("#MainTitle");

    const fetchPokemonDetail = async() => {
        try {

            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const datos     = await respuesta.json();

            MainTitle.innerHTML = `Detalles de ${datos.name}`;

            console.log(datos)

        } catch (error) {
            console.error(error)
        }
    }

    fetchPokemonDetail();

})

