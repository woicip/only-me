<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authUser';

    // Components
    import Messages from '../components/Dashboard/Messages.vue';
    import MessageMenu from '../components/Dashboard/MessageMenu.vue';
    import AccountMenu from '../components/Dashboard/AccountMenu.vue';
    import ProfileMenu from '../components/Dashboard/ProfileMenu.vue';
    import Updated from '../components/Information/Updated.vue';
    import HeaderProfile from '../components/Dashboard/Header.vue';
    import Profile from '../components/Dashboard/Profile.vue';
    import Account from '../components/Dashboard/Account.vue';
    import Nav from '../components/Dashboard/Nav.vue';

    // graphql
    import graphql from '../fetchs/graphql';
    import checkToken from '../../graphql/query/ct';

    const authUser = useAuthStore();
    const router = useRouter();

    const messageView = ref(true);
    const profileView = ref(false);
    const accountView = ref(false);

    const updated = ref(false);

    function messageViewHandler(){
        messageView.value = true;
        profileView.value = false;
        accountView.value = false;
    }

    function profileViewHandler(){
        messageView.value = false;
        profileView.value = true;
        accountView.value = false;
    }

    function accountViewHandler(){
        messageView.value = false;
        profileView.value = false;
        accountView.value = true;
    }

    function updatedHandler(){
        updated.value = false;
    }

    onMounted(async () => {
        const authToken = localStorage.getItem('onl_auth');

        const ct = await graphql({ query: checkToken(authToken) });
        const { data } = ct;

        if(data.ct.status === "UNAUTHORIZED"){
            localStorage.removeItem('onl_auth');
            router.push('/');
        }

        if(authToken === null){
            authUser.setLoggedIn(false);
            router.push('/');
        }
    });

</script>

<template>
    <section>
        <Updated :updated="updated" :updatedHandler="updatedHandler" />

        <section class="w-[536px] tabletL:w-full mx-auto  text-white">
            <Nav />

            <section class="mobileL:px-[15px] tabletL:px-[30px] tabletM:px-[20px]">
                <HeaderProfile />
            </section>

            <!-- Buttons Navigation -->
            <div class="mt-[50px] pt-[15px] mobileL:mt-[50px] mobileL:px-[15px] tabletL:px-[30px] tabletM:px-[20px] flex items-center border-b border-white/20 sticky top-[0px] bg-[#373A44] z-10">
                <MessageMenu :messageView="messageView" :handler="messageViewHandler" />
                <ProfileMenu :profileView="profileView" :handler="profileViewHandler" />
                <AccountMenu :accountView="accountView" :handler="accountViewHandler" />
            </div>

            <!-- Content Navigation -->
            <section class="mt-[20px] pb-[30px]">
                <Messages v-if="messageView" />

                <!-- Profile Content View -->
                <Profile v-if="profileView" />

                <!-- Account Section -->
                <Account v-if="accountView"  />
            </section>
        </section>
    </section>
</template>