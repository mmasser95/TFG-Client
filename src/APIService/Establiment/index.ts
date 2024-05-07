import {instance,getHeaders} from '../'

//Establiments
export function getEstabliments(instance: any) {
  return instance.get('/establiments');
}

export function getEstabliment(instance: any, id_establiment: any) {
  return instance.get(`/establiments/${id_establiment}`);
}

export function searchEstabliments(
  latitude: any,
  longitude: any,
  radi: any,
  preuMin?:any,
  preuMax?:any,
  quantitatMin?:any,
  quantitatMax?:any
) {
  return instance.post(`/search`, { latitude, longitude, radi, preuMin,preuMax,quantitatMin,quantitatMax }, getHeaders());
}

export function registreEstabliment(instance: any, data: any) {
  return instance.post('/establiments', data);
}

export function updateEstabliment(
  instance: any,
  headers: any,
  id_establiment: any,
  data: any
) {
  return instance.put(`/establiments/${id_establiment}`, data, headers());
}

export function updateDireccio(instance: any, headers: any, data: any) {
  return instance.put(`/establiments/direccio`, data, headers());
}

export function deleteEstabliment(instance: any, headers: any) {
  return instance.delete(`/establiments`, headers());
}
