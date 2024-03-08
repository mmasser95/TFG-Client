import {defineStore} from 'pinia';

export const useStore = defineStore('login', {
    state: () => {
        return {
            user_id:'',
            token:'',
            logged:false,
        }
    },
    getters: {
        getUser_id: (state) => state.user_id,
        getToken: (state) => state.token,
        getLogged: (state) => state.logged
    },
    actions: {
        set_user_id(state,user_id){
            state.user_id=user_id;
        },
        set_token(state,token){
            state.token=token;
        },
        set_logged(state,logged){
            state.logged=logged;
        }
    }
});