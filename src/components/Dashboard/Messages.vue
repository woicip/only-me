<script setup>
    import { onMounted, ref } from 'vue';
    import LoadingUserMessageDetail from '../Loading/UserMessageDetail.vue';
    import userMessagesQuery from '../../../graphql/query/userMessages';
    import MessageDetail from '../Message/Detail.vue';
    import { useAuthStore } from '../../stores/authUser';
    import parseJWT from '../../functions/parseJWT';
    import graphql from '../../fetchs/graphql';

    const authUser = useAuthStore();

    const messages = ref([]);
    const loadingState = ref(true);
    const errorState = ref(false);

    const parsed = parseJWT(localStorage.getItem('onl_auth'));
    const userID = parsed.id.split('-')[1];

    async function GetUserMessages(){
        const result = await graphql({ query: userMessagesQuery(userID) });
        const { userMessages } = result.data;

        if(userMessages.status === 'OK'){
            authUser.messagesLengthHandler(userMessages.messages.length);
            messages.value = userMessages.messages;
            loadingState.value = false;

        } else {
            errorState(true);
        }
    };

    onMounted(() => {
        GetUserMessages();
    })

</script>
<template>
    <section class="animate-fadeIn mobileL:px-[15px] tabletL:px-[30px] tabletM:px-[20px]">
        <LoadingUserMessageDetail v-if="loadingState" />

        <div v-else>
            <div v-if="errorState" class="w-full mt-[30px] bg-white/5 rounded-xl py-[20px] px-[20px] flex items-center justify-center border border-white/10">
                <h1>Error while getting your messages :(</h1>
            </div>

            <div v-else v-for="message in messages" :key="message.id">
                <MessageDetail
                    :id="message.id"
                    :user_id="authUser.id"
                    :sender="message.sender"
                    :message="message.message"
                    :comments="message.comments"
                    :postedAt="message.postedAt"
                    :GetUserMessages="GetUserMessages"
                    dashboard
                />
            </div>

            <div v-if="!messages">
                <h1 class="w-full py-[100px] text-center text-white/50">Messages will appear here if someone send you a message</h1>
            </div>
        </div>
    </section>
</template>