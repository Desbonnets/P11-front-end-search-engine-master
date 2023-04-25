/**
 * True si la recette existe dans l'array des recettes
 * @param { Object } recette 
 * @param { Array } arrayRecettes 
 * @returns { Boolean }
 */
function isRecette(recette, arrayRecettes) {
    let ok = false;
    arrayRecettes.forEach((recipe)=>{
        if (recipe['id'] == recette['id']) {
            ok = true;
        }
    });
    return ok;
}

/**
 * True si l'ingredient est dans la recette
 * @param { Object } recette 
 * @param { Object } ingredient 
 * @returns { boolean }
 */
function isRecetteIngredient(recette, ingredient) {
    let ok = false;
    recette['ingredients'].forEach((recette_Ingredient)=> {
        if (recette_Ingredient['ingredient'] == ingredient['ingredient']) {
            return true;
        }
    });
    return ok;
}

/**
 * True si l'ustensil est dans l'array des ustensils
 * @param { Array } ArrayUstensils 
 * @param { String } ustensil 
 * @returns { boolean }
 */
function isUstensil(ArrayUstensils, ustensil) {
    let ok = false;
    ArrayUstensils.forEach((ArrayUstensils_ustensil) => {
        if (ArrayUstensils_ustensil.toLowerCase().includes(ustensil)) {
            return true;
        }
    });
    return ok;
}

/**
 * recupere les recettes filtre par l'input ustensil
 * @param { Element } input element de l'input ustensil
 * @param { Array } recipes Array de recette
 * @returns { Array } un array des recettes
 */
function recherche_Ustensils_recette(recipes) {

    let result = [];

    let arrayTags = [];
    let tags = document.querySelectorAll('#tags [name="itemU"]');

    tags.forEach((tag)=>{
        arrayTags.push(tag.textContent.toLowerCase());
    });

    if (arrayTags.length > 0) {
        
        result.push(...recipes.filter(recipe => recipe['ustensils'].filter(ustensil => arrayTags.includes(ustensil.toLowerCase())).length === arrayTags.length));
        
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
function recherche_Appareilles_recette(recipes) {

    let result = [];

    let arrayTags = [];
    let tags = document.querySelectorAll('#tags [name="itemA"]');

    tags.forEach((tag)=>{
        arrayTags.push(tag.textContent.toLowerCase());
    });

    if (arrayTags.length === 1) {

        result.push(...recipes.filter(recipe => arrayTags[0].toLowerCase().includes(recipe['appliance'].toLowerCase())));

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
function recherche_Ingredients_recette(recipes) {

    let tags = document.querySelectorAll('#tags [name="itemI"]');
    let arrayTags = [];
    let result = [];

    tags.forEach((tag)=>{
        arrayTags.push(tag.textContent.toLowerCase());
    });

    if (arrayTags.length > 0) {

        result.push(...recipes.filter(recipe => recipe['ingredients'].filter(ingredient => arrayTags.includes(ingredient['ingredient'].toLowerCase())).length === arrayTags.length));

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
    recipes.forEach((Recette) => {
        if (Recette['name'].toLowerCase().includes(input)) {
            resultat[u] = Recette;
            u++;
        } else if (isIngredient(Recette['ingredients'], input)) {
            resultat[u] = Recette;
            u++;
        } else if (Recette['description'].toLowerCase().includes(input)) {
            resultat[u] = Recette;
            u++;
        }
    })
    
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
    array.forEach((element)=>{
        if (element.toLowerCase().includes(input)) {
            resultat = true;
        }
    })
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
    ingredients.forEach((ingredient) =>{
        if (ingredient['ingredient'].toLowerCase().includes(input)) {
            resultat = true;
        }
    });

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
    recettes.forEach((recette) => {
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
    recettes.forEach((recette) => {
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
    recettes.forEach((recette) => {
        if (result.length > 0) {
            recette['ingredients'].forEach((element) => {
                if (!isInputInArray(result,  element['ingredient'].toLowerCase())) {
                    result[i] = element['ingredient'];
                    i++;
                }else{
                    return;
                }
            });
        } else {
            recette['ingredients'].forEach((element) => {
                result[i] = element['ingredient'];
                i++;
            })
        }
    })
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