import { instance, getHeaders, axiosWrapper } from '../utils'

//Rebosts

export const getRebosts = (cb: CallbackFunction) => axiosWrapper(instance.get, '/rebosts', getHeaders(), cb)
export const getRebost = (id_rebost: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/rebosts/${id_rebost}`, getHeaders(), cb)
export const crearRebost = (data:any,cb: CallbackFunction) => axiosWrapper(instance.post, '/rebosts',data, getHeaders(), cb)
export const updateRebost = (id_rebost: any,data:any,cb: CallbackFunction) => axiosWrapper(instance.post, `/rebosts/${id_rebost}`,data, getHeaders(), cb)
export const deleteRebost = (id_rebost: any, cb: CallbackFunction) => axiosWrapper(instance.delete, `/rebosts/${id_rebost}`, getHeaders(), cb)

/*export function getRebosts() {
    return instance.get('/rebosts', getHeaders());
}*/

/*export function getRebost(id_rebost: string) {
    return instance.get(`/rebosts/${id_rebost}`, getHeaders());
}*/

/*export function crearRebost(data: any) {
    return instance.post(`/rebosts`, data, getHeaders());
}*/

/*export function updateRebost(id_rebost: any, data: any) {
    return instance.put(`/rebosts/${id_rebost}`, data, getHeaders());
}*/

/*export function deleteRebost(id_rebost: any) {
    return instance.delete(`/rebosts/${id_rebost}`, getHeaders());
}*/