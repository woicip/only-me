<script setup>
    import { ref } from 'vue';

    // Components
    import MessagesLabel from '../User/MessagesLabel.vue';
    import MessagesContainer from './MessagesContainer.vue';
    import Message from '../Message/Message.vue';
    import MessageDetailContainer from './MessageDetailContainer.vue';
    import MessageDetail from '../Message/Detail.vue';
    import MessageNotAvailable from '../Message/NotAvailable.vue';
    import LoadingContainer from './LoadingContainer.vue';
    import LoadingUserMessage from '../Loading/UserMessage.vue';

    defineProps({
        messages: Array
    });

    const detail = {
        show: ref(false),
        id: ref(null)
    }

    function toggleDetail({ show, id }){
        detail.show.value = show;
        detail.id.value = id;
    }

</script>
<template>
    <section class="mobileL:px-[15px] tabletM:px-[20px] tabletL:px-[30px]">
        <MessagesLabel v-if="messages != null" :messagesLength="messages.length" />

        <section v-if="messages.length">
            <MessagesContainer v-if="messages.length && !detail.show.value">
                <div v-for="message in messages" :key="message.id">
                    <Message :id="message.id" :sender="message.sender" :message="message.message" :comments="message.comments" :postedAt="message.postedAt" :toggleDetail="toggleDetail" />
                </div>
            </MessagesContainer>
            
            <MessageDetailContainer v-if="messages.length && detail.show.value">
                <MessageDetail
                    :id="detail.id.value"
                    :user_id="user_id"
                    :sender="messages.filter(msg => msg.id === detail.id.value)[0].sender"
                    :message="messages.filter(msg => msg.id === detail.id.value)[0].message"
                    :comments="messages.filter(msg => msg.id === detail.id.value)[0].comments"
                    :postedAt="messages.filter(msg => msg.id === detail.id.value)[0].postedAt"
                    :toggleDetail="toggleDetail"
                    :GetUserMessages="GetUserMessages"
                />
            </MessageDetailContainer>

            <MessageNotAvailable v-if="!messages.length" />
        </section>

        <LoadingContainer v-else>
            <LoadingUserMessage />
            <LoadingUserMessage />
            <LoadingUserMessage />
            <LoadingUserMessage />
        </LoadingContainer>
    </section>
</template>