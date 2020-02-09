const mongoose = require('mongoose');
const {Schema} = mongoose;

const evenementSchema = new Schema({
    name: String,
    description: String,
    start: Date,
    end: Date
    
})

mongoose.model('evenements', evenementSchema);