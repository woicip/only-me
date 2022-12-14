<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authUser';

    import Message from '../components/Message/Message.vue';
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

    const userProfile = ref(false);
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

        if(userMessages.code === 200){
            messages.value = userMessages.messages;
            loadMessage.value = false;

        } else {
            alert("Failed getting messages");
        }
    };

    async function GetDashboardProfile(){
        const user = await FetchDashboardProfile();

        userProfile.value = true;

        dashboardProfile.bio.value = user.bio;
        dashboardProfile.avatar.value = user.avatar;
        dashboardProfile.username.value = user.username;
        dashboardProfile.fullname.value = user.fullname; 

        authUser.idHandler(parsed.id);
        authUser.usernameHandler(user.username);
        authUser.setLoggedIn(true);

        document.title = `${user.username} - OnlyMe`;
    };

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

    function logoutHandler(){
        localStorage.removeItem('onl_auth');
        router.push('/');
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
                <LoadingUserProfile v-if="!userProfile" />

                <!-- Header User Profile -->
                <HeaderProfile v-if="userProfile"
                    :id="authUser.id"
                    :username="dashboardProfile.username.value"
                    :bio="dashboardProfile.bio.value"
                    :avatar="dashboardProfile.avatar.value"
                    :fullname="dashboardProfile.fullname.value"
                    :verified="dashboardProfile.verified"
                    :copy="copy"
                    :copyClickHandler="copyClickHandler"
                />
            </section>


            <!-- Buttons Navigation -->
            <div class="mt-[50px] mobileL:mt-[50px] mobileL:px-[15px] relative flex items-center border-b border-white/10 mobileL:sticky">
                <div class="relative bottom-[-1px]">
                    <div>
                        <button v-if="messageView" class="py-[10px] px-[15px] text-sm rounded-t-lg bg-indigo-500 border-b border-indigo-500">
                            <span class="rounded-full mobileL:text-[13px] font-semibold">
                                <p class="inline mr-[5px] font-semibold">{{ messages !== null ? messages.length : 0 }}</p> 
                                {{ messages.length > 1 ? "Messages" : "Message" }}
                            </span>
                            
                        </button>

                        <button v-else class="py-[10px] px-[15px] text-sm rounded-t-md hover:bg-white/10 border-b border-transparent hover:border-white" @click="messageViewHandler">
                            <span v-if="messages !== null" class="rounded-full mobileL:text-[13px] font-semibold">
                                <p class="inline mr-[5px] font-semibold">{{ messages.length }}</p>
                                    {{ messages.length > 1 ? "Messages" : "Message" }}
                                </span>
                        </button>

                    </div>
                </div>

                <div class="ml-[8px] relative bottom-[-1px]">
                    <button v-if="profileView" class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-lg bg-indigo-500 border-b border-indigo-500">Profile</button>
                    <button v-else class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-md hover:bg-white/10 border-b border-transparent hover:border-white" @click="profileViewHandler">Profile</button>
                </div>

                <div class="ml-[8px] relative bottom-[-1px]">
                    <button v-if="accountView" class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-lg bg-indigo-500 border-b border-indigo-500">Account</button>
                    <button v-else class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-md hover:bg-white/10 border-b border-transparent hover:border-white" @click="accountViewHandler">Account</button>
                </div>
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