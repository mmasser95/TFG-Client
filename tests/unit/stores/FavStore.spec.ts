import { describe, expect, test, beforeEach, beforeAll, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavStore } from '@/store/favStore';

const myData = { preferits: ['ID-001', 'ID-003'] };

describe('Tests la store dels preferits', () => {
  //Com que la store realitza aquestes crides a la API es realitza el mock
  //Per a obtenir sempre la data definida anteriorment
  beforeAll(() => {
    //S'inicialitza la store de pinia per a poder provar la persistencia de les dades
    setActivePinia(createPinia());
    //Es realitza el mock de la llibreria que fa les peticions a la API
    vi.mock('@/APIService/favs', () => ({
      getFavs: vi.fn((cb) => {
        cb(null, myData);
      }),
      createFav: vi.fn((favs, cb) => {
        cb(null, null);
      }),
      deleteFav: vi.fn((favs, cb) => {
        cb(null, null);
      }),
    }));
  });


  test("S'inicialitza la store (En principi buida)", () => {
    const store = useFavStore();
    expect(store.favorites).toStrictEqual([]);
  });

  test("S'afegeix una id com a favorit a la store mitjançant el mètode addFav()", () => {
    const store = useFavStore();
    store.addFav('ID-001');
    expect(store.favorites).toStrictEqual(['ID-001']);
  });
  test("Es comprova amb isFav() que s'ha afegit correctament", () => {
    const store = useFavStore();
    expect(store.isFav('ID-001')).toBe(true);
  });
  test("Es comprova que funciona l'eliminació", () => {
    const store = useFavStore();
    store.removeFav('ID-001');
    expect(store.favorites).toStrictEqual([]);
  });
  test("I que a continuació, es retorna false perque la ID s'ha eliminat correctament", () => {
    const store = useFavStore();
    expect(store.isFav('ID-001')).toBe(false);
  });
  test("Es comprova que s'inicialitza correctament la store amb el mètode setLoginFavs", () => {
    const store = useFavStore();
    store.setLoginFavs();
    expect(store.isFav('ID-001')).toBe(true);
    expect(store.isFav('ID-002')).toBe(false);
    expect(store.isFav('ID-003')).toBe(true);
  });
});
