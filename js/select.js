function changeAutoComplete(target, ulField, color, array) {
    let data = target.value;
    ulField.querySelector('.container .row').innerHTML = ``;
    if (data.length) {
        let autoCompleteValues = autoComplete(data, array);
        autoCompleteValues.forEach(value => { addItem(value, ulField, color); });
    }else{
        displayDropdown(array, ulField, color);
        recherche_recette();
    }
}

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

function addItem(value, ulField, color) {
    if(ulField.querySelector('.container .row').childElementCount <= 25){
        ulField.querySelector('.container .row').innerHTML = ulField.querySelector('.container .row').innerHTML + `<div id="`+(ulField.childElementCount+1)+`" class="`+color+` text-white p-2 ps-2 col">${value}</div>`;
    }
}

function selectItem(target,inputField,ulField) {
    if (Number.isInteger(parseInt(target.id,10))) {
        let result = [];
        if (inputField.value.split('; ').length > 0) {
            result = inputField.value.split('; ');
            result.pop();
        }
        result.push(target.textContent);
        inputField.value = result.join('; ') + '; ';
        ulField.setAttribute('class', 'dropdown-menu');
        ulField.querySelector('.container .row').innerHTML = '';
        estSurvole = false;
    }else{
        ulField.setAttribute('class', 'dropdown-menu');
        estSurvole = false;
    }
}
function displayDropdown(array, ulField, color) {
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
    displayDropdown(AppareillesAll(), ulFieldA, 'itemA');
    ulFieldA.setAttribute('class', 'dropdown-menu bg-success show');
});
inputFieldA.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldA.setAttribute('class', 'dropdown-menu bg-success')
        ulFieldA.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldA.addEventListener('click', function (e){selectItem(e.target,inputFieldA,ulFieldA)});
ulFieldA.addEventListener('click', recherche_recette);

inputFieldI.addEventListener('input', function(e) {changeAutoComplete(e.target, ulFieldI, 'itemI', IngredientsAll())});
ulFieldI.addEventListener("mouseover", function (event) {
    estSurvole = true;
});

ulFieldI.addEventListener("mouseout", function (event) {
    estSurvole = false;
});
inputFieldI.addEventListener('focus', function () {
    displayDropdown(IngredientsAll(), ulFieldI, 'itemI');
    ulFieldI.setAttribute('class', 'dropdown-menu bg-primary show');
});
inputFieldI.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldI.setAttribute('class', 'dropdown-menu bg-primary')
        ulFieldI.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldI.addEventListener('click', function (e){selectItem(e.target,inputFieldI,ulFieldI)});
ulFieldI.addEventListener('click', recherche_recette);

inputFieldU.addEventListener('input', function(e) {changeAutoComplete(e.target, ulFieldU, 'itemU', UstensilsAll())});
ulFieldU.addEventListener("mouseover", function (event) {
    estSurvole = true;
});

ulFieldU.addEventListener("mouseout", function (event) {
    estSurvole = false;
});
inputFieldU.addEventListener('focus', function () {
    displayDropdown(UstensilsAll(), ulFieldU, 'itemU');
    ulFieldU.setAttribute('class', 'dropdown-menu bg-danger show');
});
inputFieldU.addEventListener('focusout', function () {
    if (!estSurvole) {
        ulFieldU.setAttribute('class', 'dropdown-menu bg-danger')
        ulFieldU.querySelector('.container .row').innerHTML = '';
    }
});
ulFieldU.addEventListener('click', function (e){selectItem(e.target,inputFieldU,ulFieldU)});
ulFieldU.addEventListener('click', recherche_recette);