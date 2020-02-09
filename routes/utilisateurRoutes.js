const mongoose = require('mongoose');
const Utilisateur = mongoose.model('utilisateurs');
const Produit = mongoose.model('produits');

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
  Route pour recuperer tous les utilisateurs
  */
 app.get('/api/getAllUsers', async (req, res) => {
  let allUsers = await Utilisateur.find();
  return res.status(200).send(allUsers);
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
  //get userId and give a sentense
  function userInfoGenerator(kir){
    var text="Il s'appele " + kir.firstName +" "+ kir.lastName +" Il a "+ kir.age ;
    return text;
  }
  
  app.get('/api/getUserInfo/:id', async (req, res) => {
    const {id} = req.params;
    let kos = await Utilisateur.findById(id);
    return res.status(200).send(userInfoGenerator(kos));
      
    })

function ValidateEmail(utilisateur)
{
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(utilisateur.email.match(mailformat))
  {
  return "votre adresse mail est correct!";
  }
  else
  {
  return "votre adresse mail n'est pas correct!";
  }
}

app.get('/api/getUserEmail/:id', async (req, res) => {
  const {id} = req.params;
  let k = await Utilisateur.findById(id);
  return res.status(200).send(ValidateEmail(k));
    
  })

  app.get('/api/getUserProduct/:id', async (req, res) => {
    const {id} = req.params;
    let produits = await Produit.find().where('userId').equals(id);
    return res.status(201).send(
      produits
    )
  })
  
    app.get('/api/getUserByAge/:startAge/:endAge', async (req, res) => {
      const {startAge} = req.params;
      const {endAge} = req.params;
      let utilisateur = await Utilisateur.find().where('age').gt(startAge).lt(endAge);
      return res.status(201).send(
        utilisateur
      )
    })
    
  
}

