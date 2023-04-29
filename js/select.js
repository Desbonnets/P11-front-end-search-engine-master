/**
 * Gère l'auto completion
 * @param { Element } target 
 * @param { Element } ulField 
 * @param { String } color 
 * @param { Array } array 
 */
function changeAutoComplete(target, ulField, color, array) {
    let tags = document.querySelectorAll('#tags [name="'+color+'"]');
    tags.forEach((tag)=>{
        array = array.filter(arg =>  arg != tag.textContent);
    });
    let data = target.value;
    ulField.querySelector('.container .row').innerHTML = ``;
    if (data.length) {
        let autoCompleteValues = autoComplete(data, array);
        autoCompleteValues.forEach(value => { addItem(value, ulField, color); });
    }else{
        recherche_recette();
        if(target.id == 'rechercheIngredients'){
            array = IngredientsAll();
            tags.forEach((tag)=>{
                array = array.filter(arg =>  arg != tag.textContent);
            });
        }else if(target.id == 'rechercheUstensils'){
            array = UstensilsAll();
            tags.forEach((tag)=>{
                array = array.filter(arg =>  arg != tag.textContent);
            });
        }else if(target.id == 'rechercheAppareilles'){
            array = AppareillesAll();
            tags.forEach((tag)=>{
                array = array.filter(arg =>  arg != tag.textContent);
            });
        }
        displayDropdown(array, ulField, color);
    }
}

/**
 * retourne le filtre de l'array paraport a l'input
 * @param { String } inputValue 
 * @param { Array } array 
 * @returns { Array }
 */
function autoComplete(inputValue, array) {
    let newValues = '';
    if (inputValue.split('; ').length > 0) {
        newValues = inputValue.split('; ')[inputValue.split('; ').length - 1];
    } else {
        newValues = inputValue;
    }
    return array.filter(
        (value) => value.toLowerCase().includes(newValues.toLowerCase())
    );
}

/**
 * ajoute un item dans l'element
 * @param { String } value 
 * @param { Element } ulField 
 * @param { String } color 
 */
function addItem(value, ulField, color) {
    if(ulField.querySelector('.container .row').childElementCount <= 25){
        ulField.querySelector('.container .row').innerHTML = ulField.querySelector('.container .row').innerHTML + `<div id="`+(ulField.childElementCount+1)+`" class="`+color+` text-white p-2 ps-2 col">${value}</div>`;
    }
}

 /**
  * Gére la selection d'un item
  * @param { Element } target 
  * @param { Element } ulField 
  */
function selectItem(target,ulField,color) {
    if (Number.isInteger(parseInt(target.id,10))) {

        displayTag(target, color);
        ulField.setAttribute('class', 'dropdown-menu');
        ulField.querySelector('.container .row').innerHTML = '';
        estSurvole = false;
    }else{
        ulField.setAttribute('class', 'dropdown-menu');
        estSurvole = false;
    }
} 

/**
 * Affiche le dropdown
 * @param { Array } array 
 * @param { Element } ulField 
 * @param { String } color 
 */
function displayDropdown(array, ulField, color) {
    let tags = document.querySelectorAll('#tags [name="'+color+'"]');
    tags.forEach((tag)=>{
        array = array.filter(arg =>  arg != tag.textContent);
    });
    let id = 0;
    for (let i = 0; i <array.length; i++) {
        if (array.length > id) {
            let li = document.createElement('div');
            li.setAttribute("class", "text-white p-2 ps-2 col "+color);
            li.setAttribute("id", id+1);
            li.textContent = array[id];
            ulField.querySelector('.container .row').appendChild(li);
            id++;
            if(id >= 25){
                break;
            }
        }
    }
}

