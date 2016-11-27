/**
 * Created by bouguerr on 10/11/2016.
 */

// id des pokémons à afficher
var pokemonsToDisplay = [];

// vérifie si un opérateur existe dans la recherche
// Si non nous ferons une recherche par mot clé
// Si oui une recherche par opérateur
var isOperatorInSearch = false;


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

    var inputSearch = document.getElementById('recherche').getElementsByTagName('input')[0].value;


    // Supprime les espaces et met en minuscule le chaine de recherche
    search = inputSearch.replace(/ /g,'');
    search = inputSearch.toLocaleLowerCase();


    // Efface les anciens messages
    notice('');

    // Opérateur dans la requête
    var operator = "";
    if(search.indexOf('&&') > 0) {
        operator = "&&";
    } else if(search.indexOf('||') > 0) {
        operator = "||";
    }else if(search.indexOf('not') > 0) {
        operator = "not";
    }

    // Recherche complexe
    if( operator != "") {
        var arrSearchs = search.split(operator);

        arrSearchs.forEach(function (search){
            doSearch(search);
        });

    }else {
        // Recherche simple
        doSearch(search);
    }

    if(search.length > 0) {
        displayPokemons(pokemonsToDisplay, operator);
    }

    // Remise à zero
    pokemonsToDisplay = [];
    isOperatorInSearch = false;
}

// Cherche les noeuds valide pour une recherche et les ajoutes à PokemonsToDisplay
function doSearch(search) {


    // Si opérateur =, alors nous effectuons une recherche par paramètre
    // param = value
    if(search.indexOf("=")>= 0 && search.indexOf(">=") < 0 && search.indexOf("<=") < 0) {
        var arrStr = search.split("=");
        if (arrStr[1]) {
            searchByParam(arrStr[0], arrStr[1]);
        }
    }


    // Opérateurs disponibles
    var operators = [">=", "<=", ">", "<"];


    for (var i = 0; i < operators.length; i++) {
        item = operators[i];

        // Recherche par opérateur
        if (search.indexOf(item) >= 0) {
            // Si il y a un opérateur alors nous ne ferons pas de recherche par mot clé
            isOperatorInSearch = true;
            // recherche par opérateur
            var arrStr = search.split(item);
            if(arrStr[1]) {
                // Paramètre, value, opérateur
                searchByOperator(arrStr[0], arrStr[1], item);
                break;
            }
        }

    }

    if(! isOperatorInSearch) {
        // Recherche par mot clé
        searchByKeyWord(search);
    }
}

/* Recherche par mot clé
 La recherche est effectué sur les pokémon details
 Pokemon-details = div pokémon détailé

 Les pokémons correspondant à la recherche sont ajoutés à pokemonToDisplay
*/
function searchByKeyWord(key) {

    key = key.replace(/ /g,'');
    var searchPkmDisplay = [];

    if(key.length > 0) {

        var pokemons = document.getElementsByClassName('pokemon-details');

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            var pkmId = pokemon.dataset.num;

            if(pokemon.innerHTML.indexOf(key)>= 0) {
                if(searchPkmDisplay.indexOf(pkmId) < 0) {
                    searchPkmDisplay.push(pokemon.dataset.num);
                }
            } else {
                if(searchPkmDisplay.indexOf(pkmId) >= 0) {
                    searchPkmDisplay.splice(searchPkmDisplay.indexOf(pkmId), 1);
                }
            }
        }

        pokemonsToDisplay.push(searchPkmDisplay);
    } else  {
        displayAllPkm();
    }
}

/*
 Recherche par paramètre / valeur
 La recherche est effectué sur les dataset
 Ex : data-poid=90

 Les pokémons correspondant sont ajoutés à pokemonToDisplay
*/
function searchByParam(param, value) {
    var SearchPkmDisplay = [];
    isOperatorInSearch = true;


    param = param.replace(/ /g,'');
    value = value.replace(/ /g,'');

    // Nous recherchons sur les pokemons details ou les datasets sont stockés
    var pokemons = document.getElementsByClassName('pokemon-details');

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];
        var pkmId = pokemon.dataset.num;

        // Si la valeur existe dans l'attribut data-'param'
        // alors nous ajoutons l'id du pokemon à pokemonToDisplay
        // Sinon si elle existe dans SearchPkmDisplay nous la supprimons

        var attr = pokemon.getAttribute("data-" + param).toLowerCase();

        if(attr.indexOf(value)>= 0) {
            if(SearchPkmDisplay.indexOf(pkmId) < 0) {
                SearchPkmDisplay.push(pkmId);
            }
        } else {
            if(SearchPkmDisplay.indexOf(pkmId) >= 0) {
                SearchPkmDisplay.splice(SearchPkmDisplay.indexOf(pkmId), 1);
            }
        }
    }

    pokemonsToDisplay.push(SearchPkmDisplay);
}

