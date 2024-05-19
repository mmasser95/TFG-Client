import { describe, expect, test, beforeEach, beforeAll, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavStore } from '@/store/favStore';

const myData = { preferits: ['ID-001', 'ID-003'] };

describe('Testejant la store dels preferits', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
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
  test('getFavorites', () => {
    const store = useFavStore();
    expect(store.favorites).toStrictEqual([]);
  });
  test('Add favorites', () => {
    const store = useFavStore();
    store.addFav('ID-001');
    expect(store.favorites).toStrictEqual(['ID-001']);
  });
  test('Is fav true', () => {
    const store = useFavStore();
    expect(store.isFav('ID-001')).toBe(true);
  });
  test('Is deleted', () => {
    const store = useFavStore();
    store.removeFav('ID-001');
    expect(store.favorites).toStrictEqual([]);
  });
  test('Is fav false', () => {
    const store = useFavStore();
    expect(store.isFav('ID-001')).toBe(false);
  });
  test('Set favs', () => {
    const store = useFavStore();
    store.setLoginFavs();
    expect(store.isFav('ID-001')).toBe(true);
    expect(store.isFav('ID-002')).toBe(false);
    expect(store.isFav('ID-003')).toBe(true);
  });
});
