<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({ 
        username: String, 
        password: String,
        login: Function
    });

    function clickHandler(){
        props.login();
    }
</script>
<template>
    <button v-show="props.username.length && props.password.length" class="w-full mt-[10px] py-[14px] text-md rounded-[8px] text-white text-[16px] font-semibold bg-indigo-500 animate-fadeIn focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-600" @click="clickHandler">Sign In</button>
</template>