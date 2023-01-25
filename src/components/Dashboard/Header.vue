<script setup>
    import { ref, onMounted } from 'vue';
    import graphql from '../../fetchs/graphql';
    import userDashboardQuery from '../../../graphql/query/userDashboard';
    import { useAuthStore } from '../../stores/authUser';
    import parseJWT from '../../functions/parseJWT';

    // Components
    import LoadingUserProfile from '../Loading/UserProfile.vue';

    const authUser = useAuthStore();
    
    const parsed = parseJWT(localStorage.getItem('onl_auth'));
    const userID = parsed.id.split('-')[1];

    const loadingProfile = ref(true);
    const userProfile = {
        id: ref(null),
        username: ref(null),
        fullname: ref(null),
        avatar: ref(null),
        bio: ref(null),
        verified: ref(null)
    }

    async function GetDashboardProfile(){
        const getUserDashboard = await graphql({ query: userDashboardQuery(userID) });
        const { user: { data } } = getUserDashboard.data;

        loadingProfile.value = false;

        userProfile.username.value = data.username;
        userProfile.fullname.value = data.fullname;
        userProfile.verified.value = data.verified;
        userProfile.avatar.value = data.avatar;
        userProfile.bio.value = data.bio;

        authUser.setLoggedIn(true);
        authUser.idHandler(userID);
        authUser.emailHandler(data.email);
        authUser.usernameHandler(data.username);
        authUser.fullnameHandler(data.fullname);
        authUser.verifiedHandler(data.verified);
        authUser.avatarHandler(data.avatar);
        authUser.bioHandler(data.bio);

        document.title = `${data.username} - OnlyMe`;
    }

    onMounted(() => {
        GetDashboardProfile();
    });

</script>
<template>
    <LoadingUserProfile v-if="loadingProfile" />

    <section v-else>
        <div class="header mt-[30px] mobileL:mt-[30px] mobileL:w-full flex items-center justify-between">
            <div class="flex items-center">
                <img v-if="authUser.avatar !== null" :src="authUser.avatar" alt="avatar" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover">
                <img v-else src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="avatar" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover ">

                <div class="ml-[20px] mobileL:ml-[20px]">
                    <h1 class="fullname text-lg font-bold mobileL:text-[16px]">{{ authUser.fullname !== null ? authUser.fullname : authUser.username }}</h1>
                    <div class="flex items-center">
                        <p class="username text-white/40 text-sm mobileL:text-[13px]">@{{ authUser.username }}</p>
                        <img v-if="authUser.verified" src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[20px] ml-[6px]"/>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="authUser.bio !== null" v-bind:innerHTML="authUser.bio" class="mt-[30px] mobileL:mt-[30px] text-white text-[14px] mobileL:text-[13px]"></div>
    </section>
</template>