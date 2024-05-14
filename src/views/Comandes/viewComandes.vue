<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center"> Veure comandes </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeXl="8" sizeLg="10">
                        <div class="container" v-if="comandes">
                            <!--<cardComanda v-for="i in comandes" class="item" :comanda="i"></cardComanda>-->
                            <div class="day-container" v-for="(data, k) in comandesPerData" :key="k">
                                <ion-title class="ion-text-center">{{ k }}</ion-title>
                                <div class="comandes-container">
                                    <cardComanda v-for="comanda in data" class="item" :comanda="comanda"
                                        :key="comanda._id">
                                    </cardComanda>
                                </div>
                            </div>
                        </div>
                        <div v-else class="container">
                            <ion-title class="ion-text-center">Encara no has fet cap comanda</ion-title>
                        </div>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonButton, IonButtons, IonTitle, IonGrid, IonRow, IonCol, modalController } from '@ionic/vue'
import { Comanda } from '../../types';
import { Ref, onMounted, ref, computed } from 'vue';
import cardComanda from '../../components/cardComanda.vue';
import { getAllComandes } from '../../APIService/comandes';
import { showLoading } from '../../composables/loader';
import groupBy from 'lodash/groupBy'
import { format } from 'date-fns/format'
const comandes: Ref<Comanda[] | null> = ref(null)

const comandesPerData = computed(() => groupBy(comandes.value, (el: any) => format(el.data, 'dd/MM/yyyy')))

const fillComandes = async () => {
    const loader = await showLoading('Carregant comandes')
    loader.present()
    getAllComandes((err:any,data:any)=>{
        loader.dismiss()
        if(err) return
        comandes.value =data.comandes
    })
}

onMounted(() => {
    fillComandes()
    console.log('comandesPerData.value :>> ', comandesPerData.value);
})

</script>
<style scoped>
.container {
    display: flex;
    flex-flow: column-reverse wrap;
    justify-content: center
}

.day-container {
    display: flex;
    flex-flow: column wrap;
}

.comandes-container{
    display:flex;
    flex-flow:row-reverse wrap;
    justify-content: flex-end;
}

.item {
    /*flex-grow:1*/
    flex-grow: 1;
    max-width: 200px
}
</style>