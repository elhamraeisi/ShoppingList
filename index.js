const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
require('./models/Produit');

const MONGODB_URL= 'mongodb://localhost:27017/shopping-list'
const PORT = 5000;

const app = express();
app.use(cors())

//initialisation de la base de données MongoDb
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL);

app.use(bodyParser.json());

//importation des routes
require('./routes/produitRoutes')(app);

//demarrage du serveur
app.listen(PORT, () => {
  console.log('Le serveur est demarré sur le port ',PORT)
});