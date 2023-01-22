import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const id = ref(null);
    const username = ref(null);
    const fullname = ref(null);
    const avatar = ref(null);
    const bio = ref(null);
    const messagesLength = ref(null);
    const isLoggedIn = ref(false);

    function idHandler(value){
        id.value = value;
    }

    function usernameHandler(value){
        username.value = value;
    }

    function fullnameHandler(value){
        fullname.value = value;
    }

    function avatarHandler(value){
        avatar.value = value;
    }

    function bioHandler(value){
        bio.value = value;
    }

    function messagesLengthHandler(value){
        messagesLength.value = value;
    }

    function setLoggedIn(value){
        isLoggedIn.value = value;
    }

    return { id, username, fullname, avatar, bio, messagesLength, isLoggedIn, idHandler, usernameHandler, fullnameHandler, avatarHandler, bioHandler, messagesLengthHandler, setLoggedIn };
});