/**
 * True si la recette existe dans l'array des recettes
 * @param { Object } recette 
 * @param { Array } arrayRecettes 
 * @returns { Boolean }
 */
function isRecette(recette, arrayRecettes) {
    for (let u = 0; u < arrayRecettes.length; u++) {
        if (arrayRecettes[u]['id'] == recette['id']) {
            return true;
        }
    }
    return false;
}

/**
 * True si l'ingredient est dans la recette
 * @param { Object } recette 
 * @param { Object } ingredient 
 * @returns { boolean }
 */
function isRecetteIngredient(recette, ingredient) {
    for (let i = 0; i < recette['ingredients'].length; i++) {
        if (recette['ingredients'][i]['ingredient'] == ingredient['ingredient']) {
            return true;
        }
    }
    return false;
}

/**
 * True si l'ustensil est dans l'array des ustensils
 * @param { Array } ArrayUstensils 
 * @param { String } ustensil 
 * @returns { boolean }
 */
function isUstensil(ArrayUstensils, ustensil) {
    for (let a = 0; a < ArrayUstensils.length; a++) {
        if (ArrayUstensils[a].toLowerCase().includes(ustensil)) {
            return true;
        }
    }
    return false;
}

/**
 * recupere les recettes filtre par l'input ustensil
 * @param { Element } input element de l'input ustensil
 * @param { Array } recipes Array de recette
 * @returns { Array } un array des recettes
 */
function recherche_Ustensils_recette(input, recipes) {

    input = input.value.toLowerCase();
    let result = [];

    let arrayTags = [];
    let tags = document.querySelectorAll('#tags [name="itemU"]');

    for(let i =0; i < tags.length; i++){
        arrayTags[i] = tags[i].textContent.toLowerCase();
    }

    if (arrayTags.length > 0) {

        let array_ustensils = [];
        let ustensil_id = 0;
        for(let recipe=0; recipe <recipes.length; recipe++){
            let test_ok =[];
            for(let ustensil=0; ustensil<recipes[recipe]['ustensils'].length; ustensil++){
                if(arrayTags.includes(recipes[recipe]['ustensils'][ustensil].toLowerCase())){
                    test_ok.push(true);
                }
            }
            if(test_ok.length === arrayTags.length){
                array_ustensils[ustensil_id] = recipes[recipe];
                ustensil_id++;
            }
        }
        if(array_ustensils.length > 0){
            result.push(...array_ustensils);
        }

        return result;
    } else {
        return recipes;
    }
}

/**
 * recupere les recettes filtre par appareilles
 * @param { Element } input element de l'input appareilles
 * @param { Array } recipes Array de recette
 * @returns { Array } un array des recettes
 */
function recherche_Appareilles_recette(input, recipes) {

    input = input.value.toLowerCase();
    let result = [];

    let arrayTags = [];
    let tags = document.querySelectorAll('#tags [name="itemA"]');

    for(let i =0; i < tags.length; i++){
        arrayTags[i] = tags[i].textContent.toLowerCase();
    }

    if (arrayTags.length === 1) {

        let array_appliances = [];
        let appliance_id = 0;
        for(let recipe=0; recipe <recipes.length; recipe++){
            if(arrayTags[0].toLowerCase().includes(recipes[recipe]['appliance'].toLowerCase())){
                array_appliances[appliance_id] = recipes[recipe];
                appliance_id++;
            }
        }
        if(array_appliances.length > 0){
            result.push(...array_appliances);
        }

        return result;
    } else {
        return recipes;
    }
}

/**
 * recupere les recettes filtre par ingredients
 * @param { Element } input element de l'input ingredients
 * @param { Array } recipes Array de recette
 * @returns { Array } un array des recettes
 */
function recherche_Ingredients_recette(input,recipes) {

    input = input.value.toLowerCase();
    let tags = document.querySelectorAll('#tags [name="itemI"]');
    let arrayTags = [];
    let result = [];

    for(let i =0; i < tags.length; i++){
        arrayTags[i] = tags[i].textContent.toLowerCase();
    }

    if (arrayTags.length > 0) {
        let array_ingredients = [];
        let ingredient_id = 0;
        for(let recipe=0; recipe <recipes.length; recipe++){
            let test_ok =[];
            for(let ingredient=0; ingredient<recipes[recipe]['ingredients'].length; ingredient++){
                if(arrayTags.includes(recipes[recipe]['ingredients'][ingredient]['ingredient'].toLowerCase())){
                    test_ok.push(true);
                }
            }
            if(test_ok.length === arrayTags.length){
                array_ingredients[ingredient_id] = recipes[recipe];
                ingredient_id++;
            }
        }
        if(array_ingredients.length > 0){
            result.push(...array_ingredients);
        }

        return result;
    } else {
        return recipes;
    }
}

