<script setup>
    const props = defineProps({
        remove: Boolean
    })
</script>
<template>
    <section class="w-full h-fit pb-[13px] flex flex-col items-start justify-between text-white bg-white/10 overflow-hidden rounded-[15px] animate-fadeIn" :class="{ 'bg-red-700': props.remove, 'blur-sm': props.remove }">
        <slot></slot>
    </section>
</template>