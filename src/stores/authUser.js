import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const id = ref(null);
    const username = ref(null);
    const isLoggedIn = ref(false);

    function idHandler(value){
        id.value = value;
    }

    function usernameHandler(value){
        username.value = value;
    }

    function setLoggedIn(value){
        isLoggedIn.value = value;
    }

    return { id, username, isLoggedIn, idHandler, usernameHandler, setLoggedIn };
});