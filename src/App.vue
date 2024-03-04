<template>
  <ion-app>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet />
	      <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="mapa" href="/mapa">
            <ion-icon :icon="map" />
            <ion-label>Map</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="search" href="/search">
            <ion-icon :icon="search" />
	          <ion-label>Cercar</ion-label>
	        </ion-tab-button>
          <ion-tab-button v-if="logged" tab="settings" href="/settings">
            <ion-icon :icon="person" />
            <ion-label>Jo</ion-label>
          </ion-tab-button>
          <ion-tab-button v-if="!logged" tab="login" href="/login">
            <ion-icon :icon="logIn" />
            <ion-label>Login</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet, IonPage, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { home, map,person, search, logIn } from 'ionicons/icons';

export default{
	components:{IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon,IonApp},
	data(){
		return {
      logged:false,
      logIn,
			home,
			person,
			map,
			search
		}
	},
}
</script>
