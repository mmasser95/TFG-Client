import { ref, Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { createFav, deleteFav, getFavs } from '@/APIService';

export const useFavStore = defineStore('fav', () => {
  const favorites: Ref<string[]> = ref([]);

  const setFavs = (favs: string[]) => {
    favorites.value = favs;
  };

  const setLoginFavs = () => {
    getFavs()
      .then((res) => {
        if (res.data.preferits) setFavs(res.data.preferits);
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };

  const addFav = (fav: string) => {
    createFav(fav)
      .then((res) => {
        favorites.value.push(fav);
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };

  const isFav = (fav: string) => {
    return favorites.value.includes(fav);
  };

  const removeFav = (fav: string) => {
    deleteFav(fav)
      .then((res) => {
        let indexEliminar = favorites.value.indexOf(fav);
        favorites.value.splice(indexEliminar, 1);
      })
      .catch((err) => {
        console.log('err :>> ', err);
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
