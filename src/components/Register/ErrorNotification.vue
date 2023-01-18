<script>
    export default {
        props: {
            message: String
        }
    }
</script>
<template>
    <section class="mb-[10px] bg-red-500 px-[15px] py-[3px] rounded-lg animate-fadeIn">
        <p class="text-sm text-white">{{ message }}</p>
    </section>
</template>