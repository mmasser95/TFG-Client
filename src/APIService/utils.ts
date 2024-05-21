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

export const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
});

export const axiosWrapper = (fn: Function,cb: CallbackFunction,...options: any) => {
  fn(...options)
    .then((response: any) => {
      cb(null, response.data);
    })
    .catch(async (error: any) => {
      if (error.response) {
        // La request s'ha fet pero s'ha obtingut un status diferent a 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        cb({
          status: error.response.status,
          message: error.response.data,
        });
        if (error.response.status == 401 || error.response.status == 400) {
          let alert = await createErrorAlert(
            error.response.data.message,
            error.response.status
          );
          alert.present();
        }
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
export const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
    },
  };
};

export const getMultiPartHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export async function getCoordinates(
  carrer: String,
  numero: number,
  city: String,
  provincia: String,
  CP: number
) {
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

export const doIPLocation = (cb: CallbackFunction) =>
  axiosWrapper(axios.get, cb, 'https://api.my-ip.io/v2/ip.json');

export function doTest() {
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler');
}

export const verificarToken = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/verificar`, getHeaders());

/*export function verificarToken() {
  return instance.get(`/verificar`, getHeaders());
}*/

//Firebase
export const sendFirebaseToken = (token: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/fcm`, { mode: 'add', token }, getHeaders());

/*export function sendFirebaseToken(token: any) {
  return instance.post(`/fcm`, { mode: 'add', token }, getHeaders());
}*/
export const deleteFirebaseToken = (token: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.post,
    cb,
    `/fcm`,
    { mode: 'delete', token },
    getHeaders()
  );
/*export function deleteFirebaseToken(token: any) {
  return instance.post(`/fcm`, { mode: 'delete', token }, getHeaders());
}*/

export const testFCM = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/fcm`, getHeaders());

//Utils
export const doLogin = (email: string, pass: string, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/login', {
    correu: email,
    contrasenya: pass,
  });

export const uploadImagePerfil = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/img_perfil', data, getHeaders());

export const uploadImageFons = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/img_fons', data, getHeaders());

export const dosignIn = (data: FormData, cb: CallbackFunction) =>
  axiosWrapper(axios.post, cb, base_url + '/signup', data);

export const deleteUser = (cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, '/users', getHeaders());

export const googleLogin = (credential: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/google`, { credential });

//Configuracio

export const getPerfil = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/perfil`, getHeaders());

/*export function getPerfil() {
  return instance.get(`/perfil`, getHeaders());
}*/

export const updatePerfil = (userInfo: any, cb: CallbackFunction) =>
  axiosWrapper(instance.put, cb, `/perfil`, { ...userInfo }, getHeaders());

/*export function updatePerfil(userInfo: any) {
  return instance.put(`/perfil`, { ...userInfo }, getHeaders());
}*/
export const canviarContrasenya = (
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
  );

export const correuDisponible = (correu: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/correu/${correu}`);
