<template>
    <div class="container">
        
    </div>
</template>
<script setup lang="ts">
import { IonContent, IonItem } from '@ionic/vue';
import { Comanda } from '../types';
const props = defineProps<{ comanda: Comanda }>()

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: row wrap;
}
</style>