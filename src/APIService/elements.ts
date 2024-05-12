import { instance, getHeaders, axiosWrapper } from '../utils'

//Elements

export const getAllElements = (rebostId: any, cb: CallbackFunction) => axiosWrapper(instance.get, `/rebosts/${rebostId}/elements/`, getHeaders(), cb)
export const createElement = (rebostId: any, data: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/rebosts/${rebostId}/elements/`, data, getHeaders(), cb)
export const createElementScan = (rebostId: any, cb: CallbackFunction) => axiosWrapper(instance.post, `/rebosts/${rebostId}/elements/scan`, { elements: data }, getHeaders(), cb)
export const putElement = (rebostId: any, elementId: any, data: any, cb: CallbackFunction) => axiosWrapper(instance.put, `/rebosts/${rebostId}/elements/${elementId}`, data, getHeaders(), cb)
export const deleteElement = (rebostId: any, cb: CallbackFunction) => axiosWrapper(instance.delete, `/rebosts/${rebostId}/elements/${elementId}`, getHeaders(), cb)



/*export function getAllElements(rebostId: any) {
    return instance.get(`/rebosts/${rebostId}/elements/`, getHeaders());
}*/

/*export function createElement(rebostId: any, data: any) {
    return instance.post(`/rebosts/${rebostId}/elements/`, data, getHeaders());
}*/

/*export function createElementScan(rebostId: any, data: any) {
    return instance.post(
        `/rebosts/${rebostId}/elements/scan`,
        { elements: data },
        getHeaders()
    );
}*/
/*export function putElement(rebostId: any, elementId: any, data: any) {
    return instance.put(
        `/rebosts/${rebostId}/elements/${elementId}`,
        data,
        getHeaders()
    );
}*/
/*export function deleteElement(rebostId: any, elementId: any) {
    return instance.delete(
        `/rebosts/${rebostId}/elements/${elementId}`,
        getHeaders()
    );
}*/