<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeMd="6">
                        <h1 class="ion-text-center">Sign In</h1>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeMd="6">
                        <ion-list>
                            <ion-item>
                                <ion-label position="floating">Nom</ion-label>
                                <ion-input 
                                    type="text" 
                                    v-model="form.nom">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Cognoms</ion-label>
                                <ion-input 
                                    type="text"
                                    v-model="form.cognoms">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Correu Electrónic</ion-label>
                                <ion-input 
                                    type="email"
                                    v-model="form.email">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Data de naixement</ion-label>
                                <ion-input 
                                    type="date"
                                    v-model="form.data_naixement">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Telefon</ion-label>
                                <ion-input 
                                    type="tel"
                                    v-model="form.telefon">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Contrassenya</ion-label>
                                <ion-input 
                                    type="password"
                                    v-model="form.contrassenya">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Repeteix la contrassenya</ion-label>
                                <ion-input 
                                    type="password"
                                    v-model="form.contrassenya2">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-button style="width:100%" expand="block" @click="signIn">Sign In</ion-button>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>
import {IonPage, IonContent,IonGrid,IonRow,IonCol,IonInput,IonButton} from '@ionic/vue';

export default {
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton
    },
    data(){
        return{
            form:{
                nom:'',
                cognoms:'',
                email:'',
                data_naixement:'',
                telefon:'',
                contrassenya:'',
                contrassenya2:''
            }
        }
    },
    methods:{
        signIn(){
            console.log(this.form)
        }
    }
}
</script>