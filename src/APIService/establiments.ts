import { instance, getHeaders,getMultiPartHeaders } from './utils'


//Establiments

export const getEstabliments = (cb: Function) => axiosWrapper(instance.get, '/establiments', cb)
// export function getEstabliments(instance: any) {
//   return instance.get('/establiments');
// }

export const getEstabliment = (id_establiment: any, cb: Function) => axiosWrapper(instance.get, `/establiments/${id_establiment}`, cb)

// export function getEstabliment(instance: any, id_establiment: any) {
//   return instance.get(`/establiments/${id_establiment}`);
// }
export const searchEstabliments = (
  latitude: any,
  longitude: any,
  radi: any,
  preuMin?: any,
  preuMax?: any,
  quantitatMin?: any,
  quantitatMax?: any,
  cb: Function
) => axiosWrapper(instance.post, "/search", { latitude, longitude, radi, preuMin, preuMax, quantitatMin, quantitatMax }, getHeaders(), cb)

/*export function searchEstabliments(
  latitude: any,
  longitude: any,
  radi: any,
  preuMin?: any,
  preuMax?: any,
  quantitatMin?: any,
  quantitatMax?: any
) {
  return instance.post(`/search`, { latitude, longitude, radi, preuMin, preuMax, quantitatMin, quantitatMax }, getHeaders());
}*/

export const registreEstabliment = (data: any, cb: Function) => axiosWrapper(instance.post, "/establiments", data, cb)

/*export function registreEstabliment(instance: any, data: any) {
  return instance.post('/establiments', data);
}*/

export const updateEstabliment = (headers: any,
  id_establiment: any,
  data: any,
  cb: Function) => axiosWrapper(instance.put, `/establiments/${id_establiment}`, data, getHeaders(), cb)

/*export function updateEstabliment(
  instance: any,
  headers: any,
  id_establiment: any,
  data: any
) {
  return instance.put(`/establiments/${id_establiment}`, data, headers());
}*/

/*export function updateDireccio(instance: any, headers: any, data: any) {
  return instance.put(`/establiments/direccio`, data, headers());
}*/

export const deleteEstabliment = (cb: Function) => axiosWrapper(instance.delete, cb)

/*export function deleteEstabliment(instance: any, headers: any) {
  return instance.delete(`/establiments`, headers());
}*/

export const putImatgePerfil = (formData: any, cb: Function) => axiosWrapper(instance.put, `/establiments/img_perfil`, formData, getMultiPartHeaders(), cb)
/*export function putImatgePerfil(formData: any) {
  return instance.put(
    `/establiments/img_perfil`,
    formData,
    getMultiPartHeaders()
  );
}*/
export const putImatgeFondo = (formData: any, cb: Function) => axiosWrapper(instance.put, `/establiments/img_fondo`, formData, getMultiPartHeaders(), cb)
/*export function putImatgeFondo(formData: any) {
  return instance.put(
    `/establiments/img_fondo`,
    formData,
    getMultiPartHeaders()
  );
}*/
export function getEstadistiques(establimentId: any) {
  return instance.get(`/estadistiques/${establimentId}`, getHeaders());
}