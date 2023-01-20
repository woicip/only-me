<script setup>
    const props = defineProps({
        title: String,
        desc: String
    })
</script>
<template>
    <div class="p-[20px] pb-[10px] rounded-xl bg-white/10 hover:bg-indigo-500 transition-all border border-white/10">
        <h1 class="font-bold text-[18px]">{{ props.title }}</h1>
        <p class="mt-[15px] text-sm leading-normal text-white/70">{{ props.desc }}</p>
    </div>
</template>