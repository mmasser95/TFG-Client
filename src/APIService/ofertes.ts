import { instance, getHeaders, axiosWrapper } from '../utils'

//Ofertes
export const getOfertes = (cb: CallbackFunction) => axiosWrapper(instance.get, '/ofertes', getHeaders(), cb)
export const getOferta = (id_oferta: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/ofertes/${id_oferta}`, getHeaders(), cb)
export const getOfertaUser = (establimentId: any, id_oferta: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/establiments/${establimentId}/oferta/${id_oferta}`, getHeaders(), cb)
export const crearOferta = (data: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/ofertes`, data, getHeaders(), cb)
export const updateOferta = (id_oferta: any, data: any,cb: CallbackFunction) => axiosWrapper(instance.put, `/ofertes/${id_oferta}`, data, getHeaders(), getHeaders(), cb)
export const deleteOferta = (id_oferta: any, cb: CallbackFunction) => axiosWrapper(instance.delete, '/ofertes', getHeaders(), cb)
/*export function getOfertes() {
  return instance.get('/ofertes', getHeaders());
}*/

/*export function getOferta(id_oferta: any) {
  return instance.get(`/ofertes/${id_oferta}`, getHeaders());
}*/

/*export function getOfertaUser(establimentId: any, id_oferta: any) {
  return instance.get(
    `/establiments/${establimentId}/oferta/${id_oferta}`,
    getHeaders()
  );
}
*/

/*export function crearOferta(data: any) {
  return instance.post(`/ofertes`, data, getHeaders());
}*/

/*export function updateOferta(id_oferta: any, data: any) {
  return instance.put(`/ofertes/${id_oferta}`, data, getHeaders());
}*/

/*export function deleteOferta(id_oferta: any) {
  return instance.delete(`/ofertes/${id_oferta}`, getHeaders());
}*/