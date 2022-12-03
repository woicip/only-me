<script>
    export default {
        props: {
            name: String
        }
    }
</script>

<template>
    <button type="button" class="w-full mt-[10px] py-[13px] rounded-[8px] text-white/20 font-semibold bg-indigo-500/20" disabled>{{ name }}</button>
</template>