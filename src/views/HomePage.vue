<template>
  <ion-page> 
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col>
            <h1 class="ion-text-center">Too Good To Go</h1>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeMd="6"><p>Aquesta serà una app per al reaprofitament d'aliments i begudes</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique cupiditate, consequatur consequuntur in corrupti reiciendis sunt ipsa adipisci cum totam, ducimus deleniti minus ab explicabo molestiae laborum praesentium quas quis.</p>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="12" sizeMd="6">
            <swiper
            :slides-per-view="1"
            :freemode="true"
            :space-between="5">
              <swiper-slide><MyCard imageURL="https://ionicframework.com/docs/img/demos/card-media.png" title="Hola Carta1" subtitle="Prova" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi enim voluptatum provident minima cumque laboriosam ducimus. Tempore labore delectus ratione, distinctio vel blanditiis sint temporibus amet culpa nulla quis."/></swiper-slide>
              <swiper-slide><MyCard imageURL="https://ionicframework.com/docs/img/demos/card-media.png" title="Hola Carta2" subtitle="Prova" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi enim voluptatum provident minima cumque laboriosam ducimus. Tempore labore delectus ratione, distinctio vel blanditiis sint temporibus amet culpa nulla quis."/></swiper-slide>
              <swiper-slide><MyCard imageURL="https://ionicframework.com/docs/img/demos/card-media.png" title="Hola Carta3" subtitle="Prova" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi enim voluptatum provident minima cumque laboriosam ducimus. Tempore labore delectus ratione, distinctio vel blanditiis sint temporibus amet culpa nulla quis."/></swiper-slide>
              <swiper-slide><MyCard imageURL="https://ionicframework.com/docs/img/demos/card-media.png" title="Hola Carta4" subtitle="Prova" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi enim voluptatum provident minima cumque laboriosam ducimus. Tempore labore delectus ratione, distinctio vel blanditiis sint temporibus amet culpa nulla quis."/></swiper-slide>
              <swiper-slide><MyCard imageURL="https://ionicframework.com/docs/img/demos/card-media.png" title="Hola Carta5" subtitle="Prova" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus excepturi enim voluptatum provident minima cumque laboriosam ducimus. Tempore labore delectus ratione, distinctio vel blanditiis sint temporibus amet culpa nulla quis."/></swiper-slide>
            </swiper>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
      
  </ion-page>
</template>

<script lang="js">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonRow, IonGrid } from '@ionic/vue';
import MyCard from '../components/MyCard.vue';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css'

export default{
  components:{
    MyCard,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol,
    IonRow,
    IonGrid,
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
