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
        let svg = '<svg class="bd-placeholder-img card-img-top" width="100%" height="200" role="img" aria-label="Placeholder: Image"focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text text-anchor="middle" x="50%" y="50%" fill="#fff" dy=".3em">Image d\'une recette</text></svg>';
        const divContenu = document.createElement('div');
        const divHeader = document.createElement('div');
        const titre = document.createElement('div');
        const temps = document.createElement('div');
        const divDetail = document.createElement('div');
        const list = document.createElement('ul');
        const descriptions = document.createElement('div');

        //ajouter les attributs de chaque elements
        article.setAttribute("class", "col");
        divCard.setAttribute("class", "card shadow-sm");
        divCard.setAttribute("style", "height: 450px;");
        divContenu.setAttribute("class", "card-body");
        divContenu.setAttribute("style", "height: 250px;");
        divHeader.setAttribute("class", "d-flex justify-content-between align-items-center mb-3");
        titre.setAttribute("class", "fs-4");
        temps.setAttribute("class", "fs-4 fw-bold");
        divDetail.setAttribute("class", "row g-2 mb-2 h-75");
        list.setAttribute("class", "col overflow-hidden ps-3 pe-4 h-100");
        descriptions.setAttribute("class", "col overflow-hidden card-text h-100");

        //Ajout du contenu dans les elements
        titre.textContent = name;
        temps.innerHTML = '<i class="fa-regular fa-clock"></i> ' + time;

        for (let i = 0; i < ingredients.length; i++) {
            let ingredient = document.createElement('strong');
            let ingredientQuantite = document.createElement('li');

            ingredientQuantite.setAttribute("class", "list-group-item text-nowrap");

            ingredient.textContent = ingredients[i]['ingredient'] + " :";

            ingredientQuantite.appendChild(ingredient);

            if (ingredients[i]['unit'] != undefined) {
                ingredientQuantite.innerHTML = ingredient.outerHTML + " " + ingredients[i]['quantity'] + " " + ingredients[i]['unit'];
            } else if (ingredients[i]['quantity'] != undefined) {
                ingredientQuantite.innerHTML = ingredient.outerHTML + " " + ingredients[i]['quantity'];
            }

            list.appendChild(ingredientQuantite);
        }

        descriptions.textContent = description;


        //organisation (parents/enfants) des elements
        divContenu.appendChild(divHeader);
        divHeader.appendChild(titre);
        divHeader.appendChild(temps);
        divContenu.appendChild(divDetail);
        divDetail.appendChild(list);
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
async function displayData(recettes) {

    const recetteDiv = document.querySelector("#recette");

    for (let i = 0; i < recettes.length; i++) {
        const recetteModel = recetteFactory(recettes[i]);
        const userCardDOM = recetteModel.getRecetteCardDOM();
        recetteDiv.appendChild(userCardDOM);
    }

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

    let input = document.getElementById('barreRecherche').value;

    recettes = getRecherche(input, recipes);
    let ingredients = recherche_Ingredients_recette(document.getElementById('rechercheIngredients'), recipes);
    let ustensils = recherche_Ustensils_recette(document.getElementById('rechercheUstensils'), recipes);
    let appareilles = recherche_Appareilles_recette(document.getElementById('rechercheAppareilles'), recipes);

    let result = [];
    let a = 0;
    for (let i = 0; i < ingredients.length; i++) {
        if (isRecette(ingredients[i], recettes)) {
            result[a] = ingredients[i];
            a++;
        }
    }

    recettes = result;
    result = [];
    a = 0;
    for (let i = 0; i < appareilles.length; i++) {
        if (isRecette(appareilles[i], recettes)) {
            result[a] = appareilles[i];
            a++;
        }
    }

    recettes = result;
    result = [];
    a = 0;
    for (let i = 0; i < ustensils.length; i++) {
        if (isRecette(ustensils[i], recettes)) {
            result[a] = ustensils[i];
            a++;
        }
    }

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
}