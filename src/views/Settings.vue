<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col>
                        <h1 class="ion-text-center">El meu perfil</h1>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeMd="6">
                        <ion-list :inset="true">
                            <ion-item v-for="item in listItems" :router-link="item.to" :button="true">
                                <ion-icon aria-hidden="true" :icon="item.icon" slot="start"></ion-icon>
                                <ion-label>{{item.label}}</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
            
        </ion-content>
    </ion-page>
</template>

<script lang="js">
import { IonPage, IonList, IonItem, IonLabel, IonIcon, IonButton, IonContent, IonCol, IonRow,IonGrid} from '@ionic/vue';
import { person, storefront, documentText, settings, helpCircle,briefcase, newspaper} from 'ionicons/icons';

export default {
    components:{IonPage, IonList,IonItem,IonLabel,IonIcon, IonButton, IonContent, IonCol, IonRow, IonGrid},
    
    data(){
        return{
            person,
            listItems:[
                {
                    icon:person,
                    label:"Perfil",
                    to:'/profile'
                },
                {
                    icon:settings,
                    label:"Ajustaments",
                    to:'/settings'
                },
                {
                    icon:documentText,
                    label:"Les meves comandes",
                    to:'/comandes'
                },
                {
                    icon:storefront,
                    label:"Inici de sessió amb establiment",
                    to:'/tenda'
                },
                {
                    icon:helpCircle,
                    label:"Centre d'ajuda",
                    to:'/help'
                },
                {
                    icon:briefcase,
                    label:"Legal",
                    to:"/legal"
                },
                {
                    icon:newspaper,
                    label:"Noticies",
                    to:"/news"
                }
            ]
        }
    }
}
</script>