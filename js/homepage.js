
/*
*   Fonction actionné au chargement de la page
*
 */
function onLoadHomePage() {

    // Contenu pour afficher les pokemons
    idPokemonContainer = document.getElementById('PokemonContainer');
    // Index du pokemon courrent
    currentPokemonId = 0;


    // Chargement du premier pokemon 
    nextPokemon();

    // Ajout des evénement onclick sur les bouton
    var btnPrev = document.getElementById('prevBtn');
    btnPrev.addEventListener('click', prevPokemon, false);

    var nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', nextPokemon, false);

    // Chargement du menu
    loadMenu();

    // Current menu item
    // border-bottom rouge sur menu
    var menuLinks = document.getElementById('menu').querySelectorAll('a');
    menuLinks.forEach(function(link){
        if(link.innerText.indexOf('Index') >= 0) {
            link.className = 'current';
        }
    });
}

/*
 *   Passe au pokémon suivant
 *   passe currentPokemonId au suivant
 */
function nextPokemon() {
    currentPokemonId++;
    if (currentPokemonId > pokemons.length - 1) {
        currentPokemonId = 0;
    }

    idPokemonContainer.removeChild(idPokemonContainer.firstChild);
    idPokemonContainer.appendChild(pokemons[currentPokemonId].toHtml());
}

/*
 *  Charge le pokémon prec
 */
function prevPokemon() {
    currentPokemonId--;
    if (currentPokemonId < 0) {
        currentPokemonId = pokemons.length - 1;
    }
    idPokemonContainer.removeChild(idPokemonContainer.firstChild);
    idPokemonContainer.appendChild(pokemons[currentPokemonId].toHtml());
}
