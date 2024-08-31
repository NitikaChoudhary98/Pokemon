var database = {
  apiDetailsTable: [
    {
      url: "https://pokeapi.co/api/v2/pokemon/",
      name: "Get Pokemon",
    },
    {
      url: "url",
      name: "Get name",
    },
  ],
};
const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const pokemonName = document.getElementById("pokeName");
const searchBtn = document.getElementById("btn");
const pokeImage = document.querySelector(".pokeImage");
const aboutPokemon = document.querySelector(".abilities");
// const image = document.createElement("img");
const card = document.querySelector(".card-container");

pokeImage.addEventListener("click", (e) => {
  const data = getPokemonData(pokemonName.value.trim());
  data.then((res) => {
    if (pokeImage.src === res.sprites.front_default) {
      pokeImage.setAttribute("src", res.sprites.back_default);
    } else {
      pokeImage.setAttribute("src", res.sprites.front_default);
    }
  });
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //fetching the image from the api
  const data = getPokemonData(pokemonName.value.trim());
  data.then((res) => {
    console.log(res);
    const pokemonImage = res.sprites.front_default;
    card.style.display = "flex";
    pokeImage.setAttribute("src", pokemonImage);
    // pokeImage.appendChild(image);
    getPokemonAbiliti(res);
    console.log(res.sprites);
  });
});

async function getPokemonAbiliti(data) {
  const abilityData = await fetch(data.abilities[0].ability.url);
  const abilityResponse = await abilityData.json();
  aboutPokemon.innerHTML = abilityResponse.effect_entries[1].effect;
}

//fetch the api for specific pokemon
async function getPokemonData(pokeName) {
  const url = database.apiDetailsTable.filter((data) => {
    return data.name === "Get Pokemon";
  })[0].url;
  try {
    let response = await fetch(`${url}${pokeName}`, requestOptions);
    response = await response.json();
    return response;
  } catch (err) {
    console.log("Error", err);
  }
}
