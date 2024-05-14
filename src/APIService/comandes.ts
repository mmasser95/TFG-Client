import { instance, getHeaders, axiosWrapper } from './utils';
import {CallbackFunction} from '../types'
export const getAllComandes = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/comandes`, getHeaders());
export const getComanda = (comandaId: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/comandes/${comandaId}`, getHeaders());
export const createComanda = (comandaInfo: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/comandes`, comandaInfo, getHeaders());
export const deleteComanda = (comandaId: any, cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, `/comandes/${comandaId}`, getHeaders());
