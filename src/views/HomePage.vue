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
      </ion-grid>
    </ion-content>
      
  </ion-page>
</template>

<script setup lang="js">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonRow, IonGrid } from '@ionic/vue';
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
