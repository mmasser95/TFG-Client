<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet :key="$route.fullPath"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-if="userType == 'client'" v-for="(tab, k) in tabsUser" :tab="tab.tabName" :href="tab.hrf"
          :key="k">
          <ion-icon aria-hidden="true" :icon="tab.icon" />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
        <ion-tab-button v-if="userType == 'establiment'" v-for="(tab, k) in tabsEstabliment" :tab="tab.tabName"
          :href="tab.hrf" :key="k">
          <ion-icon aria-hidden="true" :icon="tab.icon" />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet, IonRow, IonGrid, IonCol } from '@ionic/vue';
import { home, map, documentText, storefront, cog, cube } from 'ionicons/icons';
import { ref, reactive } from 'vue';
import { useLoginStore } from '@/store/loginStore'
import { storeToRefs } from 'pinia';


//Store
const store = useLoginStore();
const { userId, token, userType } = storeToRefs(store);
const tabsEstabliment = ref([{
  tabName: 'tab5',
  hrf: '/tabs/tab5',
  icon: storefront,
  label: 'Ofertes'
}, {
  tabName: 'tab6',
  hrf: '/tabs/tab6',
  icon: documentText,
  label: 'Comandes'
}, {
  tabName: 'tab3',
  hrf: '/tabs/tab3',
  icon: cube,
  label: 'Inventari'
}, {
  tabName: 'tab4',
  hrf: '/tabs/tab4',
  icon: cog,
  label: 'Config.'
}])
const tabsUser = ref([{
  tabName: 'tab1',
  hrf: '/tabs/tab1',
  icon: home,
  label: 'Home'
}, {
  tabName: 'explorar',
  hrf: '/tabs/explorar',
  icon: map,
  label: 'Mapa'
}, {
  tabName: 'tab3',
  hrf: '/tabs/tab3',
  icon: cube,
  label: 'Inventari'
}, {
  tabName: 'tab4',
  hrf: '/tabs/tab4',
  icon: cog,
  label: 'Config.'
}])

</script>
