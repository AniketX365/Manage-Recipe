import { Recipes } from './recipes.js';
import { UI } from './ui.js';

// Main application
class RecipeManagerApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize recipes
        Recipes.init();

        // Initialize UI
        UI.init();

        console.log('Recipe Manager App initialized');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecipeManagerApp();
});