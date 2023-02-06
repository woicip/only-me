<script setup>
    const props = defineProps({
        comment: String,
        CommentHandler: Function,
        TextareaGrow: Function
    });

    function textAreaGrowHandler(e){
        props.TextareaGrow(e);
    }

    function inputHandler(e){
        props.CommentHandler(e.target.value);
    }
</script>
<template>
    <textarea :value="comment" placeholder="Write your comment ..." class="bg-black/5 resize-none w-full text-white leading-[24px] py-[10px] px-[20px] transition-all outline-none placeholder:text-white/30" @input="inputHandler" @keyup="textAreaGrowHandler">
    </textarea>
</template>