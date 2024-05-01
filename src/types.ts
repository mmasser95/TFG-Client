import { LatLngTuple } from 'leaflet';
export interface Oferta {
  _id: string;
  nom: string;
  descripcio: string;
  preu: number;
  active: boolean;
  quantitatDisponible: number;
  categoria: string;
}
export interface Direccio {
  _id: string;
  carrer: string;
  numero: number;
  CP: number;
  poblacio: string;
  provincia: string;
}
export interface Establiment {
  _id: string;
  nom: string;
  descripcio: string;
  latitude: string;
  longitude: string;
  telf: string;
  url_imatge: string;
  coordenades: LatLngTuple;
  url_fondo: string;
  horari: string;
  tipus: string;
  ofertes: Oferta[];
  direccio: Direccio;
}

export interface Establiment2 {
  _id: string;
  nom: string;
  descripcio: string;
  latitude: string;
  longitude: string;
  telf: string;
  url_imatge: string;
  coordenades: LatLngTuple;
  url_fondo: string;
  horari: Horari[] | string;
  tipus: string;
  ofertes: Oferta[];
  direccio: Direccio;
}

export interface Rebost {
  _id: string;
  nom: string;
  descripcio: string;
}
export interface Aliment {
  _id: string;
  nom: string;
  tipus: string;
}

export interface Element {
  _id: string;
  quantitat: number;
  q_unitat: string;
  data_compra: string;
  data_caducitat: string;
  aliment?: Aliment;
}

export interface Horari {
  inici: Date;
  final: Date;
  _id: string;
}

export interface Comanda {
  ofertaId: string;
  userId: string;
  preu: string;
  quantitat: number;
}
