<script setup>
    import { useAuthStore } from '../../../stores/authUser';
    const authUser = useAuthStore();

</script>
<template>
    <div class="py-[20px] px-[20px] animate-fadeIn">
        <div>
            <h1 class="text-[15px] font-medium">Email Address</h1>
            <div v-if="authUser.email === null" class="mt-[5px]">
                <p class="text-[14px] text-yellow-500 font-semibold">You haven't set your email address!</p>
                <button class="mt-[5px] py-[5px] px-[10px] bg-indigo-500 text-[13px] font-medium rounded-[5px] hover:bg-indigo-500/50">Set Email Address</button>
            </div>

            <div v-else>
                <div class="mt-[5px] flex items-center">
                    <p class="text-white/90">{{ authUser.email }}</p>
                    <div class="w-[3px] h-[3px] mx-[10px] rounded-full bg-white/50"></div>
                    <p class="font-medium text-green-400">Verified</p>
                </div>
                <p class="mt-[3px] text-[13px] text-white/50">Your email will not shown in public</p>
                <button class="py-[5px] px-[10px] text-[13px] mt-[15px] font-medium rounded-[5px] text-white/60 border border-white/10 transition-all hover:border-indigo-500 hover:text-white hover:bg-indigo-500">Change Email</button>
            </div>
        </div>

        <div>
            <h1 class="mt-[30px] text-[15px] font-medium">Password</h1>
            <button class="py-[5px] px-[10px] text-[13px] mt-[15px] font-medium rounded-[5px] text-white/60 border border-white/10 transition-all hover:border-indigo-500 hover:text-white hover:bg-indigo-500">Change Password</button>
        </div>
    </div>
</template>