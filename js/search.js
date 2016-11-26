/**
 * Created by bouguerr on 10/11/2016.
 */


// Charge les pokémons à partir des donnés json
function onLoadSearch() {
    loadMenu();

    // Current menu item
    // border-bottom rouge sur menu
    var menuLinks = document.getElementById('menu').querySelectorAll('a');
    menuLinks.forEach(function(link){
        if(link.innerText.indexOf('Recherche') >= 0) {
            link.className = 'current';
        }
    });

    divContainer = document.getElementById('PokemonContainer');

    pokemons.forEach(function (pokemon) {
        divContainer.appendChild(pokemon.toHtmlGrid());
    });


    pokemons.forEach(function (pokemon) {
        var divPkm = pokemon.toHtml();
        divPkm.style.display = "none"
        divContainer.appendChild(divPkm);
    });
}

// Entré sur onChange de la bar de recherche
function search() {
    var search;
    var toDisplay = [];

    var inputSearch = document.getElementById('recherche').getElementsByTagName('input')[0].value;

    // vérifie si un opérateur existe dans la recherche
    // Si non nous ferons une recherche par mot clé
    // Si oui une recherche par opérateur
    var isOperatorInSearch = false;
    // Supprime les espaces et met en minuscule le chaine de recherche
    search = inputSearch.replace(/ /g,'');
    search = inputSearch.toLocaleLowerCase();

    // Opérateurs disponibles
    var operators = [">",">=","<","<=","="]

    // Efface les anciens messages
    notice('');


    // Pour chaque opérateur, nous regardons si il existe dans notre recherche
    operators.forEach(function (item) {
        //
        if(search.indexOf("=")>= 0 && search.indexOf(item) < 0) {
            var arrStr = search.split("=");
            if(arrStr[1]) {
                searchByParam(arrStr[0], arrStr[1]);
            }
        }else {
            // Si il n'y a pas d'opétateur dans la recherche, alors recher par mot clé
            // Sinon recherche par opérateur
            if (search.indexOf(item) >= 0) {

                // Si il y a un opérateur alors nous ne ferons pas de recherche par mot clé
                isOperatorInSearch = true;
                // recherche par opérateur
                var arrStr = search.split(item);
                if(arrStr[1]) {
                    // Paramètre, value, opérateur
                    searchByOperator(arrStr[0], arrStr[1], item);
                } else {
                    displayAllPkm();
                }
            }
        }
    });

    if(! isOperatorInSearch) {

        // Recherche par mot clé
        searchByKeyWord(search);
    }

}

// Recherche par mot clé
// La recherche est effectué sur les pokémon details
// Pokemon-details = div pokémon détailé
// Pokemon-grid = div Pokemon avec seulement l'image et le nom
function searchByKeyWord(key) {
    if(key.length > 0) {
        var pokemons = document.getElementsByClassName('pokemon-details');

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];

            var pkmGrid = getPokemonGridByDataNum(pokemon.dataset.num);

            if(pokemon.innerHTML.indexOf(key)>= 0) {
                // Affiche le pokémon details et le pokemon grid
                displayPkmDetails(pokemon.dataset.num);
                pkmGrid.style.display = "inline-block";
            }else {
                hidePkmDetails(pokemon.dataset.num);
                pkmGrid.style.display = "none";
            }
        }
    } else {
        notice('');
        displayAllPkm();
    }

}

// Recherche par paramètre / valeur
// La recherche est effectué sur les dataset
// Ex : data-poid=90
function searchByParam(param, value) {

    // Nous recherchons sur les pokemons grid ou les datasets sont stockés
    var pokemons = document.getElementsByClassName('pokemon-details');

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];

        var pkmGrid = getPokemonGridByDataNum(pokemon.dataset.num);
        if(pokemon.getAttribute("data-" + param).indexOf(value)>= 0) {
            displayPkmDetails(pokemon.dataset.num);
            pkmGrid.style.display = "inline-block";
        }else {
            hidePkmDetails(pokemon.dataset.num);
            pkmGrid.style.display = "none";
        }
    }


}

function searchByOperator(param, value, operator) {

    var m;

    var pokemons = document.getElementsByClassName('pokemon-details');
    var paramAllowed = ['poid', 'taille'];


    if(paramAllowed.indexOf(param) > -1) {

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];

            var pkmAttr = pokemon.getAttribute("data-" + param);

            if(eval(pkmAttr + operator + value)) {
                // Affiche le pokémon
                var pkmGrid = getPokemonGridByDataNum(pokemon.dataset.num);
                displayPkmDetails(pokemon.dataset.num);
                pkmGrid.style.display = "inline-block";
            }else {
                var pkmGrid = getPokemonGridByDataNum(pokemon.dataset.num);
                hidePkmDetails(pokemon.dataset.num);
                pkmGrid.style.display = "none";
            }
        }

    }

}

// Affiche les détails des pokémons dans le tableau
function displayPkmDetails(num) {
    // Cherche le pokémon sur l'attribut data-num
    var pkmDetails = getPokemonDetailsByDataNum(num);
    pkmDetails.style.display = "block";
}

// Affiche les détails des pokémons dans le tableau
function hidePkmDetails(num) {
    // Cherche le pokémon sur l'attribut data-num à cacher
    var pkmDetails = getPokemonDetailsByDataNum(num);
    pkmDetails.style.display = "none";
}

// Affiche un message d'avertissement
function notice(message) {

    var divNotice = document.getElementById('notice');
    divNotice.innerHTML = message;
}


// Affiche tous les pokémons grille et cache les pokémons détails
// Utilisé pour remettre à zero
function displayAllPkm(){
    var pokemons = document.getElementsByClassName('grid-pokemon');

    for (var i = 0; i < pokemons.length; i++) {
        // Affiche le pokemon sur la grille
        pokemons[i].style.display ="inline-block";

        // cache le pokémon détailé
        var pokemonDetails = getPokemonDetailsByDataNum(pokemons[i].dataset.num);
        pokemonDetails.style.display = "none";

    }
}

// get un pokémon detailés
function getPokemonDetailsByDataNum(num){
    pDetails = document.querySelectorAll('[data-num="'+ num +'"]');
    return pDetails[1];
}

// get un pokémon grid
function getPokemonGridByDataNum(num){
    pDetails = document.querySelector('[data-num="'+ num +'"]');
    return pDetails;
}