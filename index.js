
function recetteFactory(data) {
    //déstructuration du json
    const { name, ingredients, time, description, ustensils } = data;

    function getRecetteCardDOM() {
        //creation des elements
        const article = document.createElement('article');
        const divCard = document.createElement('div');
        const svg = document.createElement('svg');
        const svgTitle = document.createElement('title');
        const svgRect = document.createElement('rect');
        const divContenu = document.createElement('div');
        const divHeader = document.createElement('div');
        const titre = document.createElement('div');
        const temps = document.createElement('div');
        const divDetail = document.createAttribute('div');
        const list = document.createAttribute('ul');
        const descriptions = document.createAttribute('div');

        //ajouter les attributs de chaque elements
        article.setAttribute("class","col");
        divCard.setAttribute("class","card shadow-sm");
        divCard.setAttribute("style","height: 450px;");
        svg.setAttribute("class", "bd-placeholder-img card-img-top");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "200");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Placeholder: Menu");
        svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svg.setAttribute("focusable", "false");
        svgRect.setAttribute("width", "100%");
        svgRect.setAttribute("height", "100%");
        svgRect.setAttribute("fill", "#55595c");
        divContenu.setAttribute("class","card-body");
        divContenu.setAttribute("style","height: 250px;");
        divHeader.setAttribute("class","d-flex justify-content-between align-items-center mb-3");
        titre.setAttribute("class","fs-4");
        temps.setAttribute("class","fs-4 fw-bold");
        divDetail.setAttribute("class","row g-2 mb-2 h-75");
        list.setAttribute("class","col overflow-hidden ps-3 pe-4 h-100");
        descriptions.setAttribute("class","col overflow-hidden card-text h-100");

        //Ajout du contenu dans les elements
        svgTitle.textContent = 'Menu';
        titre.textContent = name;
        temps.textContent = time;

        ingredients.forEach(function (data) {
            let ingredient = document.createElement('strong');
            let ingredientQuantite = document.createElement('li');

            ingredientQuantite.setAttribute("class", "list-group-item text-nowrap");

            ingredient.textContent = data['ingredient'] + " :";

            ingredientQuantite.appendChild(ingredient);

            if (data['unit'] != undefined) {
                ingredientQuantite.textContent += " " + data['quantity'] + " " + data['unit'];
            } else {
                ingredientQuantite.textContent += " " + data['quantity'];
            }

            //list.appendChild(ingredientQuantite);
        });

        descriptions.textContent = description;

        //organisation (parents/enfants) des elements

        svg.appendChild(svgTitle);
        svg.appendChild(svgRect);
        divContenu.appendChild(divHeader);
        divHeader.appendChild(titre);
        divHeader.appendChild(temps);
        //divContenu.appendChild(divDetail);
        //divDetail.appendChild(list);
        //divDetail.appendChild(descriptions);
        divCard.appendChild(svg);
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
    //const divRow = document.createElement('div');
    recette.forEach((recette) => {
    //    divRow.setAttribute('class','row row-cols-3');
        const recetteModel = recetteFactory(recette);
        const userCardDOM = recetteModel.getRecetteCardDOM();
        recetteDiv.appendChild(userCardDOM);
    //    divRow.appendChild(userCardDOM);
    });
    //recetteDiv.appendChild(divRow);
};

/**
 * initialise la page
 */
async function init() {
    await displayData(recipes);
};

init();

let recettes = recipes;

/**
 * recupere tout les ingredient de recipes
 * @returns { array } ingredients
 */
const Ingredients = function () {
    let result = [];
    let i = 0;
    recipes.forEach(function (recette) {
        recette['ingredients'].forEach(function (element) {
            result.forEach(function (ingredient) {
                if (ingredient.toLowerCase().includes(ingredient['ingredient'])) {
                    result[i] = element['ingredient'];
                }
            })
            i++;
        })
    })
    return result;
};

/**
 * recupere les ustensils de recipes
 * @returns { array } ustensils
 */
const Ustensils = function () {
    let result = [];
    let i = 0;
    recipes.forEach(function (recette) {
        recette['ustensil'].forEach(function (ustensil) {
            result[i] = ustensil;
            i++;
        })
    })
    return result;
};

/**
 * recupere les appareilles de recipes
 * @returns { array } appareilles
 */
