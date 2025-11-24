import { Utils } from './utils.js';

// LocalStorage management
export const Storage = {
    STORAGE_KEY: 'recipes',

    // Get all recipes from localStorage
    getRecipes() {
        try {
            const storedRecipes = localStorage.getItem(this.STORAGE_KEY);
            if (storedRecipes) {
                return JSON.parse(storedRecipes);
            }
        } catch (error) {
            console.error('Error loading recipes from localStorage:', error);
        }
        return null;
    },

    // Save recipes to localStorage
    saveRecipes(recipes) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recipes));
            return true;
        } catch (error) {
            console.error('Error saving recipes to localStorage:', error);
            return false;
        }
    },

    // Initialize with sample recipes if empty
    initializeSampleRecipes() {
        const sampleRecipes = [
            {
                id: Utils.generateId(),
                title: 'Classic Pancakes',
                description: 'Fluffy and delicious pancakes perfect for breakfast.',
                image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 10,
                cookTime: 15,
                difficulty: 'easy',
                dietType: 'veg',
                ingredients: [
                    '1 cup all-purpose flour',
                    '2 tablespoons sugar',
                    '2 teaspoons baking powder',
                    '1/2 teaspoon salt',
                    '1 cup milk',
                    '1 large egg',
                    '2 tablespoons melted butter'
                ],
                steps: [
                    'In a large bowl, mix flour, sugar, baking powder, and salt.',
                    'Make a well in the center and pour in milk, egg, and melted butter; mix until smooth.',
                    'Heat a lightly oiled griddle or frying pan over medium-high heat.',
                    'Pour the batter onto the griddle, using approximately 1/4 cup for each pancake.',
                    'Cook until bubbles form and the edges are dry, then flip and cook until browned on the other side.'
                ]
            },
            {
                id: Utils.generateId(),
                title: 'Spaghetti Carbonara',
                description: 'A classic Italian pasta dish with eggs, cheese, and pancetta.',
                image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 15,
                cookTime: 20,
                difficulty: 'medium',
                dietType: 'non-veg',
                ingredients: [
                    '400g spaghetti',
                    '200g pancetta or guanciale, diced',
                    '4 large eggs',
                    '100g Pecorino Romano cheese, grated',
                    '50g Parmesan cheese, grated',
                    '2 cloves garlic, minced',
                    'Black pepper to taste',
                    'Salt for pasta water'
                ],
                steps: [
                    'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
                    'While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy.',
                    'In a bowl, whisk eggs and both cheeses together.',
                    'Reserve 1 cup of pasta water before draining.',
                    'Working quickly, add hot pasta to the skillet with pancetta, remove from heat.',
                    'Add egg and cheese mixture, stirring constantly. Add pasta water as needed to create a creamy sauce.',
                    'Season with black pepper and serve immediately.'
                ]
            },
            {
                id: Utils.generateId(),
                title: 'Beef Wellington',
                description: 'An elegant dish featuring beef tenderloin wrapped in puff pastry.',
                image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 45,
                cookTime: 40,
                difficulty: 'hard',
                dietType: 'non-veg',
                ingredients: [
                    '1.5 kg beef tenderloin',
                    '2 tablespoons olive oil',
                    '500g mushrooms, finely chopped',
                    '8 slices prosciutto',
                    '500g puff pastry',
                    '2 tablespoons English mustard',
                    '2 egg yolks, beaten',
                    'Salt and pepper to taste'
                ],
                steps: [
                    'Season beef with salt and pepper. Heat oil in a pan and sear beef on all sides. Brush with mustard and let cool.',
                    'Cook mushrooms until all liquid has evaporated. Season and let cool.',
                    'Lay out plastic wrap, arrange prosciutto slices, then spread mushroom mixture over prosciutto.',
                    'Place beef in the center and wrap prosciutto and mushrooms around it using the plastic wrap. Chill for 15 minutes.',
                    'Roll out puff pastry, place beef in center, and wrap completely. Seal edges with egg wash.',
                    'Brush pastry with egg wash, score pattern if desired, and bake at 200°C for 35-40 minutes.',
                    'Rest for 10 minutes before slicing and serving.'
                ]
            },
            {
                id: Utils.generateId(),
                title: 'Mediterranean Quinoa Bowl',
                description: 'A healthy and vibrant bowl packed with Mediterranean flavors and protein-rich quinoa.',
                image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 20,
                cookTime: 15,
                difficulty: 'easy',
                dietType: 'veg',
                ingredients: [
                    '1 cup quinoa, rinsed',
                    '2 cups vegetable broth',
                    '1 cucumber, diced',
                    '1 cup cherry tomatoes, halved',
                    '1/2 red onion, finely chopped',
                    '1/2 cup Kalamata olives, pitted and sliced',
                    '1/2 cup feta cheese, crumbled',
                    '1/4 cup fresh parsley, chopped',
                    '2 tablespoons olive oil',
                    '1 lemon, juiced',
                    '1 teaspoon dried oregano',
                    'Salt and pepper to taste'
                ],
                steps: [
                    'Cook quinoa in vegetable broth according to package instructions. Fluff with a fork and let cool.',
                    'In a large bowl, combine cucumber, cherry tomatoes, red onion, and Kalamata olives.',
                    'Add the cooled quinoa to the vegetable mixture.',
                    'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper to make the dressing.',
                    'Pour dressing over the quinoa and vegetable mixture, tossing to combine.',
                    'Gently fold in crumbled feta cheese and fresh parsley.',
                    'Serve immediately or refrigerate for up to 2 days for flavors to meld.'
                ]
            },
            {
                id: Utils.generateId(),
                title: 'Thai Green Curry',
                description: 'Aromatic and spicy Thai green curry with coconut milk and fresh vegetables.',
                image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 15,
                cookTime: 25,
                difficulty: 'medium',
                dietType: 'non-veg',
                ingredients: [
                    '2 tablespoons green curry paste',
                    '1 can (400ml) coconut milk',
                    '1 lb chicken breast, sliced thin',
                    '1 eggplant, cubed',
                    '1 red bell pepper, sliced',
                    '1 cup bamboo shoots',
                    '2 kaffir lime leaves',
                    '1 tablespoon fish sauce',
                    '1 teaspoon palm sugar',
                    '1/4 cup Thai basil leaves',
                    '2 Thai chilies, sliced (optional)',
                    '2 tablespoons vegetable oil',
                    'Jasmine rice for serving'
                ],
                steps: [
                    'Heat oil in a large wok or pot over medium heat. Add green curry paste and cook for 1-2 minutes until fragrant.',
                    'Add thick coconut milk from the top of the can and stir to combine with the curry paste.',
                    'Add chicken slices and cook until they turn white on the outside.',
                    'Add remaining coconut milk, eggplant, bell pepper, bamboo shoots, and kaffir lime leaves.',
                    'Bring to a simmer and cook for 15-20 minutes until vegetables are tender and chicken is cooked through.',
                    'Season with fish sauce and palm sugar, adjusting to taste.',
                    'Remove from heat and stir in Thai basil leaves.',
                    'Garnish with sliced chilies if desired and serve hot with jasmine rice.'
                ]
            },
            {
                id: Utils.generateId(),
                title: 'Chocolate Lava Cake',
                description: 'Decadent individual chocolate cakes with a molten chocolate center.',
                image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                prepTime: 25,
                cookTime: 12,
                difficulty: 'medium',
                dietType: 'veg',
                ingredients: [
                    '4 ounces high-quality dark chocolate (70%)',
                    '1/2 cup unsalted butter',
                    '1 cup powdered sugar',
                    '2 large eggs',
                    '2 large egg yolks',
                    '1 teaspoon vanilla extract',
                    '1/4 cup all-purpose flour',
                    '1/4 teaspoon salt',
                    'Butter for ramekins',
                    'Cocoa powder for dusting',
                    'Vanilla ice cream for serving',
                    'Fresh berries for garnish'
                ],
                steps: [
                    'Preheat oven to 425°F (220°C). Butter 4 ramekins and dust with cocoa powder.',
                    'Melt chocolate and butter in a double boiler or microwave, stirring until smooth.',
                    'In a separate bowl, whisk together powdered sugar, eggs, egg yolks, and vanilla until pale and thick.',
                    'Fold the melted chocolate mixture into the egg mixture.',
                    'Sift in flour and salt, folding gently until just combined.',
                    'Divide batter evenly among prepared ramekins.',
                    'Bake for 12-14 minutes until edges are firm but centers are soft.',
                    'Let rest for 1 minute, then run a knife around edges and invert onto serving plates.',
                    'Serve immediately with vanilla ice cream and fresh berries.'
                ]
            }
        ];

        this.saveRecipes(sampleRecipes);
        return sampleRecipes;
    }
};