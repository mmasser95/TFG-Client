<template>
    <ion-page>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <h1 class="ion-text-center">Mapa</h1>
                </ion-col>
            </ion-row>
            <ion-row style="height:100%">
                <ion-col>
                </ion-col>
            </ion-row>
        </ion-grid>
        <div style="height:100%; width:100%">
            <l-map ref="map" v-model:zoom="zoom" :center="[41.04133, 0.734]">
                <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
                ></l-tile-layer>
            </l-map>
        </div>
    </ion-page>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
  import {IonCol, IonRow, IonGrid, IonPage} from "@ionic/vue";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      IonCol,
      IonRow,
      IonGrid,
      IonPage
    },
    data() {
      return {
        zoom: 16,
      };
    },
  };
  </script>
  
  <style></style>