<script setup>
    const props = defineProps({
        comment: String,
        showSendProcess: Boolean,
        handler: Function
    });

    function userPostComment(){
        props.handler();
    }

</script>
<template>
    <div>
        <button v-if="props.comment.length" class="w-[70px] h-full flex flex-col items-center justify-center px-4 text-white border-l border-white/10 bg-indigo-500" @click="userPostComment">
            <p v-if="!props.showSendProcess" class="font-bold text-white">SEND</p>
            <img v-else src="../../../../assets/loading-white.svg" alt="loading" class="w-[38px] h-full" />
        </button>

        <button v-else class="w-[70px] h-full px-4 font-bold text-white/10 border-l border-white/10 bg-black/5" disabled>
            SEND
        </button>
    </div>
</template>