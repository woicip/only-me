<script setup>
    const props = defineProps({
        comment: String,
        commentInputHandler: Function,
        textareaGrow: Function
    });

    function textAreaGrowHandler(e){
        props.textareaGrow(e);
    }

    function inputHandler(e){
        props.commentInputHandler(e.target.value);
    }
</script>
<template>
    <textarea placeholder="Write your comment ..." class="bg-black/5 resize-none w-full min-h-[45px] text-white leading-[24px] p-[10px] px-[20px] focus:outline-none border border-white/10" @input="inputHandler" @keyup="textAreaGrowHandler">
    </textarea>
</template>