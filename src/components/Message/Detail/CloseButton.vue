<script setup>
    const props = defineProps({
        handler: Function
    });

    function toggleDetail({ show, id }){
        props.handler({ show, id });
    }
</script>
<template>
    <button class="py-[2px] px-[5px] text-xs text-white/25 hover:text-white hover:bg-white/10 rounded-full" @click="toggleDetail({ show: false, id: null })">Close</button>
</template>