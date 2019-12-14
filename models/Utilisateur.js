const mongoose = require('mongoose');
const {Schema} = mongoose;

const utilisateurSchema = new Schema({
    email: String,
    pass: String
})

mongoose.model('utilisateurs', utilisateurSchema);