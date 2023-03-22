class Recette {
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {

        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
        
    }

    get id(){
        return this.id;
    }

    get name(){
        return this.name;
    }

    get servings(){
        return this.servings;
    }

    get ingredients(){
        return this.ingredients;
    }

    get time(){
        return this.time;
    }

    get description(){
        return this.description;
    }
    
    get appliance(){
        return this.appliance;
    }

    get ustensils(){
        return this.ustensils;
    }
}