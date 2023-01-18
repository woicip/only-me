<script>
    export default {
        props: {
            message: String,
            timer: Number
        }
    }
</script>

<template>
    <section class="flex items-center justify-between mb-[10px] bg-green-500/50 px-[15px] py-[10px] rounded-lg animate-fadeIn">
        <p class="text-sm text-white">{{ message }}</p>
        <p class="text-sm text-white font-bold">{{ timer }}</p>
    </section>
</template>