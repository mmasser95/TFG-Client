import axios from 'axios';
import { alertController } from '@ionic/vue';
import { useLoginStore } from '../store/loginStore';
import { CallbackFunction } from '../types';
// const base_url = 'http://192.168.1.26:5000/api/v1';
const base_url = 'https://app.flyfood.online/api/v1';

const createErrorAlert = (message: string, status: string) =>
  alertController.create({
    header: `Error de la petició al servidor amb codi ${status}`,
    subHeader: "El missatge d'error és: ",
    message: message,
    buttons: ['Ok'],
  });

/** Instancia d'axios utilitzada en totes les peticions amb la configuració  inicial*/
export const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
});

/** Funció que automàticament crea un wrapper a una altra funció que realitza una petició. 
 * I en el cas de que hi haigui retorna l'error com a parametre a la callback function.
 * En cas de resposta satisfactoria retorna les dades pel parametre data 
 * @param fn Funció d'axios que s'executarà
 * @param cb Funció de callback que s'executarà després de la petició
 * @param ...options Paràmetres extra de la funció d'Axios
 * @returns
 * */
export const axiosWrapper = (
  fn: Function,
  cb: CallbackFunction,
  ...options: any
) => {
  fn(...options)
    .then((response: any) => {
      /** Aquí es produeix una resposta satisfactòria i es crida a la funcio amb les dades resultat */
      cb(null, response.data);
    })
    .catch(async (error: any) => {
      if (error.response) {
        /** La request s'ha fet pero s'ha obtingut un status diferent a 2xx 
         * Es mostren els errors per consola
        */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        /** Es crida la callback amb l'error */
        cb({
          status: error.response.status,
          message: error.response.data,
        });
        /** Es mostra una alerta automàticament  en cas d'una resposta 401 o 400
         * Error de token o error de validació.
        */
        if (error.response.status == 401 || error.response.status == 400) {
          let alert = await createErrorAlert(
            error.response.data.message,
            error.response.status
          );
          alert.present();
        }
        /** En cas de que sigui error 500, es tracta d'un error del servidor.
         *  i es mostra un error per consola per a depurar. */
        if (error.response.status == 500) {
          console.log(
            `Error status: ${error.response.status} Error message: ${error.response.data.message}`
          );
        }
      } else if (error.request) {
        // La request s'ha fet pero no s'obté resposta
        console.log(error.request);
        let alert = await createErrorAlert(
          'No response',
          "No s'obté resposta del servidor. Torna-ho a provar més tard"
        );
        alert.present();
        cb({
          status: 'No response',
          message: 'No response received',
          request: error.request,
        });
      } else {
        console.log('Error', error.message);

        cb({
          status: 'General error',
          message: `No response received ${error.message}`,
        });
      }
      console.log(error.config);
      cb({
        status: 'General error',
        message: 'No response received',
        config: error.config,
      });
    });
};

/** Funció  que automàticament crea el header d'autenticació necessari,
 *  per a utilitzar certes rutes de la API. Aquesta funció automàticament,
 *  agafa el token de la store de Pinia.js 
*/
export const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
    },
  };
};

/** Funció que genera automàticament el header d'autenticació i ademes codifica
 * el body en mode form-data, per a poder enviar fotografies a la API
 */
export const getMultiPartHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
      'Content-Type': 'multipart/form-data',
    },
  };
};

/**
 * Funci
 * @param carrer Carrer de l'adreça
 * @param numero Numero de l'adreça
 * @param city Ciutat de l'adreça
 * @param provincia Provincia de l'adreça
 * @param CP Codi postal de l'adreça
 * @returns {
 *  latitude:number,
 *  longitude:number
 * } | null
 */
