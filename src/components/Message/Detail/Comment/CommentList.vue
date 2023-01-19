<script setup>
    import Comment from '../../../Comment/Index.vue';

    const props = defineProps({
        comments: Array
    });
</script>
<template>
    <section v-for="comment in props.comments" :key="comment.id" class="w-full">
        <Comment :author="comment.author" :message="comment.message" :time="comment.postedAt" />
    </section>
</template>