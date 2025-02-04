
const mongoose = require("mongoose");

// Schema
const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
  })

// Model
  const Plant = mongoose.model('Plant', plantSchema)

// Exporting the model
module.exports = Plant;

