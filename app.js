// ============================================
// RECIPE APP - PART 4 (SEARCH, FAVORITES & POLISH)
// ============================================
console.log("🍳 RecipeApp initializing...");

const RecipeApp = (() => {
    // ============================================
    // PRIVATE: RECIPE DATA
    // ============================================
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            category: "pasta",
            ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g Pecorino Romano cheese", "Black pepper"],
            steps: [
                "Bring a large pot of salted water to boil",
                "Add spaghetti and cook until al dente",
                {
                    text: "Prepare the sauce",
                    substeps: ["Dice pancetta into small pieces", "Fry pancetta until crispy", "Whisk eggs in a bowl with grated cheese"]
                },
                "Drain pasta, reserving 1 cup of pasta water",
                "Mix hot pasta with pancetta and drippings",
                "Remove from heat and quickly stir in egg mixture",
                "Add pasta water gradually until creamy",
                "Season with black pepper and serve immediately"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            category: "curry",
            ingredients: ["800g chicken breast", "1 cup yogurt", "2 tbsp tikka paste", "400ml coconut milk", "400g tomatoes", "2 onions", "4 garlic cloves", "Ginger", "Fresh cilantro"],
            steps: [
                "Cut chicken into bite-sized pieces",
                "Mix yogurt and tikka paste to marinate chicken for 30 minutes",
                "Heat oil in large pan and fry chicken until browned",
                {
                    text: "Prepare the sauce base",
                    substeps: [
                        "Sauté diced onions until golden",
                        "Add minced garlic and ginger",
                        "Cook for 2 minutes until fragrant"
                    ]
                },
                "Add tomatoes and cook for 5 minutes",
                "Stir in coconut milk and cooked chicken",
                "Simmer for 15 minutes until chicken is cooked through",
                "Finish with fresh cilantro and serve with rice"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
            category: "baking",
            ingredients: ["500g flour", "300g butter", "10g salt", "50g sugar", "7g instant yeast", "250ml milk", "1 egg yolk"],
            steps: [
                {
                    text: "Make the dough",
                    substeps: [
                        "Mix flour, salt, and sugar",
                        "Dissolve yeast in warm milk",
                        "Combine mixtures and knead until smooth"
                    ]
                },
                "Let dough rest for 1 hour",
                {
                    text: "Laminate with butter",
                    substeps: [
                        "Roll dough into large rectangle",
                        "Place cold butter in center",
                        "Fold dough to enclose butter",
                        "Roll and fold 4 times (book folds)"
                    ]
                },
                "Chill for 30 minutes between folds",
                "Shape dough into triangles for croissants",
                "Let rise for 2 hours until puffy",
                "Brush with egg wash",
                "Bake at 200°C for 25-30 minutes until golden"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
            category: "salad",
            ingredients: ["4 tomatoes", "1 cucumber", "1 red onion", "200g feta cheese", "150g kalamata olives", "3 tbsp olive oil", "1 tbsp red wine vinegar", "Oregano"],
            steps: [
                "Chop tomatoes into chunks",
                "Dice cucumber into bite-sized pieces",
                "Thinly slice red onion",
                "Crumble feta cheese into large pieces",
                "Combine all vegetables in a large bowl",
                "Add olives and toss gently",
                "Drizzle with olive oil and vinegar",
                "Season with oregano, salt, and pepper",
                "Toss and serve immediately"
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
            category: "meat",
            ingredients: ["1kg beef fillet", "500g mushrooms", "2 shallots", "400g puff pastry", "200g pâté", "2 tbsp olive oil", "Thyme", "Egg yolk"],
            steps: [
                {
                    text: "Prepare the beef",
                    substeps: [
                        "Sear beef on all sides until brown",
                        "Brush with mustard",
                        "Cool to room temperature"
                    ]
                },
                {
                    text: "Make mushroom duxelles",
                    substeps: [
                        "Finely chop mushrooms and shallots",
                        "Sauté until moisture evaporates",
                        "Season and cool completely"
                    ]
                },
                "Spread duxelles over beef",
                "Wrap beef with prosciutto",
                "Roll in puff pastry with pâté layer",
                "Brush with egg wash",
                "Bake at 200°C for 25 minutes until golden",
                "Rest for 5 minutes before slicing"
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
            category: "vegetarian",
            ingredients: ["2 cups broccoli", "1 bell pepper", "1 cup snap peas", "200g mushrooms", "3 garlic cloves", "2 tbsp soy sauce", "1 tbsp sesame oil", "Ginger", "Rice"],
            steps: [
                "Prepare all vegetables by cutting into uniform pieces",
                "Mince garlic and ginger",
                "Heat sesame oil in a wok or large pan over high heat",
                "Stir-fry harder vegetables first (broccoli, carrots)",
                "Add softer vegetables and stir continuously",
                "Add garlic and ginger for 1 minute",
                "Pour in soy sauce and toss well",
                "Cook for 2-3 minutes until vegetables are tender-crisp",
                "Serve immediately over steamed rice"
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
            category: "noodles",
            ingredients: ["300g rice noodles", "300g shrimp", "2 eggs", "2 cups bean sprouts", "3 scallions", "3 tbsp tamarind paste", "2 tbsp fish sauce", "2 tbsp brown sugar", "Peanuts", "Lime"],
            steps: [
                "Soak rice noodles in room temperature water for 30 minutes until pliable",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Mix tamarind paste with fish sauce",
                        "Add brown sugar and stir until dissolved",
                        "Set aside sauce"
                    ]
                },
                "Heat oil in a wok over medium-high heat",
                "Stir-fry shrimp until pink, then push aside",
                "Scramble eggs in the pan",
                "Add drained noodles and sauce, toss well",
                "Add bean sprouts and scallions, toss for 1 minute",
                "Serve topped with crushed peanuts and lime wedge"
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
            category: "pizza",
            ingredients: ["500g pizza dough", "400g tomatoes", "300g fresh mozzarella", "Fresh basil", "3 tbsp olive oil", "2 garlic cloves", "Salt", "Oregano"],
            steps: [
                "Preheat oven to 250°C (or as hot as possible)",
                "Stretch or roll pizza dough into desired thickness",
                "Place dough on pizza stone or baking sheet",
                {
                    text: "Prepare the tomato base",
                    substeps: [
                        "Mash or crush canned tomatoes",
                        "Mix with minced garlic and olive oil",
                        "Season with salt and oregano"
                    ]
                },
                "Spread tomato sauce evenly on dough",
                "Tear mozzarella into chunks and distribute over sauce",
                "Drizzle lightly with olive oil",
                "Bake for 12-15 minutes until crust is golden and cheese melts",
                "Top with fresh basil leaves immediately after removing from oven",
                "Slice and serve hot"
            ]
        }
    ];

    // ============================================
    // PRIVATE: STATE MANAGEMENT
    // ============================================
    let currentFilter = 'all';
    let currentSort = 'none';
    let searchQuery = ''; // Part 4: Search query state
    let favorites = []; // Part 4: Load favorites from localStorage on init
    let debounceTimer = null; // Part 4: Prevents search on every keystroke

    // ============================================
    // PRIVATE: DOM SELECTION
    // ============================================
    let recipeContainer = null;
    let filterButtons = null;
    let sortButtons = null;
    let searchInput = null;
    let clearSearchBtn = null;
    let recipeCounter = null;

    // Function to initialize DOM references
    const initializeDOMElements = () => {
        recipeContainer = document.querySelector('#recipe-container');
        filterButtons = document.querySelectorAll('.filter-btn');
        sortButtons = document.querySelectorAll('.sort-btn');
        searchInput = document.querySelector('#search-input');
        clearSearchBtn = document.querySelector('#clear-search-btn');
        recipeCounter = document.querySelector('#recipe-counter');
    };

    // ============================================
    // PRIVATE: PURE FILTER FUNCTIONS
    // ============================================

    /**
     * Filter recipes by difficulty level
     * @param {Array} recipeList - Array of recipe objects
     * @param {String} filterType - 'easy', 'medium', 'hard', or 'all'
     * @returns {Array} - New array with filtered recipes
     */
    const filterByDifficulty = (recipeList, filterType) => {
        switch(filterType) {
            case 'easy':
                return recipeList.filter(recipe => recipe.difficulty === 'easy');
            case 'medium':
                return recipeList.filter(recipe => recipe.difficulty === 'medium');
            case 'hard':
                return recipeList.filter(recipe => recipe.difficulty === 'hard');
            case 'all':
            default:
                return recipeList;
        }
    };

    /**
     * Filter recipes by cooking time
     * @param {Array} recipeList - Array of recipe objects
     * @param {Number} maxTime - Maximum cooking time in minutes
     * @returns {Array} - New array with recipes under maxTime
     */
    const filterByTime = (recipeList, maxTime) => {
        return recipeList.filter(recipe => recipe.time < maxTime);
    };

    /**
     * Apply the appropriate filter based on current filter type
     * @param {Array} recipeList - Array of recipe objects
     * @param {String} filterType - Type of filter to apply
     * @returns {Array} - Filtered recipes
     */
    const applyFilter = (recipeList, filterType) => {
        if (filterType === 'quick') {
            return filterByTime(recipeList, 30);
        }
        if (filterType === 'favorites') { // Part 4: Favorites filter
            return filterByFavorites(recipeList);
        }
        return filterByDifficulty(recipeList, filterType);
    };

    // ============================================
    // PRIVATE: SEARCH FILTER FUNCTION (Part 4)
    // ============================================

    /**
     * Filter recipes by search query (title or ingredients)
     * @param {Array} recipeList - Array of recipe objects
     * @param {String} query - Search query string
     * @returns {Array} - Filtered recipes
     */
    const filterBySearch = (recipeList, query) => {
        if (!query || query.trim().length === 0) {
            return recipeList;
        }

        const lowerQuery = query.toLowerCase().trim();

        return recipeList.filter(recipe => {
            // Search in title (case-insensitive)
            const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);

            // Search in ingredients using .some()
            const ingredientMatch = recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(lowerQuery)
            );

            // Search in description (case-insensitive)
            const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);

            // Return true if any match is found
            return titleMatch || ingredientMatch || descriptionMatch;
        });
    };

    // ============================================
    // PRIVATE: FAVORITES FILTER FUNCTION (Part 4)
    // ============================================

    /**
     * Filter recipes to show only favorited ones
     * @param {Array} recipeList - Array of recipe objects
     * @returns {Array} - Only favorited recipes
     */
    const filterByFavorites = (recipeList) => {
        return recipeList.filter(recipe => favorites.includes(recipe.id));
    };

    // ============================================
    // PRIVATE: PURE SORT FUNCTIONS
    // ============================================

    /**
     * Sort recipes alphabetically by title
     * @param {Array} recipeList - Array of recipe objects
     * @returns {Array} - New sorted array
     */
    const sortByName = (recipeList) => {
        return [...recipeList].sort((a, b) => a.title.localeCompare(b.title));
    };

    /**
     * Sort recipes by cooking time (fastest first)
     * @param {Array} recipeList - Array of recipe objects
     * @returns {Array} - New sorted array
     */
    const sortByTime = (recipeList) => {
        return [...recipeList].sort((a, b) => a.time - b.time);
    };

    /**
     * Apply the appropriate sort based on current sort type
     * @param {Array} recipeList - Array of recipe objects
     * @param {String} sortType - Type of sort to apply ('none', 'name', 'time')
     * @returns {Array} - Sorted recipes
     */
    const applySort = (recipeList, sortType) => {
        switch(sortType) {
            case 'name':
                return sortByName(recipeList);
            case 'time':
                return sortByTime(recipeList);
            case 'none':
            default:
                return recipeList;
        }
    };

    // ============================================
    // PRIVATE: RECURSIVE STEP RENDERING
    // ============================================

    /**
     * Recursively render steps and substeps
     * Handles any level of nesting
     * @param {Array} steps - Array of steps (strings or objects with substeps)
     * @param {Number} level - Current nesting level (default 0)
     * @returns {String} - HTML string for all steps
     */
    const renderSteps = (steps, level = 0) => {
        return steps.map((step, index) => {
            // If step is a string, just render it
            if (typeof step === 'string') {
                const prefix = level === 0 ? `${index + 1}.` : '→';
                const indentClass = `step-level-${level}`;
                return `<li class="step-item ${indentClass}"><strong>${prefix}</strong> ${step}</li>`;
            }

            // If step is an object with substeps, render it and recurse
            if (step.substeps && Array.isArray(step.substeps)) {
                const prefix = level === 0 ? `${index + 1}.` : '→';
                const indentClass = `step-level-${level}`;
                const substepsHTML = renderSteps(step.substeps, level + 1).join('');
                
                return `
                    <li class="step-item ${indentClass}">
                        <strong>${prefix}</strong> ${step.text}
                        <ul class="substeps-list">
                            ${substepsHTML}
                        </ul>
                    </li>
                `;
            }

            return '';
        }).filter(html => html !== '');
    };

    /**
     * Create steps HTML wrapper with proper formatting
     * @param {Array} steps - Array of recipe steps
     * @returns {String} - HTML string for steps section
     */
    const createStepsHTML = (steps) => {
        if (!steps || steps.length === 0) return '<p>No steps available</p>';
        const stepsHTML = renderSteps(steps).join('');
        return `<ol class="steps-list">${stepsHTML}</ol>`;
    };

    /**
     * Create ingredients HTML list
     * @param {Array} ingredients - Array of ingredients
     * @returns {String} - HTML string for ingredients section
     */
    const createIngredientsHTML = (ingredients) => {
        if (!ingredients || ingredients.length === 0) return '<p>No ingredients available</p>';
        const ingredientsHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');
        return `<ul class="ingredients-list">${ingredientsHTML}</ul>`;
    };

    // ============================================
    // PRIVATE: VIEW/RENDER FUNCTIONS
    // ============================================

    /**
     * Create HTML for one recipe card with toggle buttons
     * @param {Object} recipe - Recipe object
     * @returns {String} - HTML string for recipe card
     */
    const createRecipeCard = (recipe) => {
        const isFavorited = favorites.includes(recipe.id); // Part 4: Check if recipe is favorited
        const favoriteClass = isFavorited ? 'favorited' : ''; // Part 4: Add class if favorited
        const favoriteEmoji = isFavorited ? '❤️' : '🤍'; // Part 4: Show filled or empty heart

        return `
            <div class="recipe-card" data-id="${recipe.id}">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${recipe.time} min</span>
                    <span class="difficulty ${recipe.difficulty}">
                        ${recipe.difficulty}
                    </span>
                </div>
                <p>${recipe.description}</p>

                <!-- Toggle Buttons -->
                <div class="recipe-actions">
                    <!-- Part 4: Favorite Button -->
                    <button 
                        class="favorite-btn ${favoriteClass}" 
                        data-recipe-id="${recipe.id}"
                        title="Add to favorites"
                    >
                        ${favoriteEmoji}
                    </button>

                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                        Show Steps
                    </button>
                    <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                        Show Ingredients
                    </button>
                </div>

                <!-- Steps Container (Hidden by default) -->
                <div class="steps-container" data-recipe-id="${recipe.id}" data-type="steps">
                    <h4>Cooking Steps:</h4>
                    ${createStepsHTML(recipe.steps)}
                </div>

                <!-- Ingredients Container (Hidden by default) -->
                <div class="ingredients-container" data-recipe-id="${recipe.id}" data-type="ingredients">
                    <h4>Ingredients:</h4>
                    ${createIngredientsHTML(recipe.ingredients)}
                </div>
            </div>
        `;
    };

    /**
     * Render recipes to the DOM
     * @param {Array} recipesToRender - Array of recipes to display
     */
    const renderRecipes = (recipesToRender) => {
        const allCardsHTML = recipesToRender
            .map(createRecipeCard)
            .join('');

        recipeContainer.innerHTML = allCardsHTML;
    };

    // ============================================
    // PRIVATE: RECIPE COUNTER FUNCTION (Part 4)
    // ============================================

    /**
     * Update recipe counter display
     * @param {Number} shown - Number of recipes shown
     * @param {Number} total - Total number of recipes
     */
    const updateRecipeCounter = (shown, total) => {
        if (recipeCounter) {
            recipeCounter.textContent = `Showing ${shown} of ${total} recipes`;
        }
    };

    // ============================================
    // PRIVATE: UI UPDATE FUNCTIONS
    // ============================================

    /**
     * Main function to update display with filtered and sorted recipes
     * Combines filter and sort operations, then renders to screen
     */
    const updateDisplay = () => {
        let recipesToDisplay = [...recipes];
        
        // Part 4: Apply search first (narrows results)
        recipesToDisplay = filterBySearch(recipesToDisplay, searchQuery);
        
        // Apply filter (further narrows)
        recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
        
        // Apply sort (reorders)
        recipesToDisplay = applySort(recipesToDisplay, currentSort);
        
        // Render to screen
        renderRecipes(recipesToDisplay);
        
        // Part 4: Update recipe counter
        updateRecipeCounter(recipesToDisplay.length, recipes.length);
        
        // Update button states
        updateActiveButtons();
        
        // Re-attach event listeners (important after re-rendering)
        setupToggleListeners();
        setupFavoriteListeners(); // Part 4: Re-attach favorite listeners
        
        // Log current state (for debugging)
        console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort}, Search: "${searchQuery}")`);
    };

    /**
     * Update which buttons appear active based on current filter/sort state
     */
    const updateActiveButtons = () => {
        // Update filter buttons
        if (filterButtons && filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === currentFilter) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Update sort buttons
        if (sortButtons && sortButtons.length > 0) {
            sortButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.sort === currentSort) {
                    btn.classList.add('active');
                }
            });
        }
    };

    // ============================================
    // PRIVATE: FAVORITES MANAGEMENT (Part 4)
    // ============================================

    /**
     * Save favorites to localStorage
     * Stores favorites array as JSON string
     */
    const saveFavorites = () => {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
        console.log('Favorites saved to localStorage:', favorites);
    };

    /**
     * Load favorites from localStorage
     * @returns {Array} - Array of favorited recipe IDs
     */
    const loadFavorites = () => {
        const saved = localStorage.getItem('recipeFavorites');
        return saved ? JSON.parse(saved) : [];
    };

    /**
     * Toggle favorite status for a recipe
     * @param {Number} recipeId - ID of the recipe to toggle
     */
    const toggleFavorite = (recipeId) => {
        if (favorites.includes(recipeId)) {
            // Remove from favorites
            favorites = favorites.filter(id => id !== recipeId);
            console.log(`Removed recipe ${recipeId} from favorites`);
        } else {
            // Add to favorites
            favorites.push(recipeId);
            console.log(`Added recipe ${recipeId} to favorites`);
        }
        
        // Save to localStorage
        saveFavorites();
        
        // Refresh display to update heart icons and counter
        updateDisplay();
    };

    // ============================================
    // PRIVATE: EVENT HANDLERS
    // ============================================

    /**
     * Handle filter button clicks
     * @param {Event} event - Click event from filter button
     */
    const handleFilterClick = (event) => {
        currentFilter = event.target.dataset.filter;
        updateDisplay();
    };

    /**
     * Handle sort button clicks
     * @param {Event} event - Click event from sort button
     */
    const handleSortClick = (event) => {
        currentSort = event.target.dataset.sort;
        updateDisplay();
    };

    /**
     * Handle toggle button clicks using event delegation
     * @param {Event} event - Click event from recipe container
     */
    const handleToggleClick = (event) => {
        // Check if clicked element is a toggle button
        if (!event.target.classList.contains('toggle-btn')) {
            return;
        }

        const button = event.target;
        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        // Find the corresponding container
        const container = recipeContainer.querySelector(
            `[data-recipe-id="${recipeId}"][data-type="${toggleType}"]`
        );

        if (!container) {
            console.error(`Container not found for recipe ${recipeId} type ${toggleType}`);
            return;
        }

        // Toggle visibility
        container.classList.toggle('visible');

        // Update button text
        const isVisible = container.classList.contains('visible');
        const action = isVisible ? 'Hide' : 'Show';
        const label = toggleType.charAt(0).toUpperCase() + toggleType.slice(1);
        button.textContent = `${action} ${label}`;

        console.log(`Toggled ${toggleType} for recipe ${recipeId}: ${isVisible ? 'shown' : 'hidden'}`);
    };

    // ============================================
    // PRIVATE: SEARCH & FAVORITES EVENT HANDLERS (Part 4)
    // ============================================

    /**
     * Handle search input with debouncing (300ms delay)
     * Updates search query only after user stops typing
     * @param {Event} event - Input event from search input
     */
    const handleSearch = (event) => {
        // Clear the previous timer
        clearTimeout(debounceTimer);
        
        // Set new timer for debounced search
        debounceTimer = setTimeout(() => {
            searchQuery = event.target.value;
            
            // Show/hide clear button based on search content
            if (searchQuery.trim().length > 0) {
                clearSearchBtn.style.display = 'inline-block';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            
            // Update display with search results
            updateDisplay();
            
            console.log(`Search executed: "${searchQuery}"`);
        }, 300); // 300ms delay for debouncing
    };

    /**
     * Handle clear search button click
     * Resets search input and display
     */
    const handleClearSearch = () => {
        searchQuery = '';
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        updateDisplay();
        searchInput.focus();
        console.log('Search cleared');
    };

    /**
     * Handle favorite button clicks using event delegation
     * @param {Event} event - Click event from recipe container
     */
    const handleFavoriteClick = (event) => {
        if (!event.target.classList.contains('favorite-btn')) {
            return;
        }

        const recipeId = parseInt(event.target.dataset.recipeId);
        toggleFavorite(recipeId);
    };

    /**
     * Setup favorite button listeners with event delegation
     */
    const setupFavoriteListeners = () => {
        recipeContainer.removeEventListener('click', handleFavoriteClick);
        recipeContainer.addEventListener('click', handleFavoriteClick);
    };

    // ============================================
    // PRIVATE: EVENT LISTENER SETUP
    // ============================================

    /**
     * Attach click event listeners to filter and sort buttons
     */
    const setupMainListeners = () => {
        console.log("Setting up main listeners...");
        console.log("Filter buttons:", filterButtons);
        console.log("Sort buttons:", sortButtons);
        
        if (filterButtons && filterButtons.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', handleFilterClick);
            });
            console.log(`Attached click listeners to ${filterButtons.length} filter buttons`);
        } else {
            console.error("No filter buttons found!");
        }
        
        if (sortButtons && sortButtons.length > 0) {
            sortButtons.forEach(btn => {
                btn.addEventListener('click', handleSortClick);
            });
            console.log(`Attached click listeners to ${sortButtons.length} sort buttons`);
        } else {
            console.error("No sort buttons found!");
        }
        
        // Part 4: Search event listeners
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            console.log("Attached input listener to search input");
        }
        
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', handleClearSearch);
            console.log("Attached click listener to clear button");
        }
        
        console.log("Event listeners attached!");
    };

    /**
     * Attach toggle event listener using event delegation
     * This works even if cards are re-rendered
     */
    const setupToggleListeners = () => {
        // Remove old listener if exists
        recipeContainer.removeEventListener('click', handleToggleClick);
        
        // Add new listener with event delegation
        recipeContainer.addEventListener('click', handleToggleClick);
    };

    // ============================================
    // PUBLIC API
    // ============================================

    return {
        /**
         * Initialize the app
         * Call this once when DOM is ready
         */
        init: () => {
            console.log("🍳 RecipeApp initializing...");
            initializeDOMElements(); // Initialize DOM references first
            favorites = loadFavorites(); // Part 4: Load favorites at init
            setupMainListeners();
            updateDisplay();
            console.log("✅ RecipeApp ready! Loaded favorites:", favorites);
        },

        /**
         * Public update display method (for external access if needed)
         */
        updateDisplay: updateDisplay,

        /**
         * Get current recipes (read-only clone)
         */
        getRecipes: () => [...recipes]
    };
})();

// ============================================
// INITIALIZATION
// ============================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    RecipeApp.init();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        RecipeApp.init();
    });
} else {
    RecipeApp.init();
}