function displayTag(element, color) {
    let newTag = document.createElement('button');
    let tags  = document.getElementById('tags');
    
    if(color == 'itemA'){
        newTag.setAttribute('name',color);
        color = 'tagA';
    }else if(color == 'itemI'){
        newTag.setAttribute('name',color);
        color = 'tagI';
    }else if(color == 'itemU'){
        newTag.setAttribute('name',color);
        color = 'tagU';
    }
     
    newTag.setAttribute('type','button'); 
    newTag.setAttribute('class','btn btn-sm text-white col me-2 '+color); 
    newTag.setAttribute('id', element.innerHTML.replace(/ /g,'_'));
    newTag.textContent = element.innerHTML;
    tags.appendChild(newTag);
    newTag.addEventListener('click',(e) => e.target.remove());
    newTag.addEventListener('click', recherche_recette);
}

//////////////////////////////////////////////////////////////////
/////////////////////// Gestion des event ////////////////////////
//////////////////////////////////////////////////////////////////

let inputFieldI = document.getElementById('rechercheIngredients');
let ulFieldI = document.getElementById('suggestionsI');
let inputFieldA = document.getElementById('rechercheAppareilles');
let ulFieldA = document.getElementById('suggestionsA');
let inputFieldU = document.getElementById('rechercheUstensils');
let ulFieldU = document.getElementById('suggestionsU');
let estSurvole = false;

inputFieldA.addEventListener('input', function(e) {changeAutoComplete(e.target, ulFieldA, 'itemA', AppareillesAll())});
ulFieldA.addEventListener("mouseover", function (event) {
    estSurvole = true;
});

ulFieldA.addEventListener("mouseout", function (event) {
    estSurvole = false;
});
inputFieldA.addEventListener('focus', function () {
    if(inputFieldA.value == "" || inputFieldA.value == undefined){
        displayDropdown(AppareillesAll(), ulFieldA, 'itemA');
    }else{
        changeAutoComplete(e.target, ulFieldA, 'itemA', AppareillesAll());
    }
    ulFieldA.setAttribute('class', 'dropdown-menu dropA show');
});
inputFieldA.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldA.setAttribute('class', 'dropdown-menu dropA')
        ulFieldA.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldA.addEventListener('click', function (e){selectItem(e.target,ulFieldA,'itemA');});
ulFieldA.addEventListener('click', recherche_recette);

inputFieldI.addEventListener('input', function(e) {changeAutoComplete(e.target, ulFieldI, 'itemI', IngredientsAll())});
ulFieldI.addEventListener("mouseover", function (event) {
    estSurvole = true;
});

ulFieldI.addEventListener("mouseout", function (event) {
    estSurvole = false;
});
inputFieldI.addEventListener('focus', function () {
    if(inputFieldI.value == "" || inputFieldI.value == undefined){
        displayDropdown(IngredientsAll(), ulFieldI, 'itemI');
    }else{
        changeAutoComplete(e.target, ulFieldI, 'itemI', IngredientsAll());
    }
    ulFieldI.setAttribute('class', 'dropdown-menu dropI show');
});
inputFieldI.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldI.setAttribute('class', 'dropdown-menu dropI')
        ulFieldI.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldI.addEventListener('click', function (e){selectItem(e.target,ulFieldI,'itemI')});
ulFieldI.addEventListener('click', recherche_recette);

inputFieldU.addEventListener('input', function(e) {changeAutoComplete(e.target, ulFieldU, 'itemU', UstensilsAll())});
ulFieldU.addEventListener("mouseover", function (event) {
    estSurvole = true;
});

ulFieldU.addEventListener("mouseout", function (event) {
    estSurvole = false;
});
inputFieldU.addEventListener('focus', function () {
    if(inputFieldU.value == "" || inputFieldU.value == undefined){
        displayDropdown(UstensilsAll(), ulFieldU, 'itemU');
    }else{
        changeAutoComplete(e.target, ulFieldU, 'itemU', UstensilsAll());
    }
    ulFieldU.setAttribute('class', 'dropdown-menu dropU show');
});
inputFieldU.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldU.setAttribute('class', 'dropdown-menu dropU')
        ulFieldU.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldU.addEventListener('click', function (e){selectItem(e.target,ulFieldU,'itemU')});
ulFieldU.addEventListener('click', recherche_recette);