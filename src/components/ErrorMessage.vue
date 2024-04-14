<template>
    <ion-text class="text-small" color="danger">{{ message }}</ion-text>
</template>
<script setup lang="ts">
import { IonText } from '@ionic/vue';
const props = defineProps({
    message: String
})
</script>
<style>
.text-small{
    font-size: 0.72rem;
}
</style>