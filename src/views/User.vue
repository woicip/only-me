<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import UserMessagesGraphQL from '../../graphql/fetch/UserMessagesGraphQL';

    // Components
    import Nav from '../components/User/Nav.vue';
    import ProfileContainer from '../components/User/ProfileContainer.vue';
    import ProfileHeader from '../components/User/ProfileHeader.vue';
    import MessageForm from '../components/User/MessageForm.vue';
    import Messages from '../components/User/Messages.vue';

    const route = useRoute();
    const user_id = route.params.id;
    const messages = ref([]);

    async function GetUserMessages(){
        const [ result, error ] = await UserMessagesGraphQL(user_id);

        if(error){
            alert("SOMETHING_WENT_WRONG");

        } else {
            if(result.status === 'OK'){
                messages.value = result.messages;
    
            } else {
                alert("Failed Getting Messages");
            }
        }

    };

    onMounted(() => {
        GetUserMessages();
    });

</script>

<template>
    <main>
        <section class="w-[536px] mx-auto py-[30px] mobileL:py-[10px] tabletL:w-full">
            <Nav />
            <ProfileContainer>
                <ProfileHeader />
            </ProfileContainer>
            <MessageForm :GetUserMessages="GetUserMessages" />
            <Messages :messages="messages" />
        </section>
    </main>
</template>