import { instance, getHeaders, axiosWrapper } from './utils';
import {CallbackFunction} from '../types'
//Rebosts

export const getRebosts = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, '/rebosts', getHeaders());
export const getRebost = (id_rebost: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/rebosts/${id_rebost}`, getHeaders());
export const crearRebost = (data: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, '/rebosts', data, getHeaders());
export const updateRebost = (id_rebost: any, data: any, cb: CallbackFunction) =>
  axiosWrapper(instance.put, cb, `/rebosts/${id_rebost}`, data, getHeaders());
export const deleteRebost = (id_rebost: any, cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, `/rebosts/${id_rebost}`, getHeaders());
