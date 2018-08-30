var RecipeApp = function () {

    var recipes = [
        // { 
        //     id: 1,
        //     name: 'Best Chicken Soup!', 
        //     image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
        //     ingredients: [
        //         { name: 'whole chicken' },
        //         { name: 'medium carrots'},
        //         { name: 'onions' },
        //     ] 
        // }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 

        recipes.push(recipe);
    };

    function _getRecipeById (id){
        for(let i=0; i<recipes.length;i++){
            if (recipes[i].id== id){
                return recipes[i];
            }
        }
    }

    var createIngredients = function(ingredientName, recipeId){
        let recipe= _getRecipeById(recipeId);
        ingId++;
        ingredient = {
            name: ingredientName,
            id:ingId
        };
        recipe.ingredients.push(ingredient);
    };

    var _getIngredientsHTML = function(recipe){
        var recipesHTML = "";
        let ingredients=recipe.ingredients;
        for (let i=0; i<ingredients.length; i++){
            recipesHTML += "<li data-id="+ingredients[i].id+">"+ingredients[i].name+" <button class= 'btn btn-danger remove-ingrd' type='button'>Remove</button></li>";
        }
        return recipesHTML;
    };
    function _getIngredientIndexById (ingredientId, recipe){
        for (let i=0; i<recipe.ingredients.length;i++){
            if (recipe.ingredients[i].id== ingredientId){
                return i;
            }
        }
    }

    function removeIngredient (ingredientId, recipeId){
        let recipe=_getRecipeById(recipeId);
        let index=_getIngredientIndexById(ingredientId, recipe);
        recipe.ingredients.splice(index,1);

        }
        
    

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for(var i = 0; i < recipes.length; i ++){
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); 

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' + 
                    '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                    '<img class="recipe-img" src="' + recipe.image + '"/>' +
                    '<hr>' +
                    '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                    '<div class="input-group mb-3">' +
                        '<div class="input-group-prepend">' +
                            '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                        '</div>' + 
                        '<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">' +
                        
                    '</div>' +
                    '<ul class="ingredients">' + ingredients + '</ul>'+
                '</div>'
            );
        }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        removeIngredient: removeIngredient
    }
};

var app = RecipeApp();
app.renderRecipes();

//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function(){
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('.recipes').on ('click','.add-ingredients' ,function(){
    let ingredientName =$(this).closest(".input-group-prepend").closest(".input-group").find("input").val();
    let currentRecipeId= $(this).closest(".recipe").data().id;
    app.createIngredients(ingredientName, currentRecipeId);
    app.renderRecipes();
});

$('.recipes').on ('click','.remove-ingrd' ,function(){
    let $clickedIngridient=$(this).closest("li");
    let ingredientId= $clickedIngridient.data().id;
    let recipeId= $clickedIngridient.closest(".recipe").data().id;
    app.removeIngredient(ingredientId, recipeId);
    app.renderRecipes();
});