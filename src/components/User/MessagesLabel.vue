<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        messagesLength: Number
    });

    const labelName = computed(() => {
        return props.messagesLength > 1 ? 'Messages' : 'Message'
    });
</script>
<template>
    <div class="mt-[40px] pb-[20px] text-white border-b border-white/20 flex items-center justify-between">
        <div class="flex">
            <p class="w-full h-[26px] mr-[8px] pt-[1px] px-[10px] text-center text-[16px] rounded-full text-white bg-indigo-500/80 font-semibold">{{ messagesLength }}</p>
            <h1 class="text-[16px] font-semibold">{{ labelName }}</h1>
        </div>
    </div>
</template>