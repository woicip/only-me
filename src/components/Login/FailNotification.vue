<script>
    export default {
        props: {
            message: String
        }
    }
</script>
<template>
    <p class="text-red-500 font-semibold text-sm rounded-md transition-all">{{ message }}</p>
</template>