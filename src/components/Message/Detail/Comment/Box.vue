<script setup>
    const props = defineProps({
        comment: String,
        handler: Function
    });

    function textareaGrow(){
        props.handler();
    }
</script>
<template>
    <textarea :value="props.comment" placeholder="Write your comment ..." class="bg-black/5 resize-none w-full min-h-[45px] text-white leading-[24px] p-[10px] px-[20px] focus:outline-none" @keyup="textareaGrow"></textarea>
</template>