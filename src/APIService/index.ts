import axios from 'axios';
import { useLoginStore } from '../store/loginStore';
// const base_url = 'http://192.168.1.129:5000/api/v1';
const base_url = 'https://pro-grouse-unified.ngrok-free.app/api/v1';

const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
    },
  };
};

const getMultiPartHeaders = () => {
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

export function doIPLocation() {
  return axios.get('https://api.my-ip.io/v2/ip.json');
}

export function doTest() {
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler');
}

export function doLogin(email: string, pass: string) {
  return axios.post(base_url + '/login', { correu: email, contrasenya: pass });
}

export function uploadImagePerfil(data: FormData) {
  return axios.post(base_url + '/img_perfil', data, getHeaders());
}

export function uploadImageFons(data: FormData) {
  return axios.post(base_url + '/img_fons', data, getHeaders());
}

export function dosignIn(data: any) {
  return axios.post(base_url + '/signup', data);
}
export function deleteUser() {
  return instance.delete('/users', getHeaders());
}

//Establiments
export function getEstabliments() {
  return instance.get('/establiments');
}

export function getEstabliment(id_establiment: any) {
  return instance.get(`/establiments/${id_establiment}`);
}

export function searchEstabliments(latitude: any, longitude: any, radi: any) {
  return instance.post(`/search`, { latitude, longitude, radi }, getHeaders());
}

export function registreEstabliment(data: any) {
  return instance.post('/establiments', data);
}

export function updateEstabliment(id_establiment: any, data: any) {
  return instance.put(`/establiments/${id_establiment}`, data, getHeaders());
}

export function updateDireccio(data: any) {
  return instance.put(`/establiments/direccio`, data, getHeaders());
}

export function deleteEstabliment() {
  return instance.delete(`/establiments`, getHeaders());
}

//Rebosts
export function getRebosts() {
  return instance.get('/rebosts', getHeaders());
}

export function getRebost(id_rebost: string) {
  return instance.get(`/rebosts/${id_rebost}`, getHeaders());
}

export function crearRebost(data: any) {
  return instance.post(`/rebosts`, data, getHeaders());
}

export function updateRebost(id_rebost: any, data: any) {
  return instance.put(`/rebosts/${id_rebost}`, data, getHeaders());
}

export function deleteRebost(id_rebost: any) {
  return instance.delete(`/rebosts/${id_rebost}`, getHeaders());
}

//Oferta

export function getOfertes() {
  return instance.get('/ofertes', getHeaders());
}

export function getOferta(id_oferta: any) {
  return instance.get(`/ofertes/${id_oferta}`, getHeaders());
}

export function getOfertaUser(establimentId: any, id_oferta: any) {
  return instance.get(
    `/establiments/${establimentId}/oferta/${id_oferta}`,
    getHeaders()
  );
}

export function crearOferta(data: any) {
  return instance.post(`/ofertes`, data, getHeaders());
}

export function updateOferta(id_oferta: any, data: any) {
  return instance.put(`/ofertes/${id_oferta}`, data, getHeaders());
}

export function deleteOferta(id_oferta: any) {
  return instance.delete(`/ofertes/${id_oferta}`, getHeaders());
}

export function getArticleCategories() {
  return instance.get(`/aliments/tipus`);
}

export function getAllAlimentsByTipus(tipus: any) {
  return instance.get(`/aliments/tipus/${tipus}`);
}

export function getAllAliments() {
  return instance.get(`/aliments`);
}

export function getAllElements(rebostId: any) {
  return instance.get(`/rebosts/${rebostId}/elements/`, getHeaders());
}
export function createElement(rebostId: any, data: any) {
  return instance.post(`/rebosts/${rebostId}/elements/`, data, getHeaders());
}
export function putElement(rebostId: any, elementId: any, data: any) {
  return instance.put(
    `/rebosts/${rebostId}/elements/${elementId}`,
    data,
    getHeaders()
  );
}
export function deleteElement(rebostId: any, elementId: any) {
  return instance.delete(
    `/rebosts/${rebostId}/elements/${elementId}`,
    getHeaders()
  );
}

export function getFavs() {
  return instance.get(`/fav`, getHeaders());
}

export function getMyFavs() {
  return instance.get(`/myfav`, getHeaders());
}

export function createFav(establimentId: string) {
  return instance.post(`/fav`, { establimentId }, getHeaders());
}

export function deleteFav(establimentId: string) {
  return instance.delete(`/fav/${establimentId}`, getHeaders());
}

export function putImatgePerfil(formData: any) {
  return instance.put(
    `/establiments/img_perfil`,
    formData,
    getMultiPartHeaders()
  );
}
export function putImatgeFondo(formData: any) {
  return instance.put(
    `/establiments/img_fondo`,
    formData,
    getMultiPartHeaders()
  );
}
export function getEstadistiques(establimentId: any) {
  return instance.get(`/estadistiques/${establimentId}`, getHeaders());
}

export function getAllComandes() {
  return instance.get(`/comandes`, getHeaders());
}

export function getComanda(comandaId: any) {
  return instance.get(`/comandes/${comandaId}`, getHeaders());
}

export function createComanda(comandaInfo: any) {
  return instance.post(`/comandes`, comandaInfo, getHeaders());
}

export function deleteComanda(comandaId: any) {
  return instance.delete(`/comandes/${comandaId}`, getHeaders());
}
