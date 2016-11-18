/*
*   Charge les pokémons à partir du json dataPokemons
*   pokemons est un tableau d'object Pokemon
 */
pokemons = [];

dataPokemons.pokemons.forEach(function(jsonPokemon){
    var poke = new Pokemon();
    poke.populateFromJson(jsonPokemon);
    pokemons.push(poke);
});


/*
 *  Charge le menu
 */
function loadMenu() {
    var menu = document.getElementById('menu');


    var ul = document.createElement('ul');

    // Création du lien index

    ul.appendChild(createLinkMenu("Index", "index.html"));
    menu.appendChild(ul);

    // Création du lien recherche
    ul.appendChild(createLinkMenu("Recherche", "search.html"));
    menu.appendChild(ul);

    // Création du lien pokémon
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = "Pokemons";
    a.href = "#";
    a.className = "no-pointer";
    li.appendChild(a);
    ul.appendChild(li);
    menu.appendChild(ul);

    var ulPokemon = document.createElement('ul');
    pokemons.forEach(function(p) {
        var liPokemon = document.createElement('li');
        var a = document.createElement('a');
        a.target = "_blank";
        a.href = "pokemon.html?idPokemon=" + p.num;
        a.innerText = p.nom;


        if(p.num == getQueryParams(document.location.search).idPokemon) {
            a.className = "current";
        } else {

        }

        liPokemon.appendChild(a);
        ulPokemon.appendChild(liPokemon);
    }, this);

    li.appendChild(ulPokemon);
    ul.appendChild(li);
    menu.appendChild(ul);

}

function createLinkMenu(nom, lien) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = nom;
    a.href = lien;
    li.appendChild(a);

    return li
}


/*
*   Retourne un object avec les paramètres présent dans l'url
*/
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

/*
 *  Chargement de la page pokemon.html
 *  Affiche un pokemon selon le parametre d'url idPokemon=id
 *  idPokemon = pokemon.num
 */
function onLoadPokemon(){
    loadMenu();

    // récupère les paramètres d'url
    var query = getQueryParams(document.location.search);

    var pokemonToDisplay;

    //
    if(query.idPokemon) {
        jsonPokemons = dataPokemons.pokemons;

        jsonPokemons.forEach(function(pokemon){

            if(pokemon.num == query.idPokemon) {
                pokemonToDisplay = new Pokemon();
                pokemonToDisplay.populateFromJson(pokemon);
            }
        });
    }

    if(pokemonToDisplay) {
        document.getElementById('PokemonContainer').appendChild(pokemonToDisplay.toHtml());
    } else {
        document.getElementById('PokemonContainer').innerText = "Ce pokémon n'existe pas."
    }
}




