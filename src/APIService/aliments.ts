//Aliments
import { instance, getHeaders, axiosWrapper } from '../utils'

export const getArticleCategories = (cb: CallbackFunction) => axiosWrapper(instance.get, `/aliments/tipus`, cb)
export const getAllAlimentsByTipus = (tipus: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/aliments/tipus/${tipus}`, cb)
export const getAllAliments = (cb: CallbackFunction) => axiosWrapper(instance.get, `/aliments`, cb)
export const getAlimentsByNoms = (noms: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/aliments/noms`, { noms }, getHeaders(), cb)
export const createAliment = (alimentInfo: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/aliments`, alimentInfo, getHeaders(), cb)
export const updateAliment = (alimentId: any, alimentInfo: any, cb: CallbackFunction) => axiosWrapper(instance.put, `/aliments/${alimentId}`, alimentInfo, getHeaders(), cb)
export const deleteAliment = (alimentId: any, cb: CallbackFunction) => axiosWrapper(instance.delete, `/aliments/${alimentId}`, getHeaders(), cb)


/*export function getArticleCategories() {
    return instance.get(`/aliments/tipus`);
  }*/

/* export function getAllAlimentsByTipus(tipus: any) {
   return instance.get(`/aliments/tipus/${tipus}`);
 }*/

/*export function getAllAliments() {
    return instance.get(`/aliments`);
}*/

/*export function getAlimentsByNoms(noms: any) {
    return instance.post(`/aliments/noms`, { noms }, getHeaders());
}*/

/*export function createAliment(alimentInfo: any) {
    return instance.post(`/aliments`, alimentInfo, getHeaders());
}*/

/*export function updateAliment(alimentId: any, alimentInfo: any) {
    return instance.put(`/aliments/${alimentId}`, alimentInfo, getHeaders());
}*/

/*export function deleteAliment(alimentId: any) {
    return instance.delete(`/aliments/${alimentId}`, getHeaders());
}*/