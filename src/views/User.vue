<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    import Message from '../components/Message/Message.vue'
    import MessageDetail from '../components/Message/Detail.vue';
    import MessageNotAvailable from '../components/Message/NotAvailable.vue';
    import User from '../components/User/ProfileHeader.vue';
    import InputText from '../components/Input/Text.vue';
    import InputTextarea from '../components/Input/Textarea.vue';
    import ActiveButton from '../components/Buttons/Active.vue';
    import DisabledButton from '../components/Buttons/Disable.vue';
    import LoadingButton from '../components/Buttons/Loading.vue';
    import LoadingUserProfile from '../components/Loading/UserProfile.vue';
    import LoadingUserMessage from '../components/Loading/UserMessage.vue';
    import parseURL from '../functions/parseURL';
    import parseNL from '../functions/parseNL';

    // graphql
    import graphql from '../fetchs/graphql';
    import userQuery from '../../graphql/query/user';
    import userMessagesQuery from '../../graphql/query/userMessages';
    import sendMessageQuery from '../../graphql/mutation/sendMessage';

    const route = useRoute();
    const userID = route.params.id;

    const id = ref(null);

    const bio = ref(null);
    const username = ref(null);
    const fullname = ref(null);
    const avatar = ref(null);
    const verified = ref(null);
    const messages = ref([]);

    const sender = ref("");
    const message = ref("");

    const sendProcess = ref(false);

    const detail = {
        show: ref(false),
        id: ref(null)
    }

    const user = {
        profile: ref(false),
        messages: ref(false),
    }

    const xss = ref(0);

    const whetherMessage = computed(() => {
        return messages.length > 1 ? "Messages" : "Message";
    });

    const completeID = computed(() => {
        return `sc-${userID}`
    });

    async function FetchUserProfile(){
        const { data: { user } } = await graphql({ query: userQuery(completeID.value) });
        return { status: user.status, data: user.data };
    }

    async function GetUserMessages(){
        const { data: { userMessages } } = await graphql({ query: userMessagesQuery(completeID.value) });
        if(userMessages.code === 200){
            user.messages.value = true;
            messages.value = userMessages.messages;

        } else {
            alert("Failed Getting Messages");
        }
    };

    async function GetUserProfile(){
        const { status, data } = await FetchUserProfile();
        
        if(status === "OK"){
            user.profile.value = true;
            id.value = data.id;
            bio.value = data.bio;
            avatar.value = data.avatar;
            fullname.value = data.fullname;
            username.value = data.username;
            verified.value = data.verified;
            document.title = `${data.username} - Only Me`;

        } else {
            alert("Failed when getting user information.");
        }
    };

    async function SendMessage(){
        sendProcess.value = true;

        const parseMessageURL = parseURL(message.value);
        const parseMessageNL = parseNL(parseMessageURL);
        const whoSender = `${sender.value.length < 1 ? "Anonymous" : sender.value}`;

        const sendMessageToUser = await graphql({ query: sendMessageQuery(completeID.value, whoSender, parseMessageNL) });
        const { sendMessage } = sendMessageToUser.data;
        if(sendMessage.status === "OK"){
            sender.value = "";
            message.value = "";
            sendProcess.value = false;
            GetUserMessages();

        } else {
            alert(message);
        }
    }

    function senderInput(value){
        sender.value = value;
    }

    function messageInput(value){
        message.value = value;
    }

    function toggleDetail({ show, id }){
        detail.show.value = show;
        detail.id.value = id;
    }

    onMounted(() => {
        GetUserProfile();
        GetUserMessages();
    });

</script>


<template>
    <main class="">
        <section class="w-[536px] mx-auto py-[30px] mobileL:py-[10px] mobileL:w-screen">
            <nav class="flex items-center justify-between mb-[30px] pb-[10px] border-b border-white/5">
                <a href="/" class="text-lg font-bold text-white/90 mobileL:px-[15px]">OnlyMe</a>
                <p class="text-xs text-white/30 font-thin mobileL:mr-[15px]">{{ completeID }}</p>
            </nav>

            <section class="mobileL:px-[15px]">
                <LoadingUserProfile v-if="!user.profile.value" />
                <User v-else :avatar="avatar" :username="username" :fullname="fullname" :bio="bio" :verified="verified" />
            </section>

            <section class="mt-[50px] mobileL:px-[15px]">
                <InputText name="Sender Name" placeholder="Anonymous by default" :value="sender" :handler="senderInput" />
                <InputTextarea name="Your Message" placeholder="Write your message ..." :value="message" :handler="messageInput" />
                
                <ActiveButton v-if="message.length && !sendProcess" name="Send Message" :handler="SendMessage" />
                <LoadingButton v-else-if="message.length && sendProcess" />
                <DisabledButton v-else name="Send Message" />
            </section>

            <section class="mobileL:px-[15px]">
                <div class="mt-[40px] pb-[20px] text-white border-b border-white/20 flex items-center justify-between">
                    <div class="flex">
                        <p v-if="messages != null" class="w-full h-[26px] mr-[8px] pt-[1px] px-[10px] text-center text-[16px] rounded-full text-white bg-indigo-500/80 font-semibold">{{ messages.length }}</p>
                        <h1 class="text-[16px] font-semibold">{{ whetherMessage }}</h1>
                    </div>
                </div>

                <section v-if="user.messages.value">
                    <div v-if="messages.length && !detail.show.value" class="py-[20px] grid grid-cols-2 gap-4 animate-fadeIn mobileL:grid-cols-1">
                        <div v-for="message in messages" :key="message.id">
                            <Message :id="message.id" :sender="message.sender" :message="message.message" :comments="message.comments" :postedAt="message.postedAt" :toggleDetail="toggleDetail" />
                        </div>
                    </div>
                    
                    <div v-if="messages.length && detail.show.value" class="py-[20px]">
                        <MessageDetail
                            :id="detail.id.value"
                            :user_id="userID"
                            :sender="messages.filter(msg => msg.id === detail.id.value)[0].sender"
                            :message="messages.filter(msg => msg.id === detail.id.value)[0].message"
                            :comments="messages.filter(msg => msg.id === detail.id.value)[0].comments"
                            :postedAt="messages.filter(msg => msg.id === detail.id.value)[0].postedAt"
                            :toggleDetail="toggleDetail"
                            :GetUserMessages="GetUserMessages"
                        />
                    </div>

                    <MessageNotAvailable v-if="!messages.length" />
                </section>

                <section v-else class="animate-fadeIn py-[20px] grid grid-cols-2 gap-4 mobileL:grid-cols-1">
                    <LoadingUserMessage />
                    <LoadingUserMessage />
                </section>
                
            </section>
        </section>
    </main>
</template>