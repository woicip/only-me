<script setup>
    const props = defineProps({
        name: String,
        desc: String
    })
</script>
<template>
    <button class="w-full flex items-center justify-between text-left py-[15px] px-[20px] border-b border-white/10 hover:bg-white/5 group">
        <div class="flex items-center">
            <div class="w-[20px] h-[20px] bg-white/30 rounded-full"></div>
            <div class="ml-[20px]">
                <h1 class="text-[16px]">{{ props.name }}</h1>
                <p class="text-white/50 text-[13px]">{{ props.desc }}</p>
            </div>
        </div>

        <img src="../../../assets/arrow-account.svg" alt="arrow" class="w-[10px] mr-[10px] hidden animate-fadeIn group-hover:block" />
    </button>
</template>