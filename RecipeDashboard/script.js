// Recipe data
const recipes = [
    {
      id: 1,
      title: "Quinoa Buddha Bowl",
      type: "Vegan",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      time: "25 mins",
      servings: "2",
      difficulty: "Medium",
      nutrition: {
        calories: 425,
        protein: "12g",
        carbs: "58g",
        fats: "22g"
      }
    },
    {
      id: 2,
      title: "Grilled Chicken Salad",
      type: "nonveg",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      time: "20 mins",
      servings: "1",
      difficulty: "Easy",
      nutrition: {
        calories: 320,
        protein: "28g",
        carbs: "12g",
        fats: "18g"
      }
    },
    {
      id: 3,
      title: "Vegetable Stir Fry",
      type: "Vegetarian",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      time: "15 mins",
      servings: "2",
      difficulty: "Easy",
      nutrition: {
        calories: 280,
        protein: "8g",
        carbs: "42g",
        fats: "12g"
      }
    }
  ];
  
  // DOM Elements
  const recipeTypeSelect = document.getElementById('recipe-type');
  const nutritionToggle = document.getElementById('nutrition-toggle');
  const quickRecipesToggle = document.getElementById('quick-recipes-toggle');
  const tags = document.querySelectorAll('.tag');
  const saveButton = document.querySelector('.btn.save');
  const cancelButton = document.querySelector('.btn.cancel');
  const recipePreview = document.querySelector('.recipe-preview');
  const nutritionInfo = document.querySelector('.nutrition-info');
  
  let currentRecipeIndex = 0;
  
  // Functions
  function updateRecipePreview(recipe) {
    recipePreview.classList.add('loading');
    
    setTimeout(() => {
      document.querySelector('.recipe-image').src = recipe.image;
      document.querySelector('.recipe-title').textContent = recipe.title;
      document.querySelector('.recipe-type').textContent = recipe.type;
      
      const metaItems = document.querySelectorAll('.meta-item span');
      metaItems[0].textContent = recipe.time;
      metaItems[1].textContent = `${recipe.servings} servings`;
      metaItems[2].textContent = recipe.difficulty;
      
      const nutritionValues = document.querySelectorAll('.nutrition-value');
      nutritionValues[0].textContent = recipe.nutrition.calories;
      nutritionValues[1].textContent = recipe.nutrition.protein;
      nutritionValues[2].textContent = recipe.nutrition.carbs;
      nutritionValues[3].textContent = recipe.nutrition.fats;
      
      recipePreview.classList.remove('loading');
    }, 500);
  }
  
  function filterRecipes() {
    const selectedType = recipeTypeSelect.value;
    const quickOnly = quickRecipesToggle.checked;
    const filteredRecipes = recipes.filter(recipe => {
      const matchesType = recipe.type.toLowerCase() === selectedType;
      const matchesTime = !quickOnly || parseInt(recipe.time) <= 20;
      return matchesType && matchesTime;
    });
    
    if (filteredRecipes.length > 0) {
      currentRecipeIndex = 0;
      updateRecipePreview(filteredRecipes[0]);
    }
  }
  
  // Event Listeners
  recipeTypeSelect.addEventListener('change', filterRecipes);
  quickRecipesToggle.addEventListener('change', filterRecipes);
  
  nutritionToggle.addEventListener('change', () => {
    nutritionInfo.classList.toggle('hidden', !nutritionToggle.checked);
  });
  
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });
  
  saveButton.addEventListener('click', () => {
    saveButton.classList.add('loading');
    setTimeout(() => {
      saveButton.classList.remove('loading');
      alert('Preferences saved successfully!');
    }, 1000);
  });
  
  cancelButton.addEventListener('click', () => {
    recipeTypeSelect.value = 'vegan';
    nutritionToggle.checked = true;
    quickRecipesToggle.checked = false;
    tags.forEach(tag => tag.classList.remove('active'));
    tags[1].classList.add('active');
    nutritionInfo.classList.remove('hidden');
    filterRecipes();
  });
  
  // Initialize
  document.querySelector('.recipe-image').addEventListener('load', () => {
    recipePreview.classList.remove('loading');
  });
  
  // Start with first recipe
  updateRecipePreview(recipes[0]);