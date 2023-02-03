<script setup>
    // Components
    import Nav from '../components/User/Nav.vue';
    import ProfileContainer from '../components/User/ProfileContainer.vue';
    import ProfileHeader from '../components/User/ProfileHeader.vue';
    import MessageForm from '../components/User/MessageForm.vue';
    import Messages from '../components/User/Messages.vue';
</script>


<template>
    <main>
        <section class="w-[536px] mx-auto py-[30px] mobileL:py-[10px] tabletL:w-full">
            <Nav />
            <ProfileContainer>
                <ProfileHeader />
            </ProfileContainer>
            <MessageForm />
            <Messages />
        </section>
    </main>
</template>