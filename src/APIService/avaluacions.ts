import { instance, getHeaders, axiosWrapper } from '../utils'

export const getAvaluacio = (comandaId: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/comandes/${comandaId}/avaluacions`, getHeaders(), cb)
export const createAvaluacio = (comandaId: any, avaluacioInfo: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/comandes/${comandaId}/avaluacions`, avaluacioInfo, getHeaders(), cb)
export const deleteAvaluacio = (comandaId: any, avaluacioId: any, cb: CallbackFunction) => axiosWrapper(instance.delete, `/comandes/${comandaId}/avaluacions/${avaluacioId}`, getHeaders(), cb)

//Avaluacions

/*export function getAvaluacio(comandaId: any) {
    return instance.get(`/comandes/${comandaId}/avaluacions`, getHeaders());
  }*/

/*export function createAvaluacio(comandaId: any, avaluacioInfo: any) {
    return instance.post(
        `/comandes/${comandaId}/avaluacions`,
        avaluacioInfo,
        getHeaders()
    );
}*/

/*export function deleteAvaluacio(comandaId: any, avaluacioId: any) {
    return instance.delete(
        `/comandes/${comandaId}/avaluacions/${avaluacioId}`,
        getHeaders()
    );
}*/

