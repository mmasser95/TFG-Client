import axios from 'axios';
import { CapacitorHttp } from '@capacitor/core';
import { useLoginStore } from '../store/loginStore';
const base_url = 'http://192.168.1.10:5000/api/v1';


const instance = axios.create({
  baseURL: base_url,
  timeout: 10000,
});

const getHeaders = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + useLoginStore().token,
    },
  };
};

export function doTest() {
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler')
}

export function doLogin(email: string, pass: string) {
  return axios.post(base_url + '/login', { email, pass });
  
}

export function dosignIn(data: any) {
  // return axios.post(base_url + '/signin', data);
  return axios.post(base_url+'/signin',data)
}
//Establiments
export function getEstabliments() {
  return instance.get('/establiments');
}

export function getEstabliment(id_establiment: any) {
  return instance.get(`/establiments/${id_establiment}`);
}

export function createEstabliment(data: any) {
  return instance.post('/establiments', data);
}

export function updateEstabliment(id_establiment: any, data: any) {
  return instance.put(`/establiments/${id_establiment}`, data);
}

export function deleteEstabliment(id_establiment: any) {
  return instance.delete(`/establiments/${id_establiment}`);
}

//Rebosts
export function getRebosts() {
  return instance.get('/rebosts', getHeaders());
}

export function getRebost(id_rebost: string) {
  return instance.get(`/rebosts/${id_rebost}`, getHeaders());
}

export function newRebost(data: any) {
  return instance.post(`/rebosts`, data, getHeaders());
}

export function updateRebost(id_rebost: any, data: any) {
  return instance.put(`/rebosts/${id_rebost}`, data, getHeaders());
}

export function deleteRebost(id_rebost: any) {
  return instance.delete(`/rebosts/${id_rebost}`, getHeaders());
}

//Oferta

export function getOfertes() {
  return instance.get('/ofertes');
}

export function getOferta(id_oferta: any) {
  return instance.get(`/ofertes/${id_oferta}`);
}

export function newOferta(data: any) {
  return instance.post(`/ofertes`, data);
}

export function updateOferta(id_oferta: any, data: any) {
  return instance.put(`/ofertes/${id_oferta}`, data);
}

export function deleteOferta(id_oferta: any) {
  return instance.delete(`/ofertes/${id_oferta}`);
}
