<script>
    export default {
        props: {
            handler: Function
        },
        methods: {
            clickHandler(){
                this.handler();
            }
        }
    }
</script>
<template>
    <img src="../../assets/interface-edit-view-off-interface-white.svg" alt="icon" class="w-[21px] h-full absolute top-0 right-5 cursor-pointer z-10" @click="clickHandler"/>
</template>