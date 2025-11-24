I'll add the vegetarian/non-vegetarian mode feature to the README.md:

## Updated README.md

````markdown
# Recipe Manager

A sophisticated, modern web application for managing your personal recipe collection. Built with vanilla JavaScript featuring a beautiful red, black, white, and gold theme with vegetarian/non-vegetarian filtering.

## 🚀 Live Demo

[Add your deployment link here]

## 📸 Screenshots

[Add screenshots of your application]

## ✨ Features

- **📖 Recipe Management**: Full CRUD operations for your recipes
- **🥗 Diet Filtering**: Switch between All, Vegetarian, and Non-Vegetarian modes
- **🎨 Modern Design**: Beautiful red, black, white, and gold color scheme
- **🔍 Smart Search**: Find recipes by title, ingredients, or description
- **⚡ Local Storage**: All data saved locally in your browser
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile
- **🎯 Easy Filtering**: Filter by difficulty level, preparation time, and diet type
- **✅ Form Validation**: Client-side validation with helpful error messages
- **🖼️ Image Support**: Add recipe images via URL
- **📋 Dynamic Lists**: Easy ingredient and step management
- **🏷️ Visual Diet Badges**: Color-coded vegetarian/non-vegetarian indicators

## 🛠️ Tech Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser localStorage
- **Architecture**: Modular JavaScript with ES6 modules
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Emoji-based icons for cross-platform compatibility

## 🎯 Key Components

### Views

- **Home**: Recipe grid with search, diet mode, and filters
- **Recipe Detail**: Full recipe view with edit/delete options
- **Add/Edit Form**: Comprehensive form with validation including diet type

### Diet Modes

- **All Recipes**: View all recipes regardless of diet type
- **Vegetarian**: Filter to show only vegetarian recipes (green badges)
- **Non-Vegetarian**: Filter to show only non-vegetarian recipes (red badges)

### Sample Recipes Included

- Classic Pancakes 🥞 (Vegetarian)
- Spaghetti Carbonara 🍝 (Non-Vegetarian)
- Beef Wellington 🥩 (Non-Vegetarian)
- Mediterranean Quinoa Bowl 🥗 (Vegetarian)
- Thai Green Curry 🍛 (Non-Vegetarian)
- Chocolate Lava Cake 🍫 (Vegetarian)

## 🚀 Quick Start

### Option 1: Direct File Opening

```bash
# Clone the repository
git clone https://github.com/yourusername/recipe-manager.git

# Open index.html in your browser
open index.html
```
````

### Option 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
recipe-manager/
├── index.html              # Main application entry point
├── css/
│   └── style.css          # Complete styling with custom theme
├── js/
│   ├── app.js             # Main application initialization
│   ├── storage.js         # localStorage management
│   ├── recipes.js         # Recipe data operations
│   ├── ui.js              # User interface rendering
│   └── utils.js           # Utility functions
└── README.md              # Project documentation
```

## 💾 Data Storage

All recipes are stored locally in your browser's localStorage using this structure:

```javascript
{
  id: "unique-id",
  title: "Recipe Name",
  description: "Recipe description",
  image: "optional-image-url",
  prepTime: 30,
  cookTime: 45,
  difficulty: "easy|medium|hard",
  dietType: "veg|non-veg",  // Vegetarian/Non-Vegetarian classification
  ingredients: ["ingredient 1", "ingredient 2"],
  steps: ["step 1", "step 2"]
}
```

## 🥗 Diet Classification System

### Vegetarian (Green Badge)

- Contains no meat, poultry, or fish
- May include dairy products and eggs
- Examples: Pancakes, Quinoa Bowls, Desserts

### Non-Vegetarian (Red Badge)

- Contains meat, poultry, or fish
- Examples: Beef dishes, Chicken curry, Pork pasta

### Visual Indicators

- **Green Badge**: 🟢 Vegetarian recipes
- **Red Badge**: 🔴 Non-vegetarian recipes
- **Toggle Buttons**: Easy switching between diet modes
- **Form Selection**: Required field when adding recipes

## 🎨 Design Highlights

- **Color Scheme**: Premium red (#B22222), black, white, and gold (#FFD700)
- **Diet Colors**: Green (#00C853) for vegetarian, Red (#B22222) for non-vegetarian
- **Typography**: Clean, modern fonts with excellent readability
- **Animations**: Smooth transitions and hover effects
- **Layout**: Responsive grid that adapts to all screen sizes
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔧 Browser Support

- ✅ Chrome 61+
- ✅ Firefox 60+
- ✅ Safari 11+
- ✅ Edge 79+

## 🆕 Recent Features

### Vegetarian/Non-Vegetarian Mode

- **Diet Filter Toggle**: Quick switching between all, vegetarian, and non-vegetarian recipes
- **Visual Badges**: Color-coded indicators on recipe cards
- **Form Integration**: Required diet type selection when creating recipes
- **Search Integration**: Works alongside existing search and filter functionality
- **Sample Data**: All sample recipes properly classified

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - Feel free to use and modify for personal or educational purposes.

---

_This Recipe Manager demonstrates modern vanilla JavaScript development practices with a focus on user experience, dietary preferences, and responsive design. The vegetarian/non-vegetarian filtering makes it easy for users to find recipes that match their dietary needs._

```

## Key Additions to README:

1. **Features Section**: Added diet filtering as a main feature
2. **Diet Modes Section**: Detailed explanation of the three diet modes
3. **Sample Recipes**: Updated to show diet classifications
4. **Data Storage**: Added `dietType` field to the schema
5. **Diet Classification System**: New section explaining the vegetarian/non-vegetarian system
6. **Visual Indicators**: Description of the color-coded badge system
7. **Design Highlights**: Added diet-specific color information
8. **Recent Features**: Highlighted the new vegetarian/non-vegetarian functionality

The README now comprehensively documents the new diet filtering feature while maintaining all the existing information about the application.
```
