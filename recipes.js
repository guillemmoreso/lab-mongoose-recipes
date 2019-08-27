const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});

// Iteration 2 - Create a recipe
const Recipe = mongoose.model("Recipe", recipeSchema);
Recipe.create({
  title: "Tortilla Española",
  level: "Easy Peasy",
  ingredients: ["eggs", "potatoes", "olive oil"],
  cuisine: "Spanish",
  dishType: "Dinner",
  image: 'https://www.divinacocina.es/wp-content/uploads/tortilla-de-patatas-porcion-cortada.jpg'
  duration: 15,
  creator: "Bar Pepe"
})
  .then(recipe => {
    console.log("Recipe created: ", recipe.title);
  })
  .catch(err => {
    console.log("Error ", err);
  });

// Iteration 3 - Insert Many recipes
Recipe.insertMany(data)
  .then(() => {
    console.log("Recipes saved!");
  })

// Iteration 4 - Update recipe
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    console.log("Recipe has been updated");
  })

// Iteration 5 - Remove a recipe
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
    
// Iteration 6 - Close the Database
  .then(() => {
    console.log('Carrot Cake Deleted');
    mongoose.connection.close();
  })
  .catch(err => { console.log('error: ', err) })
