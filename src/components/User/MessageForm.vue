<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import graphql from '../../fetchs/graphql';
    import sendMessageQuery from '../../../graphql/mutation/sendMessage';

    // Components
    import InputText from '../Input/Text.vue';
    import InputTextarea from '../Input/Textarea.vue';
    import ActiveButton from '../Buttons/Active.vue';
    import LoadingButton from '../Buttons/Loading.vue';
    import DisabledButton from '../Buttons/Disable.vue';

    // Fetchs
    import UserMessagesGraphQL from '../../../graphql/fetch/UserMessagesGraphQL';

    const route = useRoute();
    const user_id = route.params.id;

    const sender = ref("");
    const message = ref("");
    const sendProcess = ref(false);

    function senderInput(e){
        sender.value = e.target.value;
    }

    function messageInput(e){
        message.value = e.target.value;
    }

    async function SendMessageGraphQL(userID, senderName, message){
        try {
            const date = new Date();
            const sendMessageToUser = await graphql({ query: sendMessageQuery(userID, senderName, message, date) });
            const { sendMessage } = sendMessageToUser.data;
            return [ sendMessage, null ];

        } catch(err){
            return [ null, true ];
        }
    }

    async function SendMessage(){
        sendProcess.value = true;

        const senderName = `${sender.value.length < 1 ? "Anonymous" : sender.value}`;
        const [ result, error ] = await SendMessageGraphQL(user_id, senderName, message.value);

        if(error){
            alert("SOMETHING_WENT_WRONG");

        } else {
            const { status } = result;

            if(status === "OK"){
                sender.value = "";
                message.value = "";
                sendProcess.value = false;
    
            } else {
                alert('FAILED TO SEND MESSAGE');
            }
        }

    }

</script>
<template>
    <main class="mobileL:px-[15px] tabletM:px-[20px] tabletL:px-[30px]">
        <section class="mt-[50px] py-[15px] pb-[20px] bg-white/5 border border-white/10 rounded-2xl">
            <h1 class="px-[20px] text-lg mobileL:text-[15px] font-medium text-white/80 pb-[15px] border-b border-white/10">Send Message</h1>

            <div class="mt-[15px]">
                <div class="px-[15px]">
                    <div class="py-[10px] pb-[0px] px-[15px] group hover:bg-white/5 transition-all rounded-lg" :class="{ 'bg-white/5': sender.length }">
                        <label for="name" class="text-white/80 text-[14px]">Sender Name</label>
                        <input id="name" type="text" placeholder="Anonymous" class="w-full pt-[5px] py-[15px] outline-none mobileL:text-[14px] text-white bg-transparent placeholder:text-white/30 transition-all" @input="senderInput">
                    </div>
                </div>

                <div class="my-[15px] w-full h-[1px] bg-white/10"></div>

                <div class="px-[15px]">
                    <div class="py-[10px] pb-[0px] px-[15px] group hover:bg-white/5 transition-all rounded-lg" :class="{ 'bg-white/5': message.length }">
                        <label for="message" class="text-white/80 text-[14px]">Message</label>
                        <textarea id="message" type="text" placeholder="Your message ..." class="w-full h-[100px] pt-[5px] py-[10px] outline-none mobileL:text-[14px] resize-none text-white bg-transparent placeholder:text-white/30 focus:border-white/60 transition-all" @input="messageInput"></textarea>
                    </div>
                </div>

                <div class="mt-[5px] px-[15px]">
                    <ActiveButton v-if="message.length && !sendProcess" name="Send Message" :handler="SendMessage" />
                    <LoadingButton v-else-if="message.length && sendProcess" />
                    <DisabledButton v-else name="Send Message" />
                </div>
            </div>
        </section>
    </main>
</template>