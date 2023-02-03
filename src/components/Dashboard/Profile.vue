<script setup>
    import axios from 'axios';
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
        avatar: ref(null),
        avatarFile: ref(null)
    }

    const fullname = {
        loading: ref(false),
        length: ref(30)
    }

    const username = {
        alreadyExist: ref(false),
        loading: ref(false),
        length: ref(30)
    }

    const bio = {
        length: ref(150),
        loading: ref(false)
    }

    const avatar = {
        loading: ref(false)
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

    async function checkUsername(callback){
        const token = localStorage.getItem('onl_auth');
        const res = await graphql({ query: checkUsernameQuery(token, tempData.username.value) });
        const { checkUsername } = res.data;

        if(checkUsername.status === 'OK'){
            switch(checkUsername.message){
                case 'USERNAME_FOUND':
                    callback({ alreadyExist: true });
                    break;

                case 'USERNAME_NOT_FOUND':
                    callback({ alreadyExist: false });
                    break;

            }
        }
    }

    async function updateUsername(){
        username.loading.value = true;
        username.alreadyExist.value = false;

        const token = localStorage.getItem('onl_auth');
        const cutSpace = tempData.username.value.split(' ').join('');

        const res = await graphql({ query: updateUsernameQuery(token, cutSpace) });
        const { updateUsername } = res.data;

        if(updateUsername.status === 'OK'){
            username.loading.value = false;
            tempData.username.value = "";
            authUser.usernameHandler(cutSpace);

        } else if(updateUsername.status === 'CONFLICT') {
            username.loading.value = false;
            username.alreadyExist.value = true;

        } else {
            alert("Failed to update username!");
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
        bio.loading.value = true;

        const token = localStorage.getItem('onl_auth');
        const res = await graphql({ query: updateBioQuery(token, tempData.bio.value) });
        const { updateBio } = res.data;

        if(updateBio.status === 'OK'){
            authUser.bioHandler(tempData.bio.value);
            bio.loading.value = false;
            tempData.bio.value = "";

        } else {
            alert("Failed update bio!");
        }
    }

    async function avatarHandler(e){
        const image = e.target.files[0];
        const url = URL.createObjectURL(image);
        tempData.avatar.value = url;
        tempData.avatarFile.value = image;
    }

    async function updateAvatar(e){
        avatar.loading.value = true;

        const formData = new FormData();
        formData.append('avatar', tempData.avatarFile.value);

        const res = await axios.post('http://localhost:7777/olav', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('onl_auth')}`
            }
        })

        if(res.data.code === 200){
            avatar.loading.value = false;

            const url = res.data.url;
            authUser.avatarHandler(url);

            tempData.avatar.value = null;
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

</script>
<template>
    <section>
        <div class="animate-fadeIn mobileL:px-[15px] tabletL:px-[30px] tabletM:px-[20px]">

            <section class="flex flex-col items-start mt-[20px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="w-full flex items-center justify-between">
                    <h1 class="text-[14px] font-medium ">Share Your Profile </h1>
                    <p class="text-xs text-white/30">Copy your URL below</p>
                </div>
                <div class="w-full mt-[10px] font-mono py-[7px] px-[10px] bg-black/10 rounded-md text-sm overflow-x-scroll">{{ userID }}</div>
            </section>

            <section class="flex flex-col justify-between mt-[10px] py-[20px] mobileL:py-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="mb-[20px] pb-[20px] mobileL:pb-[15px] border-b border-white/10">
                    <h1 class="text-[18px] px-[20px] font-medium">Customize Profile</h1>
                </div>

                <div class="mt-[5px] px-[15px] flex items-start justify-between">
                    <div class="flex items-center tabletL:flex-col tabletL:items-start relative">
                        <div class="flex flex-col items-center">
                            <div class="h-full rounded-full overflow-hidden relative group transition-all hover:ring-2 hover:ring-offset-4 hover:ring-indigo-500 hover:ring-offset-[#41444D]">
                                <button class="group-hover:block hidden bg-black/80 text-white absolute w-[90px] h-[90px] z-20 transition-all rounded-full animate-fadeIn cursor-pointer">
                                    <input type="file" accept="image/*" class="opacity-0 w-[90px] h-full absolute left-0 top-0 transition-all z-10 rounded-full cursor-pointer" @change="avatarHandler">
                                    <p class="text-[13px] flex flex-col leading-none transition-all cursor-pointer">
                                        <span class="leading-none font-semibold py-[2px]">Change</span>
                                        <span class="leading-none font-semibold py-[2px]">Avatar</span>
                                    </p>
                                </button>
                                <div v-if="tempData.avatar.value === null">
                                    <img v-if="authUser.avatar === null" src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="current-avatar" class="w-[90px] h-[90px] object-cover">
                                    <img v-else :src="authUser.avatar" alt="current-avatar" class="w-[90px] h-[90px] object-cover">
                                </div>
                                <div v-else>
                                    <img :src="tempData.avatar.value" alt="preview-avatar" class="w-[90px] h-[90px] object-cover rounded-full" />
                                </div>
                            </div>
                            
                            <p class="mt-[10px] text-[12px] text-white/70">Change Avatar</p>
                        </div>
        
                        <div class="ml-[20px] tabletL:ml-0 tabletL:mt-[20px]">
                            <h1 v-if="authUser.avatar === null && !avatar.loading.value && !tempData.avatar.value" class="font-medium text-white/70 text-[15px]">You still don't have avatar yet. <br/> Upload your avatar!</h1>

                            <div v-else v-if="tempData.avatar.value !== null">
                                <button class="py-[5px] px-[10px] text-[14px] font-medium rounded-md bg-indigo-500/80 hover:bg-indigo-500/100 animate-fadeIn transition-all" :class="{ 'bg-indigo-500/30': avatar.loading.value }" @click="updateAvatar">
                                    <LoadingProfile v-if="avatar.loading.value" />
                                    <p v-else>Save Changes</p>
                                </button>
                                <p class="mt-[5px] text-[13px] text-yellow-500/80 animate-fadeIn">You haven't save the changes yet.</p>
                            </div>
                        </div>
                    </div>

                    <div class="px-[15px] flex flex-col items-end">
                        <h1 class="text-[15px] font-medium flex items-center">
                            <img src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[20px] mr-[5px]" />
                            Verified
                        </h1>
                        <p v-if="!authUser.verified" class="text-[13px] text-white/70">No</p>
                        <p v-else class="text-[13px] text-white/70">Yes</p>
                    </div>
                </div>

                <div class="px-[15px] mt-[30px] flex flex-col">
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
                            <input :value="tempData.username.value" type="text" name="username" id="username" :placeholder="authUser.username" class="w-full py-[10px] bg-transparent border-b border-white/20 outline-none transition-all focus:border-white/80" :class="{ 'focus:border-red-400': username.alreadyExist.value, 'border-red-400': username.alreadyExist.value }" @input="usernameHandler" />
                            <p v-if="username.alreadyExist.value" class="text-red-400 mt-[5px] text-[13px]">Username is already exist.</p>
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
                        <button v-if="tempData.bio.value" class="w-full py-[10px] mt-[10px] bg-indigo-500/70 font-semibold rounded-lg animate-fadeIn" @click="updateBio">
                            <LoadingProfile v-if="bio.loading.value" />
                            <p v-else class="font-semibold">Save</p>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>