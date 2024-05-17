const search = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContant = document.querySelector(
    '.meal-diteals-content');
const reaClosebtn = document.getElementById('recipe-close-btn');
search.addEventListener('click' , getMealList );
mealList.addEventListener('click', getMealRecipe );
reaClosebtn.addEventListener('click' ,() => {
    mealDetailsContant.parentElement.classList.remove('show-recipe')
})
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data =>
        {
            let html = "";
            if(data.meals)
                {
                    data.meals.forEach(meal => {
                       html += `
                       <div class="meal-item" data-id ="${meal.idMeal}">
                       <div class="meal-img">
                           <img src="${meal.strMealThumb}" alt="food">
                       </div>
                       <div class="meal-name">
                           <h3>${meal.strMeal}</h3>
                           <a href="#" class="recipe-btn">Get Recipe</a>
                       </div>
                      </div>  ` ;

                    });
                } else{
                    html = "sorry we didn't any meal "
                }
            mealList.innerHTML = html;

        })
     
} 

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn'))
        {
            let mealItem = e.target.parentElement.parentElement;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeMode(data.meals));
        }
}

function mealRecipeMode(meal){
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-catogry">${meal.strCategory}</p>
    <div class="recipe-insertut">
        <h3>Instructions :</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContant.innerHTML = html;
    mealDetailsContant.parentElement.classList.add('show-recipe')
}