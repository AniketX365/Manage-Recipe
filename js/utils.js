// Utility functions
export const Utils = {
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Validate recipe data
    validateRecipe(recipeData) {
        const errors = [];

        if (!recipeData.title?.trim()) {
            errors.push('Title is required');
        }

        if (!recipeData.prepTime || recipeData.prepTime < 1) {
            errors.push('Valid prep time is required');
        }

        if (!recipeData.difficulty) {
            errors.push('Difficulty is required');
        }

        if (!recipeData.ingredients?.length) {
            errors.push('At least one ingredient is required');
        }

        if (!recipeData.steps?.length) {
            errors.push('At least one step is required');
        }

        return errors;
    },

    // Sanitize input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};