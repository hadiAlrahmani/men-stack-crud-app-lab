const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

// Here is where we import modules
// We begin by loading Express
const express = require("express");
const mongoose = require("mongoose"); // require package


const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URL);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
  
//! Models  
// Import the Plant model
const Plant = require("./models/plant.js");

//! Middleware
// This middleware code parses incoming request bodies, extracting form data and converting it into a JavaScript object...
app.use(express.urlencoded({ extended: false }));



//! ROUTES
// (routs path does not start with /)
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /plant/new
app.get("/plant/new", (req, res) => {
  // res.send("This route sends the user a form page!");
  res.render("plants/new.ejs")
});

// POST /Plants
app.post("/plants", async (req, res) => {
  console.log(req.body);
  await Plant.create(req.body);
  res.redirect("/plants");
});

// GET /plants
app.get("/plants", async (req, res) => {
  const allPlants = await Plant.find();
  // console.log(allPlants); // log the plants!
  // res.send("Welcome to the index page!");
  res.render("plants/index.ejs", {plants: allPlants})
});


//! LISTENER
app.listen(3000, () => {
  console.log("Listening on port 3000");
});