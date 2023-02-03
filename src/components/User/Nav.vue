<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const userID = route.params.id;
</script>
<template>
    <nav class="tabletL:px-[30px] tabletM:px-[20px] flex items-center justify-between mb-[30px] pb-[10px] border-b border-white/5">
        <a href="/" class="text-lg font-bold text-white/90 mobileL:px-[15px]">OnlyMe</a>
        <p class="text-xs text-white/70 mobileL:mr-[15px]">{{ userID }}</p>
    </nav>
</template>