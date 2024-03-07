<template>
    <ion-page>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center">
                    <ion-col></ion-col>
                    <ion-col>
                        <h1 class="ion-text-center">Login</h1>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeMd="4">
                        <ion-list>
                            <ion-item>
                                <ion-label position="floating">Email</ion-label>
                                <ion-input 
                                    type="text" 
                                    v-model="email" 
                                    placeholder="Email">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Password</ion-label>
                                <ion-input 
                                    type="password" 
                                    v-model="password" 
                                    placeholder="Password">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-button style="width:100%" expand="block" @click="login">Login</ion-button>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
                <ion-row>
                    <ion-col></ion-col>
                    <ion-col size="12" sizeMd="4">
                        <p class="ion-text-center">No tens un compte? Creal
                            <router-link to="/signin">aquí</router-link>
                        </p>
                        <p class="ion-text-center">
                            O si ho prefereixer pots iniciar sessió mitjançant Google
                        </p>
                    </ion-col>
                    <ion-col></ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>
<script>
    import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem, IonList, IonButton, IonInput, IonLabel} from '@ionic/vue';
    export default{
        components:{IonPage, IonContent,IonGrid, IonRow, IonCol, IonItem, IonList, IonButton, IonInput, IonLabel},
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            login(){
                console.log(this.email,this.password);
                this.$router.push('/settings');
            }
        }
    }
</script>