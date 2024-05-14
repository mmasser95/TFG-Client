//Aliments
import { instance, getHeaders, axiosWrapper } from './utils';
import {CallbackFunction} from '../types'
export const getArticleCategories = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/aliments/tipus`);
export const getAllAlimentsByTipus = (tipus: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/aliments/tipus/${tipus}`);
export const getAllAliments = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/aliments`);
export const getAlimentsByNoms = (noms: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/aliments/noms`, { noms }, getHeaders());
export const createAliment = (alimentInfo: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, `/aliments`, alimentInfo, getHeaders());
export const updateAliment = (
  alimentId: any,
  alimentInfo: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.put,
    cb,
    `/aliments/${alimentId}`,
    alimentInfo,
    getHeaders()
  );
export const deleteAliment = (alimentId: any, cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, `/aliments/${alimentId}`, getHeaders());
