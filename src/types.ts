import { LatLngTuple } from 'leaflet';
export interface Oferta {
  _id: string;
  nom: string;
  descripcio: string;
  preu: number;
  active: boolean;
  quantitatDisponible: number;
  categoria: string;
  url_imatge: string;
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
  correu?: string;
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
  quantitatMitjana?: number;
  qualitatMitjana?: number;
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
  quantitatMitjana?: number;
  qualitatMitjana?: number;
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
  temps_defecte_conservacio: number;
  t_unitat: string;
}

export interface Element {
  _id: string;
  quantitat: number;
  q_unitat: string;
  data_compra: string;
  data_caducitat: string;
  aliment?: Aliment;
}

export interface ElementToAdd {
  aliment: string;
  data_compra: string;
  data_caducitat: string;
  quantitat: number;
  q_unitat: string;
}

export interface Horari {
  inici: Date;
  final: Date;
  _id: string;
}

export interface Comanda {
  _id: string;
  establimentId: Establiment;
  ofertaId: string;
  oferta?: {
    nom: string;
    preu: number;
  };
  userId: string | any;
  total: string;
  data: string;
  quantitat: number;
}
export interface Avaluacio {
  comentari?: string;
  quantitat: number;
  qualitat: number;
  data_creacio: string;
}
export type CallbackFunction = (
  err: Object | null,
  data?: Object
) => Promise<void | boolean> | void | boolean;