export async function getCoordinates(
  carrer: String,
  numero: number,
  city: String,
  provincia: String,
  CP: number
): Promise<false | { latitude: number; longitude: number; } | null> {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          format: 'json',
          street: `${carrer} ${numero}`,
          city,
          county: provincia,
          country: 'Spain',
          postalcode: CP,
        },
      }
    );
    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      return false;
    }
  } catch (error) {
    console.log('error :>> ', error);
    return null;
  }
}
/**
 * Aquesta funció realitza la petició a la API 
 * my-ip.io per a obtenir les coordenades de la IP
 * @param cb Funció de callback
 * @returns void
 */
export const doIPLocation = (cb: CallbackFunction) =>
  axiosWrapper(axios.get, cb, 'https://api.my-ip.io/v2/ip.json');

/**
 * Aquesta funció verifica el token emmagatzemat al localStorage
 * @param cb Funció de callback
 * @returns 
 */
export const verificarToken = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/verificar`, getHeaders());


//Firebase
/**
 * Aquesta funció envia el token obtingut de Google, 
 * per a afegir el dispositiu a l'usuari i que el dispositiu
 * pugui rebre les notificacions de l'usuari
 * @param token Token obtingut en la petició a Google
 * @param cb Funció de callback
 * @returns 
 */
export const sendFirebaseToken = (token: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/fcm`, { mode: 'add', token }, getHeaders());

/**
 * En cas de que un usuari tanqui sessió, s'envia una petició per
 * a eliminar el token del perfil de l'usuari
 * @param token Token a eliminar
 * @param cb Funció de callback
 * @returns 
 */
export const deleteFirebaseToken = (token: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.post,
    cb,
    `/fcm`,
    { mode: 'delete', token },
    getHeaders()
  );



/*export const testFCM = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/fcm`, getHeaders());
*/

//Utils
/**
 * Funció per a enviar la petició de Login
 * @param email Correu de l'usuari
 * @param pass Contrasenya de l'usuari
 * @param cb Funció de callback
 * @returns 
 */
export const doLogin = (email: string, pass: string, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/login', {
    correu: email,
    contrasenya: pass,
  });
/**
 * Canviar la foto de perfil
 * @param data Les dades provinents del formulari
 * @param cb Funció de callback
 * @returns 
 */
export const uploadImagePerfil = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/img_perfil', data, getHeaders());

/**
 * Canviar la foto de fons
 * @param data Les dades provinents del formulari
 * @param cb Funció de callback
 * @returns 
 */
export const uploadImageFons = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/img_fons', data, getHeaders());

/**
 * Registrar un usuari
 * @param data Les dades provinents del formulari
 * @param cb Funció de callback
 * @returns 
 */
export const dosignIn = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/signup', data);

/**
 * Eliminar un usuari
 * @param cb Funció de callback
 * @returns 
 */
export const deleteUser = (cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, '/users', getHeaders());

/**
 * Funció per a enviar el token de Google a la API
 * I obtenir un token d'autenticació
 * @param credential Token obtingut en l'inici de sessió de Google
 * @param cb Funció de callback
 * @returns 
 */
export const googleLogin = (credential: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/google`, { credential });

//Configuracio

/**
 * Obtenir el perfil
 * @param cb Funció de callback
 * @returns 
 */
export const getPerfil = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/perfil`, getHeaders());

/**
 * Actualitzar el perfil
 * @param userInfo La data provinewnt del formulari
 * @param cb Funció de callback
 * @returns 
 */
export const updatePerfil = (userInfo: any, cb: CallbackFunction) =>
  axiosWrapper(instance.put, cb, `/perfil`, { ...userInfo }, getHeaders());

/*export const canviarContrasenya = (
  oldC: any,
  newC: any,
  rnewC: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.post,
    cb,
    `/contrasenya`,
    { oldC, newC, rnewC },
    getHeaders()
  );*/
/**
 * Funció per a comprovar el correu no està registrat a la base de dades.
 * @param correu Correu a verificar
 * @param cb Funció de callback
 * @returns 
 */
export const correuDisponible = (correu: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/correu/${correu}`);
