<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import LoadingUserProfile from '../Loading/UserProfile.vue';
    import graphql from '../../fetchs/graphql';
    import userQuery from '../../../graphql/query/user';
    import parseText from '../../functions/parseText';

    const route = useRoute();
    const user_id = route.params.id;

    const user ={
        id: ref(''),
        username: ref(''),
        fullname: ref(''),
        avatar: ref(''),
        bio: ref(''),
        verified: ref(''),
        loading: ref(true)
    }

    async function UserGraphQL(){
        try {
            const { data: { user } } = await graphql({ query: userQuery(user_id) });
            const result = { status: user.status, data: user.data };
            return [ result, null ];

        } catch(err){
            return [ null, true ];
        }
    }

    async function GetUserProfile(){
        const [ result, error ] = await UserGraphQL();

        if(error){
            alert("SOMETHING_WENT_WRONG");

        } else {
            const { status, data } = result;

            if(status === 'OK'){
                user.loading.value = false;
    
                user.id = data.id
                user.username = data.username;
                user.fullname = data.fullname;
                user.avatar = data.avatar;
                user.bio = parseText(data.bio);
                user.verified = data.verified;
                
                document.title = `${data.username} - Only Me`;
            }

        } 
    };

    onMounted(() => {
        GetUserProfile();
    })

</script>

<template>
    <main>
        <LoadingUserProfile v-if="user.loading.value" />

        <section v-else>
            <section class="flex items-center">
                <img v-if="user.avatar !== null" :src="user.avatar" :alt="user.username" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover">
                <img v-if="user.avatar === null" src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" :alt="user.username" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover">
        
                <div class="ml-[20px]">
                    <div>
                        <h1 class="text-white font-bold text-lg mobileL:text-[15px]">{{ user.fullname === null ? user.username : user.fullname }}</h1>
                        <div class="flex items-center">
                            <p class="text-[14px] text-white/40">@{{ user.username }}</p>
                            <img v-if="user.verified" src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[20px] ml-[6px]"/>
                        </div>
                    </div>
                </div>
            </section>
    
            <div class="mt-[26px]">
                <p v-if="user.bio !== null" v-bind:innerHTML="user.bio" class="mt-[5px] text-[14px] text-white font-medium"></p>
                <p v-else class="mt-[5px] text-[14px] text-[#B1B1B1]">No bio available</p>
            </div>
        </section>
    </main>
</template>