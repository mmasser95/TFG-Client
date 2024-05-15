import { describe, expect, test, beforeEach, beforeAll,vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavStore } from '@/store/favStore';

describe('Testejant la store dels preferits', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
    vi.mock("@/APIService/favs",()=>({
        createFav:vi.fn((favs,cb)=>{cb(null,null)})
    }))
  });
  test("getFavorites",()=>{
    const store=useFavStore()
    expect(store.favorites).toStrictEqual([])
  })
  test("Add favorites",()=>{
    const store=useFavStore()
    store.addFav("ID-001")
    expect(store.favorites).toStrictEqual(["ID-001"])
  })
});
