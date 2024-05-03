<template>
    <div class="horari" v-if="horaris">
        <ion-badge v-for="horari in horaris" :key="horari._id" >
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
    gap:8px;
}

ion-chip{
    @media (prefers-color-scheme: dark) {
        --background:  linear-gradient(to right, #70995c,#a5b061,#dfc36f,#ffd489);
        color:black;
    }
}
</style>