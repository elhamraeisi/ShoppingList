import axios from 'axios';
import * as Constants from '../commun/Constants'
export default {
  
  /*
  Renvoie tous les produits existants en base de données
  */
  recupererTousProduits: async () => {
    let res = await axios.get(Constants.API_ENDPOINT + 'produit');
    return res.data;
  },

  /*
  Enregistrer un produit
  */
  enregistrerProduit: async (produit) => {
    let res = await axios.post(Constants.API_ENDPOINT +'produit',{
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      quantite: produit.quantite
    });
    return res.data;
  },
  /*
  Modifier un produit
  */
  modifierProduit: async (produit,id) => {
    let res = await axios.put(Constants.API_ENDPOINT +'produit/' + id,{
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      quantite: produit.quantite
    });
    return res.data;
  },
  /*
  Supprimer un produit par Id
  */
  supprimerProduitParId: async (id) => {
    let res = await axios.delete(Constants.API_ENDPOINT +'produit/' + id);
    return res.data;
  }

}