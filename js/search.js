/**
 * Created by bouguerr on 10/11/2016.
 */



function onLoadSearch() {
    loadMenu();

    divContainer = document.getElementById('PokemonContainer');

    pokemons.forEach(function (pokemon) {

        divContainer.appendChild(pokemon.toHtmlGrid());
    });
}

function search() {
    var search;
    var inputSearch = document.getElementById('recherche').getElementsByTagName('input')[0].value;

    // Supprime les espaces et met en minuscule
    search = inputSearch.replace(/ /g,'');
    search = inputSearch.toLocaleLowerCase();

    var operators = [">",">=","<","<=", "="]

    // Efface les anciens messages
    notice('');


    operators.forEach(function (item) {

        if(search.indexOf("=")>= 0 && search.indexOf(item) < 0) {
            var arrStr = search.split("=");
            if(arrStr[1]) {
                searchByParam(arrStr[0], arrStr[1]);
            }
        }else {
            if (search.indexOf(item) >= 0) {
                var arrStr = search.split(item);
                if(arrStr[1]) {
                    console.log("value : " +arrStr[1]);
                    searchByOperator(arrStr[0], arrStr[1], item);
                }
            }
        }
    });


}

function searchByParam(param, value) {
    var pokemons = document.getElementsByClassName('grid-pokemon');

    var nodes = [];

    for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];

        //var node = pokemon.dataset.param.innerText;
        if(pokemon.getAttribute("data-" + param).indexOf(value)>= 0) {

            pokemon.style.display = "block";
            nodes.push(pokemon);
        }else {
            pokemon.style.display = "none";
        }
    }


}

function searchByOperator(param, value, operator) {
    // message
    var m;
    var pokemons = document.getElementsByClassName('grid-pokemon');
    var paramAllowed = ['poid'];


    var nodes = [];

    if(paramAllowed.indexOf(param) > -1) {
        console.log('operator :' + operator);

        for (var i = 0; i < pokemons.length; i++) {
            var pokemon = pokemons[i];

            var pkmAttr = pokemon.getAttribute("data-" + param);
            if(eval(pkmAttr + operator + value)) {

                pokemon.style.display = "block";
                nodes.push(pokemon);
            }else {
                pokemon.style.display = "none";
            }
        }

    } else {
        m = "Aucune recherche possible sur <i>" + param + "</i>";
        notice(m);
    }
    var nodes = [];

}

function notice(message) {

    var divNotice = document.getElementById('notice');

    divNotice.innerHTML = message;
}
