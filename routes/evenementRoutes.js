const mongoose = require('mongoose');
const  EvenementDb= mongoose.model('evenements');

module.exports = (app) => {

    /*
  Route pour enregistrer un evenement
  */
 app.post('/api/evenement', async (req, res) => {
     req.body.start = new Date(req.body.start)
     req.body.end = new Date(req.body.end)

    let evenement = await EvenementDb.create(req.body);
    return res.status(201).send({
        evenement
    })
})
    /*
  Route pour recuperer tous les evenements
  */
 app.get('/api/getAllEvenement', async (req, res) => {
    let allEvenements = await EvenementDb.find();
    return res.status(200).send(allEvenements);
  })
  
  app.get('/api/getEvenementInfo/:id', async (req, res) => {
    const {id} = req.params;
    let evenement = await EvenementDb.findById(id);
    return res.status(202).send(
        evenement)

    })

    app.delete('/api/evenement/:id', async (req, res) => {
        const {id} = req.params;
        let evenement = await EvenementDb.findByIdAndDelete(id);
        return res.status(202).send(
            evenement)
    
        })
}

