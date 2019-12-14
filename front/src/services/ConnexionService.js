import axios from 'axios';
import * as Constants from '../commun/Constants'
export default {

  /*
  Authentifier un utilisateur
  */
  connexion: async (data) => {
   return axios.post(Constants.API_ENDPOINT + 'connexion', data)
  },

  /*
  Enregistrer un utilisateur
  */
  inscription: async (data) => {
    return axios.post(Constants.API_ENDPOINT + 'inscription', data)

  },

}