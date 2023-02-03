import { defineStore } from "pinia";
import { ref } from "vue";
import parseText from "../functions/parseText";

export const useAuthStore = defineStore('auth', () => {
    const id = ref(null);
    const email = ref(null);
    const username = ref(null);
    const fullname = ref(null);
    const avatar = ref(null);
    const bio = ref(null);
    const verified = ref(null);
    const messagesLength = ref(null);
    const isLoggedIn = ref(false);

    function idHandler(value){
        id.value = value;
    }

    function usernameHandler(value){
        username.value = value;
    }

    function emailHandler(value){
        email.value = value;
    }

    function fullnameHandler(value){
        fullname.value = value;
    }

    function avatarHandler(value){
        avatar.value = value;
    }

    function verifiedHandler(value){
        verified.value = value;
    }

    function bioHandler(value){
        const result = parseText(value);
        bio.value = result;
    }

    function messagesLengthHandler(value){
        messagesLength.value = value;
    }

    function setLoggedIn(value){
        isLoggedIn.value = value;
    }

    return { id, username, email, fullname, avatar, bio, verified, messagesLength, isLoggedIn, idHandler, usernameHandler, emailHandler, fullnameHandler, avatarHandler, bioHandler, verifiedHandler, messagesLengthHandler, setLoggedIn };
});