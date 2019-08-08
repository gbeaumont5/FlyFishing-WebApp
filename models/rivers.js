const mongoose = require('mongoose');


const riverSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    fish_species: String,
    hatches: String,
    stocked: Boolean,
    stocking_number: Number,
    comments: [String]
})

const River = mongoose.model('River', riverSchema)

module.exports = River;

