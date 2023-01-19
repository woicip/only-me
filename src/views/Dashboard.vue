<script setup>
    import { onMounted, ref, watch, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authUser';

    // Components
    import Message from '../components/Message/Message.vue';
    import MessageMenu from '../components/Dashboard/MessageMenu.vue';
    import AccountMenu from '../components/Dashboard/AccountMenu.vue';
    import ProfileMenu from '../components/Dashboard/ProfileMenu.vue';
    import MessageDetail from '../components/Message/Detail.vue';
    import Updated from '../components/Information/Updated.vue';
    import HeaderProfile from '../components/Dashboard/Header.vue';
    import Profile from '../components/Dashboard/Profile.vue';
    import Account from '../components/Dashboard/Account.vue';
    import Nav from '../components/Dashboard/Nav.vue';
    import parseJWT from '../functions/parseJWT';
    import parseURL from '../functions/parseURL';
    import parseNL from '../functions/parseNL';
    import LoadingUserProfile from '../components/Loading/UserProfile.vue';
    import LoadingUserMessageDetail from '../components/Loading/UserMessageDetail.vue';

    // graphql
    import graphql from '../fetchs/graphql';
    import userMessagesQuery from '../../graphql/query/userMessages';
    import userDashboardQuery from '../../graphql/query/userDashboard';
    import updateUserFullname from '../../graphql/mutation/updateFullname';
    import updateUsernameQuery from '../../graphql/mutation/updateUsername';
    import updateBioQuery from '../../graphql/mutation/updateBio';
    import checkToken from '../../graphql/query/ct';

    const authUser = useAuthStore();
    const router = useRouter();

    const messageView = ref(true);
    const profileView = ref(false);
    const accountView = ref(false);

    const dashboardProfile = {
        id: ref(""),
        bio: ref(""),
        avatar: ref(null),
        username: ref(""),
        fullname: ref(""),
        verified: ref(false)
    };

    const messages = ref("");

    const bio = ref("");
    const username = ref("");
    const fullname = ref("");
    const comment = ref("");

    const author = ref(true);
    const copy = {
        show: ref(false),
        name: ref(null)
    };

    const loadProfile = ref(true);
    const loadMessage = ref(true);
    const updated = ref(false);

    const parsed = parseJWT(localStorage.getItem('onl_auth'));

    async function FetchDashboardProfile(){
        const getUserDashboard = await graphql({ query: userDashboardQuery(parsed.id) });
        const { user: { data } } = getUserDashboard.data;
        return data;
    }

    async function GetUserMessages(){
        const result = await graphql({ query: userMessagesQuery(parsed.id) });
        const { userMessages } = result.data;

        if(userMessages.status === 'OK'){
            messages.value = userMessages.messages;
            loadMessage.value = false;

        } else {
            alert("Failed getting messages");
        }
    };

    async function GetDashboardProfile(){
        const user = await FetchDashboardProfile();

        loadProfile.value = false;

        dashboardProfile.bio.value = user.bio;
        dashboardProfile.avatar.value = user.avatar;
        dashboardProfile.username.value = user.username;
        dashboardProfile.fullname.value = user.fullname; 
        dashboardProfile.verified.value = user.verified; 

        authUser.idHandler(parsed.id);
        authUser.usernameHandler(user.username);
        authUser.setLoggedIn(true);

        document.title = `${user.username} - OnlyMe`;
    };

    const userID = computed(() => {
        return authUser.id.split('-')[1];
    })

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

    function copyClickHandler(){
        const rawID = authUser.id.split('-')[1];
        const text = `${import.meta.env.VITE_APP_ADDRESS}/user/${rawID}`;
        navigator.clipboard.writeText(text).then(() => {
            copy.show.value = true;
            copy.name.value = "Copied";

            setTimeout(() => {
                copy.show = false;
            }, 3000);

        }, (err) => {
            alert("Failed copy ID");
        });
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

    function logoutHandler(){
        localStorage.removeItem('onl_auth');
        router.push('/');
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

        GetDashboardProfile();
        GetUserMessages();
    });

</script>

<template>
    <main>
        <Updated :updated="updated" :updatedHandler="updatedHandler" />

        <section class="w-[536px] mobileL:w-screen mx-auto py-[50px] mobileL:py-[15px] text-white">
            <Nav :logoutHandler="logoutHandler" />

            <section class="mobileL:px-[15px]">
                <LoadingUserProfile v-if="loadProfile" />
                <HeaderProfile v-else
                    :id="userID"
                    :username="dashboardProfile.username.value"
                    :bio="dashboardProfile.bio.value"
                    :avatar="dashboardProfile.avatar.value"
                    :fullname="dashboardProfile.fullname.value"
                    :verified="dashboardProfile.verified.value"
                    :copy="copy"
                    :copyClickHandler="copyClickHandler"
                />
            </section>


            <!-- Buttons Navigation -->
            <div class="mt-[50px] mobileL:mt-[50px] mobileL:px-[15px] relative flex items-center border-b border-white/10 mobileL:sticky">
                <MessageMenu :messages="messages" :messageView="messageView" :handler="messageViewHandler" />
                <ProfileMenu :profileView="profileView" :handler="profileViewHandler" />
                <AccountMenu :acccountView="accountView" :handler="accountViewHandler" />
            </div>

            <!-- Content Navigation -->
            <section class="mt-[20px]">
                <section v-if="messageView" class="animate-fadeIn mobileL:px-[15px]">
                    <LoadingUserMessageDetail v-if="loadMessage" />

                    <div v-else>
                        <div v-for="message in messages" :key="message.id">
                            <MessageDetail
                                :id="message.id"
                                :user_id="authUser.id"
                                :sender="message.sender"
                                :message="message.message"
                                :comments="message.comments"
                                :postedAt="message.postedAt"
                                :author="author"
                                :GetUserMessages="GetUserMessages"
                                dashboard
                            />
                        </div>

                        <div v-if="!messages.length">
                            <h1 class="w-full py-[100px] text-center text-white/50">Messages will appear here if someone send you a message</h1>
                        </div>
                    </div>
                </section>

                <!-- Profile Content View -->
                <Profile
                    :id="parsed.id"
                    :profileView="profileView" 
                    :userAvatar="dashboardProfile.avatar.value"
                    :avatarChange="avatarChange"
                    :userFullname="dashboardProfile.fullname.value"
                    :fullname="fullname"
                    :fullnameInput="fullnameInput"
                    :updateFullname="updateFullname"
                    :userUsername="dashboardProfile.username.value"
                    :username="username"
                    :usernameInput="usernameInput"
                    :updateUsername="updateUsername"
                    :bio="bio"
                    :bioInput="bioInput"
                    :updateBio="updateBio"
                />

                <!-- Account Section -->
                <Account :accountView="accountView" :email_address="authUser.email_address" />
            </section>
        </section>
    </main>
</template>