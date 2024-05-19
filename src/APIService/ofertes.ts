import { instance, getHeaders, axiosWrapper,getMultiPartHeaders } from './utils';
import {CallbackFunction} from '../types'
//Ofertes
export const getOfertes = (cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, '/ofertes', getHeaders());
export const getOferta = (id_oferta: any, cb: CallbackFunction) =>
  axiosWrapper(instance.get, cb, `/ofertes/${id_oferta}`, getHeaders());
export const getOfertaUser = (
  establimentId: any,
  id_oferta: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.get,
    cb,
    `/establiments/${establimentId}/oferta/${id_oferta}`,
    getHeaders()
  );
export const crearOferta = (data: any, cb: CallbackFunction) =>
  axiosWrapper(instance.post, cb,`/ofertes`, data, getMultiPartHeaders());
export const putImatgeOferta=(ofertaId:string,formData:any,cb: CallbackFunction)=>{
  axiosWrapper(instance.post,cb,`/ofertes/${ofertaId}`,formData,getMultiPartHeaders())
}
export const updateOferta = (id_oferta: any, data: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.put,
    cb,
    `/ofertes/${id_oferta}`,
    data,
    getHeaders(),
    getHeaders()
  );
export const deleteOferta = (id_oferta: any, cb: CallbackFunction) =>
  axiosWrapper(instance.delete, cb, `/ofertes/${id_oferta}`, getHeaders());
