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
    import parseJWT from '../functions/parseJWT';
    import parseURL from '../functions/parseURL';
    import parseNL from '../functions/parseNL';

    // graphql
    import graphql from '../fetchs/graphql';
    import updateUserFullname from '../../graphql/mutation/updateFullname';
    import updateUsernameQuery from '../../graphql/mutation/updateUsername';
    import updateBioQuery from '../../graphql/mutation/updateBio';
    import checkToken from '../../graphql/query/ct';

    const authUser = useAuthStore();
    const router = useRouter();

    const messageView = ref(true);
    const profileView = ref(false);
    const accountView = ref(false);

    const bio = ref("");
    const username = ref("");
    const fullname = ref("");
    const comment = ref("");
    const author = ref(true);
    const updated = ref(false);

    const parsed = parseJWT(localStorage.getItem('onl_auth'));

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

    function usernameInput(e){
        username.value = e.target.value;
    }

    function fullnameInput(e){
        fullname.value = e.target.value;
    }

    function bioInput(e){
        bio.value = e.target.value;
    }

    function updatedHandler(){
        updated.value = false;
    }

    function avatarChange(e){
        const files = e.target.files;
        const selected = files[0];
        console.log(selected);

        if(!selected.type.includes("image")){
            alert("Avatar only support image file.");
        }

        const avatar = URL.createObjectURL(selected);
        console.log(avatar);
    }

    async function updateFullname(){
        const authToken = localStorage.getItem('onl_auth');
        const { data: { updateFullname } } = await graphql({ query: updateUserFullname(authToken, fullname.value)});
        if(updateFullname.status === "OK"){
            const user = await FetchDashboardProfile();
    
            updated.value = true;
            fullname.value = "";
            dashboardProfile.fullname.value = user.fullname;
    
            setTimeout(() => {
                updated.value = false;
            }, 3000);

        } else {
            alert("Failed update fullname");
        }
    }

    async function updateUsername(){
        const authToken = localStorage.getItem('onl_auth');
        const { data: { updateUsername } } = await graphql({ query: updateUsernameQuery(authToken, username.value) });

        if(updateUsername.status === "OK"){
            const user = await FetchDashboardProfile();

            updated.value = true;
            username.value = "";
            authUser.usernameHandler(user.username);
            dashboardProfile.username.value = user.username;
            document.title = `${user.username} - OnlyMe`;
    
            setTimeout(() => {
                updated.value = false;
            }, 3000);

        } else {
            alert("Failed update username");
        }
    }

    async function updateBio(){
        const parseBioURL = parseURL(bio.value);
        const parseBioNL = parseNL(parseBioURL);
        const authToken = localStorage.getItem('onl_auth');

        const { data: { updateBio } } =  await graphql({ query: updateBioQuery(authToken, parseBioNL) });
        if(updateBio.status === "OK"){
            const user = await FetchDashboardProfile();
    
            updated.value = true;
            bio.value = "";
            dashboardProfile.bio.value = user.bio;
    
            setTimeout(() => {
                updated.value = false;
            }, 3000);

        } else {
            alert("Failed update bio");
        }
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

        <section class="w-[536px] mobileL:w-screen mx-auto py-[50px] mobileL:py-[15px] text-white">
            <Nav />

            <section class="mobileL:px-[15px]">
                <HeaderProfile />
            </section>


            <!-- Buttons Navigation -->
            <div class="mt-[50px] mobileL:mt-[50px] mobileL:px-[15px] relative flex items-center border-b border-white/10 mobileL:sticky">
                <MessageMenu :messageView="messageView" :handler="messageViewHandler" />
                <ProfileMenu :profileView="profileView" :handler="profileViewHandler" />
                <AccountMenu :accountView="accountView" :handler="accountViewHandler" />
            </div>

            <!-- Content Navigation -->
            <section class="mt-[20px]">
                <Messages v-if="messageView" />

                <!-- Profile Content View -->
                <Profile v-if="profileView"
                    :id="parsed.id"
                    :avatarChange="avatarChange"
                    :fullnameInput="fullnameInput"
                    :updateFullname="updateFullname"
                    :usernameInput="usernameInput"
                    :updateUsername="updateUsername"
                    :bioInput="bioInput"
                    :updateBio="updateBio"
                />

                <!-- Account Section -->
                <Account v-if="accountView"  />
            </section>
        </section>
    </section>
</template>