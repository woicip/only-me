<script setup>
    const props = defineProps({
        sender: String,
        message: String,
        hoursMinutes: String
    })
</script>
<template>
    <div class="text-left">
        <div class="flex items-center">
            <h1 class="text-[15px] font-bold">{{ props.sender }}</h1>
            <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div>
            <p class="text-[12px] text-white/40">{{ props.hoursMinutes }}</p>
        </div>

        <p v-bind:innerHTML="props.message" class="mt-[5px] text-[15px] text-white/80"></p>
    </div>
</template>