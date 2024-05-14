import { instance, getHeaders, axiosWrapper } from './utils';
import {CallbackFunction} from '../types'
//Elements

export const getAllElements = (rebostId: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.get,
    cb,
    `/rebosts/${rebostId}/elements/`,
    getHeaders()
  );
export const createElement = (rebostId: any, data: any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.post,
    cb,
    `/rebosts/${rebostId}/elements/`,
    data,
    getHeaders()
  );
export const createElementScan = (rebostId: any,data:any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.post,
    cb,
    `/rebosts/${rebostId}/elements/scan`,
    { elements: data },
    getHeaders()
  );
export const putElement = (
  rebostId: any,
  elementId: any,
  data: any,
  cb: CallbackFunction
) =>
  axiosWrapper(
    instance.put,
    cb,
    `/rebosts/${rebostId}/elements/${elementId}`,
    data,
    getHeaders()
  );
export const deleteElement = (rebostId: any,elementId:any, cb: CallbackFunction) =>
  axiosWrapper(
    instance.delete,
    cb,
    `/rebosts/${rebostId}/elements/${elementId}`,
    getHeaders()
  );
