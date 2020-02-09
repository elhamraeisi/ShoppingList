const mongoose = require('mongoose');
const {Schema} = mongoose;

const annonceSchema = new Schema({
    title: String,
    description: String,
    price: String,
    utilisateur: String
})

mongoose.model('annonces', annonceSchema);