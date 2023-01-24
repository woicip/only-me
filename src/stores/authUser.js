import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const id = ref(null);
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
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
        const URLs = value.match(regex);
        const breakpoints = value.split('\n');
        
        value = breakpoints.join(' <br/> ');
        
        URLs.forEach(url => {
            value = value.replace(`${url}`, `<a href="${url}" target="_blank" rel="noreferrer" class="text-blue-400 font-medium hover:underline">${url}</a>`);
        });

        bio.value = value;
    }

    function messagesLengthHandler(value){
        messagesLength.value = value;
    }

    function setLoggedIn(value){
        isLoggedIn.value = value;
    }

    return { id, username, fullname, avatar, bio, verified, messagesLength, isLoggedIn, idHandler, usernameHandler, fullnameHandler, avatarHandler, bioHandler, verifiedHandler, messagesLengthHandler, setLoggedIn };
});