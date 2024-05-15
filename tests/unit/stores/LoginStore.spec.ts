import { describe, expect, test, beforeEach,beforeAll } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {useLoginStore} from '@/store/loginStore'

describe("Testejant la store del login",()=>{
    beforeAll(()=>{
        setActivePinia(createPinia())
    })

    test("Set Token",()=>{
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        const store=useLoginStore()
        store.setToken(token)
        expect(store.token).toBe(token)
    })

    test("Set UserId",()=>{
        const id="ID-001"
        const store=useLoginStore()
        store.setUserId(id)
        expect(store.userId).toBe(id)
    })
    
    test("Set UserType",()=>{
        const userType="client"
        const store=useLoginStore()
        store.setUserType("client")
        expect(store.userType).toBe(userType)
    })

    test("Persistency throught scopes",()=>{
        const store=useLoginStore()
        expect(store.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
        expect(store.userId).toBe("ID-001")
        expect(store.userType).toBe("client")
    })

    test("Computed property loggedIn", ()=>{
        const store=useLoginStore()
        expect(store.loggedIn).toBe(true)
        store.setToken("")
        store.setUserId("")
        expect(store.loggedIn).toBe(false)
    })
})