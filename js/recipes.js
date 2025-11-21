import { Storage } from './storage.js';
import { Utils } from './utils.js';

// Recipe data management
export const Recipes = {
    recipes: [],

    // Initialize recipes
    init() {
        const storedRecipes = Storage.getRecipes();
        if (storedRecipes) {
            this.recipes = storedRecipes;
        } else {
            this.recipes = Storage.initializeSampleRecipes();
        }
        return this.recipes;
    },

    // Get all recipes
    getAll() {
        return this.recipes;
    },

    // Get recipe by ID
    getById(id) {
        return this.recipes.find(recipe => recipe.id === id);
    },

    // Add new recipe
    add(recipeData) {
        const newRecipe = {
            id: Utils.generateId(),
            ...recipeData
        };
        
        this.recipes.push(newRecipe);
        Storage.saveRecipes(this.recipes);
        return newRecipe;
    },

    // Update existing recipe
    update(id, recipeData) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes[index] = { ...this.recipes[index], ...recipeData };
            Storage.saveRecipes(this.recipes);
            return this.recipes[index];
        }
        return null;
    },

    // Delete recipe
    delete(id) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        if (index !== -1) {
            this.recipes.splice(index, 1);
            Storage.saveRecipes(this.recipes);
            return true;
        }
        return false;
    },

    // Search recipes
    search(searchTerm, difficultyFilter, timeFilter) {
        return this.recipes.filter(recipe => {
            // Search filter
            if (searchTerm && 
                !recipe.title.toLowerCase().includes(searchTerm) && 
                !recipe.description.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            // Difficulty filter
            if (difficultyFilter !== 'all' && recipe.difficulty !== difficultyFilter) {
                return false;
            }
            
            // Time filter
            if (timeFilter > 0 && recipe.prepTime > timeFilter) {
                return false;
            }
            
            return true;
        });
    }
};