import { Recipes } from './recipes.js';
import { Utils } from './utils.js';


// UI management
export const UI = {
    // DOM elements
    elements: {
        homePage: document.getElementById('home-page'),
        recipeDetailPage: document.getElementById('recipe-detail-page'),
        recipeFormPage: document.getElementById('recipe-form-page'),
        recipeGrid: document.getElementById('recipe-grid'),
        recipeDetail: document.getElementById('recipe-detail'),
        recipeForm: document.getElementById('recipe-form'),
        formTitle: document.getElementById('form-title'),
        searchInput: document.getElementById('search-input'),
        difficultyFilter: document.getElementById('difficulty-filter'),
        timeFilter: document.getElementById('time-filter'),
        homeBtn: document.getElementById('home-btn'),
        addRecipeBtn: document.getElementById('add-recipe-btn'),
        cancelBtn: document.getElementById('cancel-btn')
    },

    // Form elements
    formElements: {
        title: document.getElementById('recipe-title'),
        description: document.getElementById('recipe-description'),
        image: document.getElementById('recipe-image'),
        prepTime: document.getElementById('prep-time'),
        cookTime: document.getElementById('cook-time'),
        difficulty: document.getElementById('difficulty'),
        ingredientInput: document.getElementById('ingredient-input'),
        stepInput: document.getElementById('step-input'),
        ingredientsList: document.getElementById('ingredients-list'),
        stepsList: document.getElementById('steps-list'),
        addIngredientBtn: document.getElementById('add-ingredient'),
        addStepBtn: document.getElementById('add-step')
    },

    // Error elements
    errorElements: {
        title: document.getElementById('title-error'),
        prepTime: document.getElementById('prep-time-error'),
        difficulty: document.getElementById('difficulty-error'),
        ingredients: document.getElementById('ingredients-error'),
        steps: document.getElementById('steps-error')
    },

    // State
    state: {
        currentRecipeId: null,
        ingredients: [],
        steps: []
    },

    // Initialize UI
    init() {
        this.renderRecipes();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        this.elements.homeBtn.addEventListener('click', () => this.showHomePage());
        this.elements.addRecipeBtn.addEventListener('click', () => this.showAddRecipeForm());
        this.elements.cancelBtn.addEventListener('click', () => this.showHomePage());

        // Search and filters
        const debouncedSearch = Utils.debounce(() => this.renderRecipes(), 300);
        this.elements.searchInput.addEventListener('input', debouncedSearch);
        this.elements.difficultyFilter.addEventListener('change', () => this.renderRecipes());
        this.elements.timeFilter.addEventListener('change', () => this.renderRecipes());

        // Form submission
        this.elements.recipeForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Ingredients and steps
        this.formElements.addIngredientBtn.addEventListener('click', () => this.addIngredient());
        this.formElements.addStepBtn.addEventListener('click', () => this.addStep());

        // Enter key for adding ingredients and steps
        this.formElements.ingredientInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addIngredient();
            }
        });

        this.formElements.stepInput.addEventListener('keypress', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.addStep();
            }
        });
    },

    // Show home page
    showHomePage() {
        this.elements.homePage.classList.add('active');
        this.elements.recipeDetailPage.classList.remove('active');
        this.elements.recipeFormPage.classList.remove('active');
        this.renderRecipes();
    },

    // Show recipe detail page
    showRecipeDetail(id) {
        const recipe = Recipes.getById(id);
        if (!recipe) return;

        this.elements.recipeDetail.innerHTML = this.renderRecipeDetail(recipe);
        
        this.elements.homePage.classList.remove('active');
        this.elements.recipeDetailPage.classList.add('active');
        this.elements.recipeFormPage.classList.remove('active');
    },

    // Show add recipe form
    showAddRecipeForm() {
        this.elements.formTitle.textContent = 'Add New Recipe';
        this.elements.recipeForm.reset();
        this.state.currentRecipeId = null;
        this.state.ingredients = [];
        this.state.steps = [];
        this.renderIngredients();
        this.renderSteps();
        this.clearErrors();
        
        this.elements.homePage.classList.remove('active');
        this.elements.recipeDetailPage.classList.remove('active');
        this.elements.recipeFormPage.classList.add('active');
    },

    // Show edit recipe form
    showEditRecipeForm(id) {
        const recipe = Recipes.getById(id);
        if (!recipe) return;

        this.elements.formTitle.textContent = 'Edit Recipe';
        this.state.currentRecipeId = id;
        
        // Populate form fields
        this.formElements.title.value = recipe.title;
        this.formElements.description.value = recipe.description || '';
        this.formElements.image.value = recipe.image || '';
        this.formElements.prepTime.value = recipe.prepTime;
        this.formElements.cookTime.value = recipe.cookTime || '';
        this.formElements.difficulty.value = recipe.difficulty;
        
        // Set ingredients and steps
        this.state.ingredients = [...recipe.ingredients];
        this.state.steps = [...recipe.steps];
        this.renderIngredients();
        this.renderSteps();
        this.clearErrors();
        
        this.elements.homePage.classList.remove('active');
        this.elements.recipeDetailPage.classList.remove('active');
        this.elements.recipeFormPage.classList.add('active');
    },

    // Render recipes grid
    renderRecipes() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const difficultyValue = this.elements.difficultyFilter.value;
        const timeValue = parseInt(this.elements.timeFilter.value);
        
        const filteredRecipes = Recipes.search(searchTerm, difficultyValue, timeValue);
        
        if (filteredRecipes.length === 0) {
            this.elements.recipeGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No recipes found</h3>
                    <p>Try adjusting your search or filters, or add a new recipe.</p>
                </div>
            `;
            return;
        }
        
        this.elements.recipeGrid.innerHTML = filteredRecipes.map(recipe => 
            this.renderRecipeCard(recipe)
        ).join('');
    },

    // Render recipe card
    renderRecipeCard(recipe) {
        return `
            <div class="recipe-card">
                <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}" 
                     alt="${recipe.title}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span>${recipe.prepTime + (recipe.cookTime || 0)} min</span>
                        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</span>
                    </div>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-actions">
                        <button class="btn btn-primary" onclick="UI.showRecipeDetail('${recipe.id}')">View</button>
                        <button class="btn btn-secondary" onclick="UI.showEditRecipeForm('${recipe.id}')">Edit</button>
                    </div>
                </div>
            </div>
        `;
    },

    // Render recipe detail
    renderRecipeDetail(recipe) {
        return `
            <img src="${recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}" 
                 alt="${recipe.title}" class="recipe-detail-image">
            <div class="recipe-detail-content">
                <div class="recipe-detail-header">
                    <div>
                        <h1 class="recipe-detail-title">${recipe.title}</h1>
                        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}</span>
                    </div>
                    <div class="recipe-detail-actions">
                        <button class="btn btn-primary" onclick="UI.showEditRecipeForm('${recipe.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="UI.deleteRecipe('${recipe.id}')">Delete</button>
                    </div>
                </div>
                
                <p>${recipe.description}</p>
                
                <div class="recipe-detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">Prep Time</span>
                        <span class="meta-value">${recipe.prepTime} min</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Cook Time</span>
                        <span class="meta-value">${recipe.cookTime || 0} min</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Total Time</span>
                        <span class="meta-value">${recipe.prepTime + (recipe.cookTime || 0)} min</span>
                    </div>
                </div>
                
                <h2 class="section-title">Ingredients</h2>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                
                <h2 class="section-title">Steps</h2>
                <ol class="steps-list">
                    ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        `;
    },

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        const recipeData = {
            title: this.formElements.title.value.trim(),
            description: this.formElements.description.value.trim(),
            image: this.formElements.image.value.trim(),
            prepTime: parseInt(this.formElements.prepTime.value),
            cookTime: parseInt(this.formElements.cookTime.value) || 0,
            difficulty: this.formElements.difficulty.value,
            ingredients: [...this.state.ingredients],
            steps: [...this.state.steps]
        };
        
        if (this.state.currentRecipeId) {
            // Update existing recipe
            Recipes.update(this.state.currentRecipeId, recipeData);
        } else {
            // Add new recipe
            Recipes.add(recipeData);
        }
        
        this.showHomePage();
    },

    // Validate form
    validateForm() {
        let isValid = true;
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate title
        if (!this.formElements.title.value.trim()) {
            this.errorElements.title.style.display = 'block';
            isValid = false;
        }
        
        // Validate prep time
        if (!this.formElements.prepTime.value || parseInt(this.formElements.prepTime.value) < 1) {
            this.errorElements.prepTime.style.display = 'block';
            isValid = false;
        }
        
        // Validate difficulty
        if (!this.formElements.difficulty.value) {
            this.errorElements.difficulty.style.display = 'block';
            isValid = false;
        }
        
        // Validate ingredients
        if (this.state.ingredients.length === 0) {
            this.errorElements.ingredients.style.display = 'block';
            isValid = false;
        }
        
        // Validate steps
        if (this.state.steps.length === 0) {
            this.errorElements.steps.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    },

    // Clear error messages
    clearErrors() {
        Object.values(this.errorElements).forEach(error => {
            error.style.display = 'none';
        });
    },

    // Add ingredient
    addIngredient() {
        const ingredient = this.formElements.ingredientInput.value.trim();
        if (ingredient) {
            this.state.ingredients.push(ingredient);
            this.formElements.ingredientInput.value = '';
            this.renderIngredients();
            this.errorElements.ingredients.style.display = 'none';
        }
    },

    // Add step
    addStep() {
        const step = this.formElements.stepInput.value.trim();
        if (step) {
            this.state.steps.push(step);
            this.formElements.stepInput.value = '';
            this.renderSteps();
            this.errorElements.steps.style.display = 'none';
        }
    },

    // Remove ingredient
    removeIngredient(index) {
        this.state.ingredients.splice(index, 1);
        this.renderIngredients();
    },

    // Remove step
    removeStep(index) {
        this.state.steps.splice(index, 1);
        this.renderSteps();
    },

    // Render ingredients list
    renderIngredients() {
        this.formElements.ingredientsList.innerHTML = '';
        this.state.ingredients.forEach((ingredient, index) => {
            const item = document.createElement('div');
            item.className = 'ingredient-item';
            item.innerHTML = `
                <span>${ingredient}</span>
                <button type="button" class="btn-remove" onclick="UI.removeIngredient(${index})">×</button>
            `;
            this.formElements.ingredientsList.appendChild(item);
        });
    },

    // Render steps list
    renderSteps() {
        this.formElements.stepsList.innerHTML = '';
        this.state.steps.forEach((step, index) => {
            const item = document.createElement('div');
            item.className = 'step-item';
            item.innerHTML = `
                <span>${index + 1}. ${step}</span>
                <button type="button" class="btn-remove" onclick="UI.removeStep(${index})">×</button>
            `;
            this.formElements.stepsList.appendChild(item);
        });
    },

    // Delete recipe
    deleteRecipe(id) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            Recipes.delete(id);
            this.showHomePage();
        }
    }
};

// Make UI available globally for onclick handlers
window.UI = UI;

// Extend UI.elements with optional footer/back-to-top elements (if present in the DOM)
UI.elements.backToTop = document.getElementById('back-to-top');
UI.elements.aboutLink = document.getElementById('about-link');
UI.elements.privacyLink = document.getElementById('privacy-link');
UI.elements.careersLink = document.getElementById('careers-link');
UI.elements.contactLink = document.getElementById('contact-link');

// Add footer/back-to-top methods to UI
UI.toggleBackToTop = function() {
    if (!this.elements.backToTop) return;
    if (window.pageYOffset > 300) {
        this.elements.backToTop.classList.add('show');
    } else {
        this.elements.backToTop.classList.remove('show');
    }
};

UI.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

UI.handleFooterLink = function(e, type) {
    e.preventDefault();

    const messages = {
        about: 'About Us Page\n\nRecipe Manager was born from a passion for cooking and technology. Our mission is to make cooking accessible and enjoyable for everyone, from beginners to professional chefs.',
        privacy: 'Privacy Policy\n\nWe are committed to protecting your privacy. Your recipes and personal data are securely stored and never shared with third parties without your consent.',
        careers: 'Careers\n\nJoin our team! We\'re always looking for passionate developers, designers, and food enthusiasts to help us build the future of recipe management.',
        contact: 'Contact Us\n\nEmail: hello@recipemanager.com\nPhone: (555) 123-RECIPE\nAddress: 123 Culinary Street, Food City, FC 12345'
    };

    alert(messages[type] || 'This page is coming soon!');
    // Optionally call a page renderer: this.showFooterPage && this.showFooterPage(type);
};

UI.showFooterPage = function(page) {
    console.log('Navigating to: ' + page);
};

// Augment setupEventListeners to attach footer/back-to-top handlers after original listeners run
const _origSetupEventListeners = UI.setupEventListeners;
UI.setupEventListeners = function() {
    // call original setup to register base listeners
    _origSetupEventListeners.call(this);

    // Back to top
    if (this.elements.backToTop) {
        this.elements.backToTop.addEventListener('click', () => this.scrollToTop());
        window.addEventListener('scroll', () => this.toggleBackToTop());
    }

    // Footer links (only attach if elements exist)
    if (this.elements.aboutLink) this.elements.aboutLink.addEventListener('click', (e) => this.handleFooterLink(e, 'about'));
    if (this.elements.privacyLink) this.elements.privacyLink.addEventListener('click', (e) => this.handleFooterLink(e, 'privacy'));
    if (this.elements.careersLink) this.elements.careersLink.addEventListener('click', (e) => this.handleFooterLink(e, 'careers'));
    if (this.elements.contactLink) this.elements.contactLink.addEventListener('click', (e) => this.handleFooterLink(e, 'contact'));
};