<template>
    <div class="horari" v-if="horaris.length>0">
        <ion-badge color="success" data-test="badge" v-for="horari in horaris" :key="horari._id" >
            {{ horari.inici }}-{{ horari.final }}
        </ion-badge>
    </div>
</template>
<script setup lang="ts">
import {IonBadge} from '@ionic/vue'
import {Horari} from'../types'
const props=defineProps<{
    horaris:Horari[]
}>()
</script>
<style scoped>
.horari{
    display: flex;
    flex-flow:column wrap;
    margin:2px;
    gap:15px;
}

ion-badge{
    
}
</style>