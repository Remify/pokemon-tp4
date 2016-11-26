/*
*   Class Pokemon.
*   Attention : Syntaxe risque de ne pas fonctionner sur tous les navigateurs
 */
class Pokemon {

    constructor(nom, num, type, description, imageUrl) {
        this.nom = nom;
        this.num = num;
        this.type = type;
        this.description = description;
        this.imageurl = imageUrl;
        this.properties;
    }

    populateFromJson(json) {
        this.nom = json.nom;
        this.num = json.num;
        this.type = json.type;
        this.description = json.description;
        this.imageurl = json.image_url;
        this.properties = json.properties;
    }

    toHtml() {
        // Container pour le Pokemon
        var divPokemon = document.createElement('div');
        divPokemon.className = 'pokemon-details';

        // Intégration des datasets
        divPokemon.dataset.num = this.num;
        divPokemon.dataset.pokemon = this.nom.toLowerCase();
        divPokemon.dataset.type = this.type.toLowerCase();

        // Chaque propriété du pokemon et ajouté aux datasets
        var obj = this.properties;
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var valeur = obj[key];
                divPokemon.setAttribute("data-" + key, valeur);
            }
        }

        // En tête Titre + Type + Num
        var divEnTete = document.createElement('div');
        // Titre
        var titre = document.createElement('h2');
        titre.innerHTML = this.nom;
        divEnTete.appendChild(titre);

        // Num
        var numDiv = document.createElement('div');
        numDiv.className = 'numPokemon';
        numDiv.innerText = this.num;
        divEnTete.appendChild(numDiv);

        // Type
        var typeDiv = document.createElement('div');
        typeDiv.className = 'typePokemon';
        typeDiv.innerText = this.type;
        divEnTete.appendChild(typeDiv);

        // Ajout de l'entête à divPokemon'

        // Image 
        var imgDiv = document.createElement('div');
        imgDiv.className = 'imgPokemon';

        var image = document.createElement('img');
        image.src = this.imageurl;
        imgDiv.appendChild(image);

        // Description 
        var divDescription = document.createElement('div');
        divDescription.className = 'txtPokemon';
        divDescription.innerText = this.description;



        // Affiche pour chaque propriétés le nom de la propriété et sa valeur
        var divProperties = document.createElement('div');
        var obj = this.properties;
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var valeur = obj[key];

                //
                var divProperty = document.createElement('div');
                divProperty.className = "pokemonProperty";
                divProperty.innerHTML = "<b>" + key + " : </b>" + valeur;
                divProperties.appendChild(divProperty);
            }
        }


        // Construction du div
        divPokemon.appendChild(divEnTete);
        divPokemon.appendChild(imgDiv);
        divPokemon.appendChild(divDescription);
        divPokemon.appendChild(divProperties);

        return divPokemon;
    }

    toHtmlGrid() {
        var divPokemon = document.createElement('div');
        divPokemon.className = "grid-pokemon";
        divPokemon.dataset.num = this.num;



                var titre = document.createElement('div');
        titre.className = "nom";
        titre.innerHTML = this.nom;
        divPokemon.dataset.nom = this.nom;



        var img = document.createElement('img');
        img.className = "img-pokemon";
        img.src = this.imageurl;

        divPokemon.appendChild(titre);
        divPokemon.appendChild(img);

        return divPokemon;
    }


}