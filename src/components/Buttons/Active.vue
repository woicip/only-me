<script>
    export default {
        props: {
            name: String,
            handler: Function
        },
        methods: {
            clickHandler(){
                handler();
            }
        }
    }
</script>

<template>
    <button type="submit" class="w-full mt-[10px] py-[13px] rounded-[8px] text-white font-semibold bg-indigo-500 animate-fadeIn" @click="handler">{{ name }}</button>
</template>