/**
 * affiche les recettes des filtres + de la recherche
 * @param { array } arrayRecettes 
 */
async function getRechercheRecette(arrayRecettes) {
    if (arrayRecettes.length > 0) {
        document.querySelector('#recette').innerHTML = "";
        await displayData(arrayRecettes);
    } else {
        document.querySelector('#recette').textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc';
    }

}

/**
 * recupere les recettes rechercher
 * @param { String } input 
 * @param { Array } recipes Array de recette
 * @returns { Array } array de recette
 */
function getRecherche(input, recipes){
    input = input.toLowerCase();
    let resultat = [];
    let u = 0;
    for(let i =0; i < recipes.length; i++){
        if (recipes[i]['name'].toLowerCase().includes(input)) {
            resultat[u] = recipes[i];
            u++;
        } else if (isIngredient(recipes[i]['ingredients'], input)) {
            resultat[u] = recipes[i];
            u++;
        } else if (recipes[i]['description'].toLowerCase().includes(input)) {
            resultat[u] = recipes[i];
            u++;
        }
    }
    
    return resultat;
}

/**
 * vérifie si l'input est dans un array
 * @param { array } array 
 * @param { string } input 
 * @returns { boolean }
 */
function isInputInArray(array,input){
    let resultat = false;
    for (let i=0; i < array.length; i++){
        if (array[i].toLowerCase().includes(input)) {
            resultat = true;
        }
    }
    return resultat;
}

/**
 * vérifie si l'input est dans un ingredient
 * @param { array } ingredients 
 * @param { string } input 
 * @returns { boolean }
 */
function isIngredient(ingredients, input) {
    let resultat = false;
    for (let i=0; i < ingredients.length; i++){
        if (ingredients[i]['ingredient'].toLowerCase().includes(input)) {
            resultat = true;
        }
    }

    return resultat;
}

/**
 * recupere les appareilles de recipes
 * @returns { array } appareilles
 */
const Appareilles = AppareillesAll();
function AppareillesAll() {
    let result = [];
    let i = 0;
    for (let u=0; u < recettes.length; u++){
        if (!isInputInArray(result,  recettes[u]['appliance'].toLowerCase())) {
            result[i] = recettes[u]['appliance'];
            i++;
        }
    }
    return removeDuplicates(result);
}

/**
 * recupere les ustensils de recipes
 * @returns { array } ustensils
 */
const Ustensils = UstensilsAll();
function UstensilsAll() {
    let result = [];
    let i = 0;
    for (let u=0; u < recettes.length; u++){
        for (let a=0; a < recettes[u]['ustensils'].length; a++){
            if (!isInputInArray(result,  recettes[u]['ustensils'][a].toLowerCase())) {
                result[i] = recettes[u]['ustensils'][a];
                i++;
            }else{
                break;
            }
        }
    }
    return removeDuplicates(result);
}

/**
 * recupere tout les ingredient de recipes
 * @returns { array } ingredients
 */
function IngredientsAll() {
    let result = [];
    let i = 0;
    for (let u=0; u < recettes.length; u++){
        if (result.length > 0) {
            for (let a=0; a < recettes[u]['ingredients'].length; a++){
                if (!isInputInArray(result,  recettes[u]['ingredients'][a]['ingredient'].toLowerCase())) {
                    result[i] = recettes[u]['ingredients'][a]['ingredient'];
                    i++;
                }else{
                    break;
                }
            }
        } else {
            for (let a=0; a < recettes[u]['ingredients'].length; a++){
                result[i] = recettes[u]['ingredients'][a]['ingredient'];
                i++;
            }
        }
    }
    return removeDuplicates(result);
};

/**
 * supprime les duplications
 * @param { Array } array 
 * @returns { Array }
 */
function removeDuplicates(array) {

    let newArray = [];

    let uniqueObject = {};

    for (let i in array) {

        obj = array[i];

        uniqueObject[obj] = array[i];
    }

    for (i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

    return newArray;
}