const mongoose = require('mongoose');
const {Schema} = mongoose;

const utilisateurSchema = new Schema({
    email: String,
    pass: String,
    firstName: String,
    lastName: String,
    age: Number
    
})

mongoose.model('utilisateurs', utilisateurSchema);