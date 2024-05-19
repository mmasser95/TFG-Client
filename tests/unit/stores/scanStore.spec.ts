import { describe, expect, test, beforeEach, beforeAll,vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useScanStore } from '@/store/scanStore';

const elements=[
    {aliment:"tomaquet",quantitat:2,q_unitat:"unitats"},
    {aliment:"pera",quantitat:3,q_unitat:"unitats"}
]

describe("Tests de store/scanStore.ts",()=>{
    beforeAll(()=>{
        setActivePinia(createPinia())
    })

    test("add item",()=>{
        const store=useScanStore()
        store.addItem(elements[0])
        expect(store.elementsAfegir[0].aliment).toBe("tomaquet")
    })
    test("updateItem",()=>{
        const store=useScanStore()
        store.updateItem("tomaquet",elements[1])
        expect(store.elementsAfegir[0].aliment).toBe("pera")
    })
    test("addOtherItem",()=>{
        const store=useScanStore()
        store.addItem(elements[0])
        expect(store.elementsAfegir[0].aliment).toBe("pera")
        expect(store.elementsAfegir[1].aliment).toBe("tomaquet")
    })

    test("deleteItem",()=>{
        const store=useScanStore()
        store.deleteItem("pera")
        expect(store.elementsAfegir[0].aliment).toBe("tomaquet")
    })
    test("clearStore",()=>{
        const store=useScanStore()
        expect(store.elementsAfegir.length).toBe(1)
        store.clearStore()
        expect(store.elementsAfegir).toStrictEqual([])
    })
})