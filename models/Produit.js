const mongoose = require('mongoose');
const {Schema} = mongoose;

const produitSchema = new Schema({
    nom: String,
    description: String,
    prix: Number,
    quantite: Number
})

mongoose.model('produits', produitSchema);