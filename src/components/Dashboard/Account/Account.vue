<script setup>
    import { useAuthStore } from '../../../stores/authUser';
    
    // Components
    import ChangeEmail from '../Update/ChangeEmail.vue';
    import ChangePassword from '../Update/ChangePassword.vue';
    
    const authUser = useAuthStore();

</script>
<template>
    <div class="py-[20px] px-[20px] animate-fadeIn">
        <div>
            <h1 class="text-[15px] mobileL:text-[14px] font-medium">Email Address</h1>
            <div v-if="authUser.email === null" class="mt-[5px]">
                <p class="text-[14px] text-yellow-500 font-semibold">You haven't set your email address!</p>
                <button class="mt-[5px] py-[5px] px-[10px] bg-indigo-500 text-[13px] font-medium rounded-[5px] hover:bg-indigo-500/50">Set Email Address</button>
            </div>

            <div v-else>
                <div class="mt-[5px] flex items-center">
                    <p class="text-white/90 mobileL:text-[14px]">{{ authUser.email }}</p>
                    <div class="w-[3px] h-[3px] mx-[10px] rounded-full bg-white/50"></div>
                    <p class="px-[6px] py-[0px] rounded-full font-medium text-white/80 mobileL:text-[13px] text-[14px] bg-green-400/50">Verified</p>
                </div>
                <p class="mt-[3px] text-[13px] text-white/50">Your email will not shown in public</p>

                <ChangeEmail />
            </div>
        </div>

        <ChangePassword />
    </div>
</template>