/*
*   Recherche par opérateur
*   Construction d'une chaine à evaluer pour chaque pokémon
*
*   ex : eval(poid>30)
*
*   Les pokémons correspondant sont ajoutés à la variable globale pokemonToDisplay
 */
function searchByOperator(param, value, operator) {


    param = param.replace(/ /g,'');

    var SearchPkmDisplay = [];
    var m;

    var pokemons = document.getElementsByClassName('pokemon-details');
    var paramAllowed = ['poid', 'taille'];

    if(paramAllowed.indexOf(param) > -1) {

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];
            var pkmAttr = pokemon.getAttribute("data-" + param);
            var pkmId = pokemon.dataset.num;

            if(eval(pkmAttr + operator + value)) {
                if(SearchPkmDisplay.indexOf(pkmId) < 0) {
                    SearchPkmDisplay.push(pkmId);
                }
            }else {
                if(SearchPkmDisplay.indexOf(pkmId) > -1) {
                    SearchPkmDisplay.splice(SearchPkmDisplay.indexOf(pkmId), 1);
                }
            }
        }

    } else {
        var message = "Impossible de faire une recherche avec l'opérateur " + operator + " sur le paramètre " + param;
        notice(message);
    }
    pokemonsToDisplay.push(SearchPkmDisplay);

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

// Cache les détails de pokémons, affiche tous les pokémon-grid
function hideAllPkm(){
    var pokemons = document.getElementsByClassName('grid-pokemon');

    for (var i = 0; i < pokemons.length; i++) {
        // Affiche le pokemon sur la grille
        pokemons[i].style.display ="none";

        // cache le pokémon détailé
        var pokemonDetails = getPokemonDetailsByDataNum(pokemons[i].dataset.num);
        pokemonDetails.style.display = "none";

    }
}

// Calcul quelles pokémons doivent être affiche (diff des différentes requêtes);
function displayPokemons(arrs, operateur) {
    var toDisplay = [];

    // Calcul des pokémons à afficher si opérateur &&

    if(arrs.length == 1 ) {
        toDisplay = arrs[0];
    } else {

        if(operateur == '&&') {
            if(arrs[0].length > 0 && arrs.length > 0) {
                arrs[0].forEach(function (item){
                    if(arrs[1].indexOf(item) > -1) {
                        toDisplay.push(item);
                    }
                });
            }
        } else if(operateur == "||") {
            toDisplay = arrs[0].concat(arrs[1]);
        } else if( operateur == "not") {


            if(arrs[0].length > 0 && arrs.length > 0) {

                toDisplay = arrs[0];

                arrs[0].forEach(function (el) {

                   if(arrs[1].indexOf(el) > -1) {
                       toDisplay.splice(toDisplay.indexOf(el), 1);
                   }
                });
            }
        }

    }



    // affichage des pokémons
    hideAllPkm();

    if(toDisplay.length > 0) {

        toDisplay.forEach(function (pkmId) {
            pkmDetails = getPokemonDetailsByDataNum(pkmId);
            pkmGrid = getPokemonGridByDataNum(pkmId);

            pkmDetails.style.display = "block";
            pkmGrid.style.display = "inline-block";
        });
    } else {
        notice('Aucun pokémon ne correspond à votre recherche');
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

// Affiche les instruction pour la recherche
function displayHelp(){
    divHelp = document.getElementById('help');
    var divUl = divHelp.getElementsByTagName('ul');

    if(divUl[0].style.display == 'none') {

        divUl[0].style.display = "block";
    } else {
        divUl[0].style.display = "none";
    }
}