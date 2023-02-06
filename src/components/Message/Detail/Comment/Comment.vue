<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../../../stores/authUser';
    import SendCommentGraphQL from '../../../../../graphql/fetch/SendCommentGraphQL';

    // Components
    import CommentBox from './Box.vue';
    import SendButton from './SendButton.vue';

    const props = defineProps({
        message_id: String,
        GetUserMessages: Function
    });

    const authUser = useAuthStore();
    const comment = ref('');
    const ShowSendProcess = ref(false);

    function CommentHandler(value){
        comment.value = value;
    }

    async function SendComment(){
        const CommentData = {
            message_id: props.message_id,
            author: authUser.isLoggedIn ? true : false,
            message: comment.value,
            postedAt: new Date()
        }

        const [ sendComment, error ] = await SendCommentGraphQL(CommentData.message_id, CommentData.author, CommentData.message, CommentData.postedAt);

        if(error){
            alert("SOMETHING_WENT_WRONG!");

        } else {
            if(sendComment.status === 'OK'){
                comment.value = "";
                props.GetUserMessages();

            } else {
                alert("FAILED TO SEND COMMENT");
            }
        }
    }

    function TextareaGrow(e){
        const target = e.target;
        const value = e.target.value;
        comment.value = value;

        const minHeight = 50;
        const lineHeight = 24;
        const padding = 10;
        const borderRadius = 6;
        const lineBreaks = value.split(/\n/).length - 1;

        if(lineBreaks < 5){
            const newHeight = minHeight + (lineBreaks * lineHeight) + padding + borderRadius;
            target.style.height = `${newHeight}px`;
        }
    }
</script>
<template>
    <div class="mt-[5px] w-full flex justify-between border-b border-t border-white/10">
        <CommentBox :comment="comment" :CommentHandler="CommentHandler" :TextareaGrow="TextareaGrow" />
        <SendButton :comment="comment" :ShowSendProcess="ShowSendProcess" :handler="SendComment" />
    </div>
</template>