<script setup>
    import { ref } from 'vue';
    
    const showChangeEmail = ref(false);

    const newEmail = {
        email: ref('')
    }

    const emailPassword = {
        visible: ref(false),
        password: ref(''),
        wrong: ref(false),
        wrongMessage: ref('')
    }

    async function updateEmail(){

    }

    function changeEmailHandler(){
        showChangeEmail.value = !showChangeEmail.value;
    }

    function newEmailHandler(e){
        newEmail.email.value = e.target.value;
    }

    function emailPasswordHandler(e){
        emailPassword.password.value = e.target.value;
    }
</script>
<template>
    <div>
        <button v-if="!showChangeEmail" class="py-[5px] px-[10px] text-[13px] mt-[15px] font-medium rounded-[5px] text-white/60 border border-white/10 transition-all hover:border-indigo-500 hover:text-white hover:bg-indigo-500" @click="changeEmailHandler">Change Email</button>
        
        <form v-if="showChangeEmail" class="mt-[25px]">
            <h1 class="mobileL:text-[14px] font-medium">Change Email Address</h1>
            <input :value="newEmail.email.value" type="text" placeholder="New email address" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="newEmailHandler">
            <input :value="emailPassword.password.value" type="password" placeholder="Current password" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="emailPasswordHandler">

            <button v-if="newEmail.email.value.length && emailPassword.password.value.length" class="w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 animate-fadeIn" @click="updateEmail">
                <p v-if="!updating" class="font-medium">Save Changes</p>
                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="24px" height="22px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="13" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </button>
            <button v-else disabled class="opacity-50 w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 cursor-not-allowed">Save Changes</button>
        </form>
    </div>
</template>