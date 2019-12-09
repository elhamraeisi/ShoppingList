const mongoose = require('mongoose');
const Produit = mongoose.model('produits');

module.exports = (app) => {

  /*
  Route pour recuperer tous les produits
  */
  app.get('/api/produit', async (req, res) => {
    let produits = await Produit.find();
    return res.status(200).send(produits);
  })

  /*
  Route pour enregistrer un produit
  */
  app.post('/api/produit', async (req, res) => {
    let produit = await Produit.create(req.body);
    return res.status(201).send({
      produit
    })
  })

  /*
  Route pour modifier un produit par id
  */
  app.put('/api/produit/:id', async (req, res) => {
    const {id} = req.params;
    let produit = await Produit.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      produit
    })
  })

  /*
  Route pour supprimer un produit par id
  */
  app.delete('/api/produit/:id', async (req, res) => {
    const {id} = req.params;
    let produit = await Produit.findByIdAndDelete(id);
    return res.status(202).send({
      produit
    })
  })

  
}