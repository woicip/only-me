<script>
    export default {
        props: {
            message: String
        }
    }
</script>
<template>
    <p class="py-[10px] px-[10px] text-white text-sm font-medium rounded-md transition-all bg-orange-500/70">{{ message }}</p>
</template>