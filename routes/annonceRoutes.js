const mongoose = require('mongoose');
const Annonce = mongoose.model('annonces');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  
  
  /*
  Route pour recuperer tous les annonces
  */
 app.get('/api/getAllAnnonces', async (req, res) => {
    let allAnnonces = await Annonce.find();
    return res.status(200).send(allAnnonces);
  })

  /*
  Route pour enregistrer un annonce
  */
 app.post('/api/annonce', async (req, res) => {
    let annonce = await Annonce.create(req.body);
    return res.status(201).send({
      annonce
    })
  })

  app.delete('/api/annonce/:id', async (req, res) => {
    const {id} = req.params;
    let annonce = await Annonce.findByIdAndDelete(id);
    return res.status(202).send({
      annonce
    })
  })

}

