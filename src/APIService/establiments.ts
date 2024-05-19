import {
  instance,
  getHeaders,
  getMultiPartHeaders,
  axiosWrapper,
} from './utils';
import {CallbackFunction} from '../types'
//Establiments

export const getEstabliments = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, '/establiments');

export const getEstabliment = (id_establiment: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/establiments/${id_establiment}`);

export const searchEstabliments = (
  latitude: any,
  longitude: any,
  radi: any,
  preuMin: any,
  preuMax: any,
  quantitatMin: any,
  qualitatMin: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.post,
    cb,
    '/search',
    { latitude, longitude, radi, preuMin, preuMax, quantitatMin, qualitatMin },
    getHeaders()
  );

export const registreEstabliment = (data: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb, '/establiments', data);

export const updateEstabliment = (
  id_establiment: any,
  data: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.put,
    cb,
    `/establiments/${id_establiment}`,
    data,
    getHeaders()
  );

export const deleteEstabliment = (cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb,`/establiments/`);

export const putImatgePerfil = (formData: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.put,
    cb,
    `/establiments/img_perfil`,
    formData,
    getMultiPartHeaders()
  );

export const putImatgeFondo = (formData: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.put,
    cb,
    `/establiments/img_fondo`,
    formData,
    getMultiPartHeaders()
  );

export const getEstadistiques = (establimentId: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.get,
    cb,
    `/estadistiques/${establimentId}`,
    getHeaders()
  );
