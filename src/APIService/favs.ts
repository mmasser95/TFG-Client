import { instance, getHeaders, axiosWrapper } from '../utils'

export const getFavs = (cb: CallbackFunction) => axiosWrapper(instance.get, `/fav`, getHeaders(), cb)
export const getMyFavs = (cb: CallbackFunction) => axiosWrapper(instance.get, `/myfav`, getHeaders(), cb)
export const createFav = (establimentId: string, cb: CallbackFunction) => axiosWrapper(instance.post, `/fav`, { establimentId }, getHeaders(), cb)
export const deleteFav = (establimentId: string, cb: CallbackFunction) => axiosWrapper(instance.delete, `/fav/${establimentId}`, getHeaders(), cb)
//Favs
/*export function getFavs() {
    return instance.get(`/fav`, getHeaders());
}*/

/*export function getMyFavs() {
    return instance.get(`/myfav`, getHeaders());
}*/

/*export function createFav(establimentId: string) {
    return instance.post(`/fav`, { establimentId }, getHeaders());
}*/

/*export function deleteFav(establimentId: string) {
    return instance.delete(`/fav/${establimentId}`, getHeaders());
}*/