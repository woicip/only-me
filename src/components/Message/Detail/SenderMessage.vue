<script setup>
    import parseText from '../../../functions/parseText';

    const props = defineProps({
        sender: String,
        message: String,
        hoursMinutes: String
    })

    const message = parseText(props.message);
</script>
<template>
    <div class="text-left">
        <div class="flex items-center">
            <h1 class="text-[15px] mobileL:text-[14px] font-bold">{{ props.sender }}</h1>
            <!-- <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div> -->
        </div>

        <div v-bind:innerHTML="message" class="mt-[5px] text-[15px] mobileL:text-[14px] text-white/80"></div>
    </div>
</template>