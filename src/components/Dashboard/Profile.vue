<script setup>
    import { computed, ref, watch } from 'vue';
    import { useAuthStore } from '../../stores/authUser';
    import graphql from '../../fetchs/graphql';
    import updateUsernameQuery from '../../../graphql/mutation/updateUsername';
    import updateFullnameQuery from '../../../graphql/mutation/updateFullname';
    import updateBioQuery from '../../../graphql/mutation/updateBio';
    import checkUsernameQuery from '../../../graphql/query/checkUsername';

    // Components
    import LoadingProfile from '../Loading/LoadingProfile.vue'

    const authUser = useAuthStore();

    const tempData = {
        username: ref(''),
        fullname: ref(''),
        bio: ref(''),
    }

    const fullname = {
        loading: ref(false),
        length: ref(30)
    }

    const username = {
        loading: ref(false),
        available: ref(false),
        length: ref(30)
    }

    const bio = {
        length: ref(150)
    }

    function usernameHandler(e){
        tempData.username.value = e.target.value;
    }

    function fullnameHandler(e){
        tempData.fullname.value = e.target.value;
    }

    function bioHandler(e){
        tempData.bio.value = e.target.value;
    }

    const userID = computed(() => {
        return `https://onlyme.up.railway.app/user/${authUser.id}`;
    });

    async function checkUsername(){
        username.loading.value = true;

        const token = localStorage.getItem('onl_auth');
        const res = await graphql({ query: checkUsernameQuery(token, tempData.username.value) });
        const { checkUsername } = res.data;

        if(checkUsername.status === 'OK'){
            if(checkUsername.message === 'USERNAME_FOUND'){
                username.loading.value = false;
                username.available.value = false;    

            } else if(checkUsername.message === 'USERNAME_NOT_FOUND'){
                username.loading.value = false;
                username.available.value = true;
            }
            
        } else {
            username.loading.value = false;
            username.available.value = false;
        }
    }

    function checkUsernameHandler(){
        if(tempData.username.value){
            setTimeout(checkUsername, 1000);
        }
    }

    async function updateUsername(){
        username.loading.value = true;
        const token = localStorage.getItem('onl_auth');
        const cutSpace = tempData.username.value.split(' ').join('');
        
        const res = await graphql({ query: updateUsernameQuery(token, cutSpace) });
        const { updateUsername } = res.data;

        if(updateUsername.status === 'OK'){
            username.loading.value = false;
            authUser.usernameHandler(cutSpace);
            tempData.username.value = "";

        } else {
            alert("Failed update username");
        }
    }

    async function updateFullname(){
        fullname.loading.value = true;

        const token = localStorage.getItem('onl_auth');
        const res = await graphql({ query: updateFullnameQuery(token, tempData.fullname.value) });
        const { updateFullname } = res.data;

        if(updateFullname.status === 'OK'){
            fullname.loading.value = false;
            authUser.fullnameHandler(tempData.fullname.value);
            tempData.fullname.value = "";

        } else if(updateFullname.status === 'UNAUTHORIZED'){
            alert("Your session is ended :(");
        } else {
            alert("Failed update username!");
        }

    }

    async function updateBio(){
        const token = localStorage.getItem('onl_auth');
        const res = await graphql({ query: updateBioQuery(token, tempData.bio.value) });
        const { updateBio } = res.data;

        if(updateBio.status === 'OK'){
            authUser.bioHandler(tempData.bio.value);
            tempData.bio.value = "";

        } else {
            alert("Failed update bio!");
        }
    }

    watch(tempData.fullname, async(newFullname) => {
        const total = 30 - newFullname.length;
        fullname.length.value = total;
    });

    watch(tempData.username, async(newUsername) => {
        const total = 30 - newUsername.length;
        username.length.value = total;
    });

    watch(tempData.bio, async(newBio) => {
        const total = 150 - newBio.length;
        bio.length.value = total;
    });

    watch(tempData.bio, async (newBio, oldBio) => {
        if(newBio.includes('http://')){
            const indexUrl = newBio.indexOf('http://');
            let lastIndex = 0;

            for(let i = indexUrl; i > 0; i++){
                if(!newBio[i] === ' '){
                    lastIndex = i;
                }
            }

            const url = newBio.slice(indexUrl, lastIndex);
            const template = `<span class="text-blue-500">${url}</span>`;
            newBio.replace(url, template);

        } else if(newBio.includes('https://')){

        }
    })

