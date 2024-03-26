<template>
    <form @submit.prevent="myFormSubmit()">
        <ion-item v-for="(item, k) in schema.state" :key="k">
            <ion-input :label="item.label" :label-placement="labelPlacement" :name="item.name"
                :type="item.type"></ion-input>
            <span></span>
        </ion-item>
    </form>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, Ref } from 'vue';
import { IonInput, IonItem } from '@ionic/vue';
const labelPlacement = "floating"
const emit = defineEmits(['onMySubmit'])
const props = defineProps(['schema'])
const schema = ref(props.schema)
const state = computed(() => schema.value.state)
const names = computed(() => state.value.map(item => item.name))
const myFormSubmit = () => {
    emit('onMySubmit', schema.value)
}
onMounted(() => {
    console.log(names.value)
})
</script>
<style></style>