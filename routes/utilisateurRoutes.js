const mongoose = require('mongoose');
const Utilisateur = mongoose.model('utilisateurs');
const bcrypt = require('bcrypt');

module.exports = (app) => {

  /*
  Route pour authentifier un utilisateur
  */
  app.post('/api/connexion', async (req, res) => {

    utilisateur = await Utilisateur.findOne({ email: req.body.email })

    //verification du mot de passe
    if (utilisateur && await bcrypt.compare(req.body.pass, utilisateur.pass)) {
      return res.status(200).send(utilisateur);
    } else {
      return res.status(403).send(
        {
          error: "Email ou mot de passe incorrect"
        }
      );
    }

  })

  /*
  Route pour enregistrer un utilisateur
  */
  app.post('/api/inscription', async (req, res) => {
    utilisateurExist = await Utilisateur.findOne({ email: req.body.email })
    if (utilisateurExist) {
      return res.status(409).send({
        error: "Utilisateur existe déja"
      })
    } else {
      //chiffrer le mot de passe
      req.body.pass = await bcrypt.hash(req.body.pass, 10);
      let utilisateur = await Utilisateur.create(req.body);
      return res.status(201).send({
        utilisateur
      })
    }
  })
}