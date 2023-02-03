<script setup>
    const props = defineProps({
        handler: Function
    });

    function toggleDetail({ show, id }){
        props.handler({ show, id });
    }
</script>
<template>
    <button class="py-[5px] px-[10px] text-[14px] text-white/80 bg-white/10 rounded-full" @click="toggleDetail({ show: false, id: null })">Close</button>
</template>