</script>
<template>
    <section>
        <div class="animate-fadeIn mobileL:px-[15px]">

            <section class="flex flex-col items-start mt-[20px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="w-full flex items-center justify-between">
                    <h1 class="text-[14px] font-medium ">Share Your Profile </h1>
                    <p class="text-xs text-white/30">Copy your URL below</p>
                </div>
                <div class="w-full mt-[10px] font-mono py-[7px] px-[10px] bg-black/10 rounded-sm text-sm overflow-x-scroll">{{ userID }}</div>
            </section>

            <section class="flex flex-col justify-between mt-[10px] py-[20px] px-[20px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="mb-[20px]">
                    <h1 class="text-[18px] font-medium">Customize Profile</h1>
                </div>

                <div class="flex items-center relative">
                    <img v-if="authUser.avatar === null" src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="current-avatar" class="w-[70px] rounded-full">
                    <img v-else :src="authUser.avatar" alt="current-avatar" class="w-[70px] rounded-md">
    
                    <div class="ml-[20px]">
                        <h1 class="text-[13px] mb-[6px] font-semibold">Change Avatar</h1>
                        <input type="file" name="file" id="file" accept="image/*" class="w-full mobileL:w-full pr-[20px] file:text-xs file:mr-3 file:cursor-pointer file:border-none file:py-1 file:px-2 file:rounded-md file:bg-indigo-500 file:text-white text-xs text-white">
                    </div>
                </div>

                <div class="mt-[30px] flex flex-col">
                    <div class="w-full flex flex-col items-start">
                        <label for="fullname" class="text-[14px] flex items-center">
                            Full Name
                            <p class="ml-[5px] text-[11px] text-white/50">({{ fullname.length }})</p>
                        </label>
                        <div class="w-full relative">
                            <input :value="tempData.fullname.value" type="text" name="fullname" id="fullname" :placeholder="authUser.fullname" class="w-full py-[10px] border-b border-white/20 focus:border-white/80 bg-transparent outline-none transition-all" @input="fullnameHandler" />
                            <button v-if="tempData.fullname.value.length > 4 && tempData.fullname.value.length < 31" class="py-[10px] px-[10px] flex items-center justify-center absolute right-0 top-0 animate-fadeIn transition-all" @click="updateFullname">
                                <LoadingProfile v-if="fullname.loading.value" />
                                <p v-else class="font-semibold">Save</p>
                            </button>
                        </div>
                    </div>

                    <div class="mt-[30px] w-full flex flex-col items-start">
                        <label for="username" class="text-[14px] flex items-center">
                            Username
                            <p class="ml-[5px] text-[11px] text-white/50">({{ username.length }})</p>
                        </label>
                        <div class="w-full relative">
                            <input :value="tempData.username.value" type="text" name="username" id="username" :placeholder="authUser.username" class="w-full py-[10px] bg-transparent border-b border-white/20 outline-none transition-all focus:border-white/80" @input="usernameHandler" />
                            <button v-if="tempData.username.value.length > 4 && tempData.username.value.length < 31" class="py-[10px] px-[10px] absolute right-0 top-0 animate-fadeIn transition-all" @click="updateUsername">
                                <LoadingProfile v-if="username.loading.value" />
                                <p v-else class="font-semibold">Save</p>
                            </button>
                        </div>
                    </div>

                    <div class="mt-[30px] w-full">
                        <label for="bio" class="text-[14px] flex items-center">
                            About
                            <p class="ml-[5px] text-[11px] text-white/50">({{ bio.length }})</p>
                        </label>
                        <textarea :value="tempData.bio.value" name="bio" id="bio" placeholder="Write some thoughts ..." class="w-full h-[100px] mt-[10px] border-b border-white/20 resize-none text-white text-[15px] bg-transparent focus:outline-none" @input="bioHandler" />
                        <button v-if="tempData.bio.value" class="w-full py-[10px] mt-[10px] bg-indigo-500/70 font-semibold rounded-lg animate-fadeIn">Save</button>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>