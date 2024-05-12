import { instance, getHeaders, axiosWrapper } from '../utils'

export const getAllComandes = (cb: CallbackFunction) => axiosWrapper(instance.get, `/comandes`, getHeaders(), cb)
export const getComanda = (comandaId: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/comandes/${comandaId}`, getHeaders(), cb)
export const createComanda = (comandaInfo: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/comandes`, comandaInfo, getHeaders(), cb)
export const deleteComanda = (comandaId: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/comandes/${comandaId}`, getHeaders(), cb)
//Comandes
/*export function getAllComandes() {
    return instance.get(`/comandes`, getHeaders());
}*/

/*export function getComanda(comandaId: any) {
    return instance.get(`/comandes/${comandaId}`, getHeaders());
}*/

/*export function createComanda(comandaInfo: any) {
    return instance.post(`/comandes`, comandaInfo, getHeaders());
}*/

/*export function deleteComanda(comandaId: any) {
    return instance.delete(`/comandes/${comandaId}`, getHeaders());
}*/