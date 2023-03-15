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
async function recherche_Ustensils_recette(input, recipes) {

    input = input.value.toLowerCase();
    let resultat = "";
    let result = [];
    let u = 0;

    if (input != '') {
        recipes.forEach(function (recette) {
            input.split('; ').forEach(function (Ustensil) {
                if (Ustensil != ""){
                    if (isUstensil(recette['ustensils'], Ustensil)) {
                        for (let a = 0; a < recette['ustensils'].length; a++) {
                            let mot_cle = resultat.toLowerCase().split('; ');
                            if (Ustensil != '' && recette['ustensils'][a].toLowerCase().includes(Ustensil) && !mot_cle.includes(recette['ustensils'][a].toLowerCase())) {
                                resultat += recette['ustensils'][a] + '; ';
                            }
                        }
                        if (result.length > 0) {
                            if (result[u - 1]['id'] != recette['id']) {
                                result[u] = recette;
                                u++;
                            }
                        } else {
                            result[u] = recette;
                            u++;
                        }

                    }
                }
            })
        });
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
async function recherche_Appareilles_recette(input, recipes) {

    input = input.value.toLowerCase();
    let resultat = "";
    let result = [];
    let u = 0;

    if (input != '') {
        recipes.forEach(function (recette) {
            input.split('; ').forEach(function (appareille) {
                let mot_cle = resultat.toLowerCase().split('; ');
                if (appareille != '' && recette['appliance'].toLowerCase().includes(appareille)) {
                    if (mot_cle.includes(recette['appliance'].toLowerCase())) {
                        resultat += recette['appliance'] + '; ';
                    }
                    if (result.length > 0) {
                        if (result[u - 1]['id'] != recette['id']) {
                            result[u] = recette;
                            u++;
                        }
                    } else {
                        result[u] = recette;
                        u++;
                    }
                }
            })
        });
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
async function recherche_Ingredients_recette(input,recipes) {

    input = input.value.toLowerCase();
    let resultat = "";
    let result = [];
    let u = 0;

    if (input != '') {
        recipes.forEach(function (recette) {
            input.split('; ').forEach(function (ingredient) {
                if (ingredient != '' && isIngredient(recette['ingredients'], ingredient)) {
                    for (let a = 0; a < recette['ingredients'].length; a++) {
                        let mot_cle = resultat.toLowerCase().split('; ');
                        if (recette['ingredients'][a]['ingredient'].toLowerCase().includes(ingredient) && !mot_cle.includes(recette['ingredients'][a]['ingredient'].toLowerCase())) {
                            resultat += recette['ingredients'][a]['ingredient'] + '; ';
                        }
                    }
                    if (result.length > 0) {
                        if (result[u - 1]['id'] != recette['id']) {
                            result[u] = recette;
                            u++;
                        }
                    } else {
                        result[u] = recette;
                        u++;
                    }

                }
            })
        });
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
        document.querySelector('#recette').textContent = 'Aucune recettes trouver.';
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
    for (let i = 0; i < recipes.length; i++) {
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
    for (let a = 0; a < array.length; a++) {
        if (array[a].toLowerCase().includes(input)) {
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
    for (let a = 0; a < ingredients.length; a++) {
        if (ingredients[a]['ingredient'].toLowerCase().includes(input)) {
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
    recettes.forEach(function (recette) {
        result[i] = recette['appliance'];
        i++;
    })
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
    recettes.forEach(function (recette) {
        recette['ustensils'].forEach(function (ustensil) {
            result[i] = ustensil;
            i++;
        })
    })
    return removeDuplicates(result);
}

/**
 * recupere tout les ingredient de recipes
 * @returns { array } ingredients
 */
function IngredientsAll() {
    let result = [];
    let i = 0;
    recettes.forEach(function (recette) {
        if (result.length > 0) {
            recette['ingredients'].forEach(function (element) {
                if (!isInputInArray(result,  element['ingredient'].toLowerCase())) {
                    result[i] = element['ingredient'];
                    i++;
                }else{
                    return;
                }
            });
        } else {
            recette['ingredients'].forEach(function (element) {
                result[i] = element['ingredient'];
                i++;
            })
        }
    })
    return removeDuplicates(result);
};

/**
 * 
 * @param { Array } array 
 * @returns { Array }
 */
function removeDuplicates(array) {

    // Declare a new array
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in array) {

        obj = array[i];

        uniqueObject[obj] = array[i];
    }

    // Loop to push unique object into array
    for (i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

    return newArray;
}