const Appareilles = function () {
    let result = [];
    let i = 0;
    recipes.forEach(function (recette) {
        result[i] = recette['appliance'];
        i++;
    })
    return result;
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
 * affiche les recettes des filtres + de la recherche
 * @param { array } arrayRecettes 
 * @param { string } input pas obligatoire
 */
async function getRechercheRecette(arrayRecettes, input) {
    let resultat = [];
    let u = 0;
    if (input) {
        for (let i = 0; i < arrayRecettes.length; i++) {
            if (arrayRecettes[i]['name'].toLowerCase().includes(input)) {
                resultat[u] = arrayRecettes[i];
                u++;
            } else if (isIngredient(arrayRecettes[i]['ingredients'], input)) {
                resultat[u] = arrayRecettes[i];
                u++;
            } else if (arrayRecettes[i]['description'].toLowerCase().includes(input)) {
                resultat[u] = arrayRecettes[i];
                u++;
            }
        }
        if (resultat.length > 0) {
            document.querySelector('.recette').innerHTML = "";
            await displayData(resultat);
        } else {
            document.querySelector('.recette').textContent = 'Aucune recettes trouver.';
        }
    } else {
        if (arrayRecettes.length > 0) {
            document.querySelector('.recette').innerHTML = "";
            await displayData(arrayRecettes);
        } else {
            document.querySelector('.recette').textContent = 'Aucune recettes trouver.';
        }
    }

}

/**
 * regroupe tous les filtres et les affiche
 */
async function recherche_recette() {

    let ingredients = await recherche_Ingredients_recette();
    let ustensils = await recherche_Ustensils_recette();
    let appareilles = await recherche_Appareilles_recette();

    let input = document.getElementById('barreRecherche').value;

    input = input.toLowerCase();

    let result = [];
    let a = 0;
    for (let i = 0; i < ustensils.length; i++) {
        if (isRecette(ustensils[i], ingredients)) {
            ingredients.forEach(function (recette) {
                ustensils[i]['ingredients'].forEach(function (ingredient) {
                    if (!isRecette(ustensils[i], result) &&isRecetteIngredient(recette, ingredient)) {
                        result[a] = ustensils[i];
                        a++;
                    }
                })
            })
        }
    }
    ingredients = result;
    result = [];
    a = 0;
    for (let i = 0; i < appareilles.length; i++) {
        if (isRecette(appareilles[i], ingredients)) {
            ingredients.forEach(function (recette) {
                appareilles[i]['ingredients'].forEach(function (ingredient) {
                    if (!isRecette(appareilles[i], result) && isRecetteIngredient(recette, ingredient)) {
                        result[a] = appareilles[i];
                        a++;
                    }
                })
            })
        }
    }
    ingredients = result;
    recettes = ingredients;

    if (input.length < 3 && document.getElementById('rechercheIngredients').value == "") {

        document.querySelector('.recette').innerHTML = "";
        recettes = recipes;
        init();
    } else if (input.length < 3 && document.getElementById('rechercheIngredients').value != "") {
        getRechercheRecette(recettes);
    } else if (input.length >= 3) {
        getRechercheRecette(recettes, input);
    }
}

/**
 * recupere les recettes filtre par ingredients
 */
async function recherche_Ingredients_recette() {

    let input = document.getElementById('rechercheIngredients').value;
    input = input.toLowerCase();
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
        //recettes = result;
        document.getElementById('rechercheIngredients').value = resultat;
        return result;
    } else {
        //recettes = result;
        return recipes;
    }
}

/**
 * recupere les recettes filtre par appareilles
 */
async function recherche_Appareilles_recette() {

    let input = document.getElementById('rechercheAppareilles').value;
    input = input.toLowerCase();
    let resultat = "";
    let result = [];
    let u = 0;

    if (input != '') {
        recipes.forEach(function (recette) {
            input.split('; ').forEach(function (appareille) {
                let mot_cle = resultat.toLowerCase().split('; ');
                if (appareille != '' && recette['appliance'].toLowerCase().includes(appareille) && !mot_cle.includes(recette['appliance'].toLowerCase())) {
                    resultat += recette['appliance'] + '; ';
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
        //recettes = result;
        document.getElementById('rechercheAppareilles').value = resultat;
        return result;
    } else {
        //recettes = result;
        return recipes;
    }
}

/**
 * recupere les recettes filtre par ustensil
 */
async function recherche_Ustensils_recette() {

    let input = document.getElementById('rechercheUstensils').value;
    input = input.toLowerCase();
    let resultat = "";
    let result = [];
    let u = 0;

    if (input != '') {
        recipes.forEach(function (recette) {
            input.split('; ').forEach(function (Ustensil) {
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
            })
        });
        //recettes = result;
        document.getElementById('rechercheUstensils').value = resultat;
        return result;
    } else {
        //recettes = result;
        return recipes;
    }
}

/**
 * verifie si la recette existe dans l'array
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
 * vérifie si l'input est dans un ustensil
 * @param { array } ustensils 
 * @param { string } input 
 * @returns { boolean }
 */
function isUstensil(ustensils, input) {
    for (let a = 0; a < ustensils.length; a++) {
        if (ustensils[a].toLowerCase().includes(input)) {
            return true;
        }
    }
    return false;
}

function isRecetteIngredient(recette, ingredient) {
    for (let i = 0; i < recette['ingredients'].length; i++) {
        if (recette['ingredients'][i]['ingredient'] == ingredient['ingredient']) {
            return true;
        }
    }
    return false;
}