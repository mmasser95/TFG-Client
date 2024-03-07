<template>
    <ion-card>
        <img :src="imageURL" alt="Imatge de la card" srcset="">
        <ion-card-header>
            <ion-card-title>{{ title }}</ion-card-title>
            <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>{{ content }}</ion-card-content>
        <ion-button fill="clear">Visitar</ion-button>
    </ion-card>
</template>
<script>
    import {IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent} from '@ionic/vue';
    export default {
        components:{
            IonCard,
            IonCardTitle,
            IonCardSubtitle,
            IonCardHeader,
            IonCardContent,
        },
        props:['title','subtitle','content', 'imageURL'],
        name:'MyCard'
    }
</script>

<style>
    img{
        width: 100%;
        height: 100px;
    }
</style>