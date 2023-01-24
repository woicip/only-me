<script setup>
    const props = defineProps({
        dateTimestamp: String,
        hoursMinutes: String
    })
</script>
<template>
    <div class="mt-[35px] flex items-center">
        <p class="text-[12px] text-white/40">{{ props.hoursMinutes }}</p>
        <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div>
        <p class="text-[12px] text-white/40">{{ props.dateTimestamp }}</p>
    </div>
</template>