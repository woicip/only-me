<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        id: String,
        userAvatar: String,
        avatarChange: Function,
        userFullname: String,
        fullname: String,
        fullnameInput: Function,
        updateFullname: Function,
        userUsername: String,
        username: String,
        usernameInput: Function,
        updateUsername: Function,
        bio: String,
        bioInput: Function,
        updateBio: Function
    });

    const fullnamePlaceholder = computed(() => {
        return props.userFullname !== null ? props.userFullname : props.userUsername;
    });

    const completeID = computed(() => {
        const splID = props.id.split('-')[1];
        return `https://onlyme.up.railway.app/user/${splID}`;
    });

</script>
<template>
    <section>
        <div class="animate-fadeIn mobileL:px-[15px]">

            <div class="flex flex-col items-start mt-[20px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="w-full flex items-center justify-between">
                    <h1 class="text-[14px] font-medium ">Share Your Profile </h1>
                    <p class="text-xs text-white/30">Copy your URL below</p>
                </div>
                <div class="w-full mt-[10px] font-mono py-[7px] px-[10px] bg-black/20 rounded-md text-sm overflow-x-scroll">{{ completeID }}</div>
            </div>

            <div class="flex items-center mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <div class="absolute py-[5px] px-[15px] rounded-full bg-yellow-600/80 z-10 text-xs right-2 top-2">Under Construction</div>
                <img v-if="userAvatar === null" src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="current-avatar" class="w-[70px] rounded-md">
                <img v-else :src="userAvatar" alt="current-avatar" class="w-[70px] rounded-md">

                <div class="ml-[20px]">
                    <h1 class="text-[13px] mb-[6px] font-semibold">Change Avatar</h1>
                    <input type="file" name="file" id="file" accept="image/*" class="w-full mobileL:w-full pr-[20px] file:text-xs file:mr-3 file:border-none file:py-1 file:px-2 file:rounded-md file:bg-indigo-500 file:text-white text-xs text-white">
                </div>
            </div>

            <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <p class="text-[11px] text-white/30 font-light">Fullname</p>
                <input :value="fullname" type="text" name="fullname" id="fullname" :placeholder="fullnamePlaceholder" class="w-full text-white text-sm bg-transparent focus:outline-none" @input="fullnameInput"/>
                <button v-if="fullname.length > 3" class="absolute animate-fadeIn h-full flex flex-col justify-center px-[10px] text-[13px] text-white font-semibold right-0 top-0 bg-white/10 rounded-r-lg transition-all hover:bg-indigo-500" @click="updateFullname">Update</button>
            </div>

            <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <p class="text-[11px] text-white/30 font-light">Username</p>
                <input :value="username" type="text" name="username" id="username" :placeholder="userUsername" class="w-full text-white text-sm bg-transparent focus:outline-none" @input="usernameInput"/>
                <button v-if="username.length > 3" class="absolute animate-fadeIn h-full flex flex-col justify-center px-[10px] text-[13px] text-white font-semibold right-0 top-0 bg-white/10 rounded-r-lg transition-all hover:bg-indigo-500" @click="updateUsername">Update</button>
            </div>

            <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                <p class="text-[11px] text-white/30 font-light">Bio</p>
                <textarea :value="bio" name="bio" id="bio" placeholder="Write your bio ..." class="w-full h-[150px] text-white bg-transparent focus:outline-none" @input="bioInput"/>
            </div>

            <div>
                <button v-if="bio.length" class="w-full animate-fadeIn mt-[10px] py-[15px] font-bold rounded-[8px] bg-indigo-500" @click="updateBio">Update Bio</button>
            </div>
        </div>
    </section>
</template>