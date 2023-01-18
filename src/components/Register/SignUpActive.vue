<script>
    export default {
        props: {
            register: Function
        }
    }
</script>

<template>
    <button class="w-full mt-[10px] text-white font-bold py-[13px] px-[15px] bg-indigo-500 animate-fadeIn rounded-lg transition-all" @click="register">Sign Up</button>
</template>