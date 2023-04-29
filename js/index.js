function myFunction(x) {
    if (x.matches) { // If media query matches
      document.getElementById('filtres').setAttribute('class', 'row row-cols-1');
    } else {
        document.getElementById('filtres').setAttribute('class', 'row row-cols-3');
    }
  }
  
  let x = window.matchMedia("(max-width: 768px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes

/**
 * 
 * @param { Recette } data 
 * @returns une recette en element fonction DOM
 */
function recetteFactory(data) {
    //déstructuration du json
    const { name, ingredients, time, description, ustensils } = data;

    /**
     * créer la card d'une recette
     * @returns { Element }
     */
    function getRecetteCardDOM() {

        //creation des elements
        const article = document.createElement('article');
        const divCard = document.createElement('div');
        let svg = '<div class="svg-container"><svg viewBox="0 0 380 178" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="svg-path" d="M0 5C0 2.23858 2.23858 0 5 0H375C377.761 0 380 2.23858 380 5V178H0V5Z" fill="#C7BEBE"/></svg></div>';
        const divContenu = document.createElement('div');
        const divHeader = document.createElement('div');
        const titre = document.createElement('div');
        const temps = document.createElement('div');
        const divDetail = document.createElement('div');
        const list = document.createElement('ul');
        const descriptions = document.createElement('div');
        const texteDescriptions = document.createElement('div');

        //ajouter les attributs de chaque elements
        article.setAttribute("class", "col");
        divCard.setAttribute("class", "card shadow-sm");
        divContenu.setAttribute("class", "card-body");
        divHeader.setAttribute("class", "d-flex justify-content-between align-items-center mb-3");
        titre.setAttribute("class", "fs-4 card-titre");
        temps.setAttribute("class", "fs-4 fw-bold card-time");
        divDetail.setAttribute("class", "row g-2 mb-2 h-75");
        list.setAttribute("class", "col overflow-hidden card-liste");
        descriptions.setAttribute("class", "col card-text h-100 card-description");
        texteDescriptions.setAttribute("class", "text");

        //Ajout du contenu dans les elements
        titre.textContent = name;
        temps.innerHTML = '<i class="fa-regular fa-clock"></i> ' + time;

        ingredients.forEach(function (data) {
            let ingredient = document.createElement('strong');
            let ingredientQuantite = document.createElement('li');

            ingredientQuantite.setAttribute("class", "list-group-item text");

            ingredient.textContent = data['ingredient'] + " :";

            ingredientQuantite.appendChild(ingredient);

            if (data['unit'] != undefined) {
                ingredientQuantite.innerHTML = ingredient.outerHTML + " " + data['quantity'] + " " + data['unit'];
            } else if (data['quantity'] != undefined) {
                ingredientQuantite.innerHTML = ingredient.outerHTML + " " + data['quantity'];
            }

            list.appendChild(ingredientQuantite);
        });

        texteDescriptions.textContent = description;


        //organisation (parents/enfants) des elements
        divContenu.appendChild(divHeader);
        divHeader.appendChild(titre);
        divHeader.appendChild(temps);
        divContenu.appendChild(divDetail);
        divDetail.appendChild(list);
        descriptions.appendChild(texteDescriptions);
        divDetail.appendChild(descriptions);
        divCard.innerHTML = svg;
        divCard.appendChild(divContenu);
        article.appendChild(divCard);

        return (article);
    }
    return { name, ingredients, time, description, ustensils, getRecetteCardDOM }
}


/**
 * Affiche les recettes
 * @param { array } recettes
 */
async function displayData(recette) {

    const recetteDiv = document.querySelector("#recette");

    recette.forEach((recette) => {
        const recetteModel = recetteFactory(recette);
        const userCardDOM = recetteModel.getRecetteCardDOM();
        recetteDiv.appendChild(userCardDOM);
    });

};


/**
 * initialise la page
 */
async function init() {
    await displayData(recipes);
};

init();
/**
 * @var { Array } array de recettes
 */
let recettes = recipes;

/**
 * regroupe tous les filtres et les affiche
 */
function recherche_recette() {

    const start1 = performance.now();
    let input = document.getElementById('barreRecherche').value;

    recettes = getRecherche(input, recipes);
    let ingredients = recherche_Ingredients_recette(recipes);
    let ustensils = recherche_Ustensils_recette(recipes);
    let appareilles = recherche_Appareilles_recette(recipes);

    let result = [];
    let a = 0;
    ingredients.forEach((ingredient) => {
        if (isRecette(ingredient, recettes)) {
            result[a] = ingredient;
            a++;
        }
    });

    recettes = result;
    result = [];
    a = 0;
    appareilles.forEach((appareille) => {
        if (isRecette(appareille, recettes)) {
            result[a] = appareille;
            a++;
        }
    });

    recettes = result;
    result = [];
    a = 0;
    ustensils.forEach((ustensil) => {
        if (isRecette(ustensil, recettes)) {
            result[a] = ustensil;
            a++;
        }
    });

    recettes = result;

    if (input.length < 3 && document.getElementById('tags').children.length <= 0) {

        document.querySelector('#recette').innerHTML = "";
        recettes = recipes;
        init();
    } else if (input.length < 3 && document.getElementById('tags').children.length > 0) {
        document.getElementById('rechercheIngredients').value = '';
        document.getElementById('rechercheUstensils').value = '';
        document.getElementById('rechercheAppareilles').value = '';
        getRechercheRecette(recettes);
    } else if (input.length >= 3) {
        getRechercheRecette(recettes);
    }

    const end1 = performance.now();
    const time1 = end1 - start1;
    //confirm(start1 +'||'+ end1);
    console.log('Code 1 time:', time1);
}