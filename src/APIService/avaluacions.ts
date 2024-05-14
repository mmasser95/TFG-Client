import { instance, getHeaders, axiosWrapper } from './utils';
import { CallbackFunction } from '../types';
export const getAvaluacio = (comandaId: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.get,
    cb,
    `/comandes/${comandaId}/avaluacions`,
    getHeaders()
  );
export const createAvaluacio = (
  comandaId: any,
  avaluacioInfo: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.post,
    cb,
    `/comandes/${comandaId}/avaluacions`,
    avaluacioInfo,
    getHeaders()
  );
export const deleteAvaluacio = (
  comandaId: any,
  avaluacioId: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.delete,
    cb,
    `/comandes/${comandaId}/avaluacions/${avaluacioId}`,
    getHeaders()
  );
export const getComentaris = (establimentId: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.get,
    cb,
    `/establiment/${establimentId}/avaluacions`,
    getHeaders()
  );
