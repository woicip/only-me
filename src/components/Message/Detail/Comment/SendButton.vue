<script setup>
    const props = defineProps({
        comment: Boolean,
        showSendProcess: Boolean,
        handler: Function
    });

    function userPostComment(){
        props.handler();
    }

</script>
<template>
    <div>
        <button v-if="props.comment" class="h-full flex flex-col px-4 text-white border-white/10 bg-indigo-500" @click="userPostComment">
            <p v-if="!props.showSendProcess" class="mt-5 font-bold text-white">SEND</p>
            <img v-else src="../../../../assets/loading-white.svg" alt="loading" class="w-[38px] h-full" />
        </button>

        <button v-else class="h-full px-4 font-bold text-white/10 border-white/10 bg-black/5" disabled>SEND</button>
    </div>
</template>