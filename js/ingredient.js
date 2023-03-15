class Ingredient {
    constructor(ingredient, quantity, unit) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }

    get ingredient(){
        return this.ingredient;
    }

    get quantity(){
        return this.quantity;
    }

    get unit(){
        return this.unit;
    }
}