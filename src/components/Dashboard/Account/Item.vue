<script setup>
    const props = defineProps({
        name: String,
        desc: String,
        image: String,
        handler: Function
    })
</script>
<template>
    <button class="w-full flex items-center justify-between text-left py-[13px] px-[20px] border-b border-white/5 hover:bg-white/5 group cursor-pointer" @click="props.handler">
        <div class="flex items-center">
            <img :src="props.image" alt="name" class="w-[25px]">
            <div class="ml-[20px]">
                <h1 class="text-[16px]">{{ props.name }}</h1>
                <p class="text-white/50 text-[13px]">{{ props.desc }}</p>
            </div>
        </div>

        <img src="../../../assets/arrow-account.svg" alt="arrow" class="w-[10px] mr-[10px] hidden animate-fadeIn group-hover:block" />
    </button>
</template>