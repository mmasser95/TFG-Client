<template>
    <ion-card :router-link="`/tabs/rebost/${idd}`" class="ion-activatable">
        <ion-ripple-effect></ion-ripple-effect>
        <ion-card-header>
            <ion-card-title>{{ title }}</ion-card-title>
            <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-text>
                {{ content }}
            </ion-text>
            <div class="buttons">
                <ion-button expand="block" color="secondary" @click.stop="updateInventari" class="editBtn">
                    <ion-icon :icon="pencilSharp"></ion-icon>
                </ion-button>
                <ion-button expand="block" class="deleteBtn" color="secondary"
                    @click.stop="createConfirmationAlert('Estas segur que vols eliminar aquest rebost i el seu contingut?', estasSegur)">
                    <ion-icon :icon="trashBinSharp"></ion-icon>
                </ion-button>
            </div>
        </ion-card-content>

    </ion-card>
</template>
<script setup lang="ts">
import { IonText, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonButton, alertController, IonCol, IonRow, IonGrid, IonCardSubtitle,IonRippleEffect } from '@ionic/vue'
import { boat, pencilSharp, pencil, trashBinSharp } from 'ionicons/icons'
import { defineProps } from 'vue';
import { deleteRebost } from '@/APIService';
import { useRouter } from 'vue-router';
const router = useRouter()
const emit = defineEmits(['updateRebost', 'deleteRebost'])

const createConfirmationAlert = async (message: string, myHandler: any) => {
    let alert = await alertController.create({
        header: "Missatge del sistema",
        message,
        buttons: [{
            text: 'Si',
            htmlAttributes: {
                'aria-label': 'Si'
            },
            handler: myHandler
        },
        {
            text: 'No',
            htmlAttributes: {
                'aria-label': 'No'
            }
        }]
    })
    alert.present()
}

const estasSegur = async () => {
    await createConfirmationAlert("Recorda que aquesta acció no es pot desfer. Estas segur?", borrarInventari)
}

const props = defineProps({
    title: String,
    subtitle: String,
    content: String,
    idd: String
})

const goToRebost = () => {
    router.push(``)
}

const mostrarAlerta = async (missatge: string) => {
    const alert = await alertController.create({
        header: 'Missatge del sistema',
        message: missatge,
        buttons: ['Ok']
    })

    await alert.present();
}

const updateInventari = () => {
    emit('updateRebost', props.idd)
}

const borrarInventari = () => {
    let inventariId = props.idd
    deleteRebost(inventariId)
        .then((result) => {
            mostrarAlerta(`L'inventari s'ha esborrat correctament`)
            emit('deleteRebost', null)
        })
        .catch((err) => {
            mostrarAlerta(`Hi hagut un error esborrant l'inventari amb id ${inventariId}`)
        });
}
</script>
<style scoped>
ion-card {
    height: 130px;
    position: relative;
    /*background-image: linear-gradient(to right top, #5ec268, #57a25d, #508453, #476648, #3d4a3d);*/
   /* background-image: linear-gradient(to left top, #ffe7be, #dcbe8d, #b9965f, #977032, #744c00);*/
    border-radius:10px;
}


.buttons {
    position: absolute;
    right: 10px;
    display: flex
}
</style>