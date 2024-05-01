<template>
  <ion-app>
    <UseColorMode v-slot="{ mode }">
      <ion-router-outlet />
    </UseColorMode>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { App } from '@capacitor/app'
import { UseColorMode } from '@vueuse/components'
import { useColorMode } from '@vueuse/core';

const mode = useColorMode({
  attribute: 'theme',
  modes: {
    light: 'light',
    dark: 'dark',
    contrast: 'contrast'
  }
})

const ionRouter = useIonRouter();
useBackButton(-1, () => {
  if (!ionRouter.canGoBack()) {
    App.exitApp();
  }
})
</script>

<style>
* {
  font-family: 'Exo 2';
}

ion-fab {
  bottom: 7px;
  right: 15px;
}
</style>
popups.0