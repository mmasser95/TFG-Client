import { ref, Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { createFav, deleteFav, getFavs } from '@/APIService/favs';

export const useFavStore = defineStore('fav', () => {
  const favorites: Ref<string[]> = ref([]);

  const setFavs = (favs: string[]) => {
    favorites.value = favs;
  };

  const setLoginFavs = () => {
    getFavs((err: any, data: any) => {
      if (err) return;
      if (data.preferits) setFavs(data.preferits);
    });
  };

  const addFav = (fav: string) => {
    createFav(fav, (err: any, data: any) => {
      if (err) return;
      favorites.value.push(fav);
    });
  };

  const isFav = (fav: string) => {
    return favorites.value.includes(fav);
  };

  const removeFav = (fav: string) => {
    deleteFav(fav, (err: any, data: any) => {
      if (err) return;
      let indexEliminar = favorites.value.indexOf(fav);
      favorites.value.splice(indexEliminar, 1);
    });
  };

  return {
    favorites,
    setFavs,
    setLoginFavs,
    addFav,
    isFav,
    removeFav,
  };
});
