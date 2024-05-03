import { ref, Ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { ElementToAdd } from '@/types';

export const useScanStore=defineStore('Scan',()=>{
    const elementsAfegir:Ref<ElementToAdd[]>=ref([])
    const clearStore=()=>{
        elementsAfegir.value=[]
    }

    const addItem=(item:ElementToAdd)=>{
        elementsAfegir.value.push(item)
    }

    const updateItem=(id:string,item:ElementToAdd)=>{
        let index=elementsAfegir.value.map(el=>el.aliment).indexOf(id)
        elementsAfegir.value[index]=item
    }
    const deleteItem=(id:string)=>{
        let index=elementsAfegir.value.map(el=>el.aliment).indexOf(id)
        elementsAfegir.value.splice(index,1)
    }
    return {
        elementsAfegir,
        clearStore,
        addItem,
        updateItem,
        deleteItem
    }
})