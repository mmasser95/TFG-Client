import axios from 'axios';

const base_url='http://localhost:5000/api/v1';
export function doLogin(email:string,pass:string){
    return axios.post(base_url+'/login',{email,pass});
    
}

export function dosignIn(data:any){
    return axios.post(base_url+'/signin',data);
}

export function getNegocis(){
    return axios.get(base_url+'/negocis');
}

export function getRebost(id_rebost:any){
    return axios.get(base_url+`/rebost/${id_rebost}`);
}

export function newRebost(data:any){
    return axios.post(base_url+`/rebost`, data);
}