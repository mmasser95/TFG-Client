import { instance, getHeaders, axiosWrapper } from './utils';
import {CallbackFunction} from '../types'

export const getFavs = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/fav`, getHeaders());
export const getMyFavs = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/myfav`, getHeaders());
export const createFav = (establimentId: string, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/fav`, { establimentId }, getHeaders());
export const deleteFav = (establimentId: string, cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, `/fav/${establimentId}`, getHeaders());
