<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../../../stores/authUser';
    const authUser = useAuthStore();

    const showChangePassword = ref(false);

    const newPassword = {
        visible: ref(false),
        password: ref('')
    }
    const currentPassword = {
        visible: ref(false),
        password: ref('')
    }

    function changePasswordHandler(){
        showChangePassword.value = !showChangePassword.value;
    }

    function newPasswordHandler(e){
        newPassword.password.value = e.target.value;
    }

    function currentPasswordHandler(e){
        currentPassword.password.value = e.target.value;
    }

    function showNewPasswordHandler(){
        newPassword.visible.value = !newPassword.visible.value;
    }

    function showCurrPasswordHandler(){
        currentPassword.visible.value = !currentPassword.visible.value;
    }

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
            <div v-if="showChangePassword" class="w-full mt-[5px] animate-fadeIn">

                <div>
                    <div v-if="newPassword.visible.value" class="flex items-center relative">
                        <input :value="newPassword.password.value" type="text" placeholder="Set new password" class="w-full py-[12px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="newPasswordHandler">
                        <button v-if="newPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showNewPasswordHandler">
                            <img src="../../../assets/interface-edit-view-off-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                    
                    <div v-else class="flex items-center relative">
                        <input :value="newPassword.password.value" type="password" placeholder="Set new password" class="w-full py-[12px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="newPasswordHandler">
                        <button v-if="newPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showNewPasswordHandler">
                            <img src="../../../assets/interface-edit-view-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                </div>

                <div class="mt-[5px]">
                    <div v-if="currentPassword.visible.value" class="flex items-center relative">
                        <input :value="currentPassword.password.value" type="text" placeholder="Current password" class="w-full py-[12px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="currentPasswordHandler">
                        <button v-if="currentPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showCurrPasswordHandler">
                            <img src="../../../assets/interface-edit-view-off-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                    
                    <div v-else class="flex items-center relative">
                        <input :value="currentPassword.password.value" type="password" placeholder="Current password" class="w-full py-[12px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="currentPasswordHandler">
                        <button v-if="currentPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showCurrPasswordHandler">
                            <img src="../../../assets/interface-edit-view-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                </div>

            </div>
            
            <div v-if="showChangePassword">
                <button v-if="newPassword.password.value.length && currentPassword.password.value.length" class="w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 animate-fadeIn">Save Changes</button>
                <button v-else disabled class="opacity-50 w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 cursor-not-allowed">Save Changes</button>
            </div>
            
            <button v-if="!showChangePassword" class="py-[5px] px-[10px] text-[13px] mt-[15px] font-medium rounded-[5px] text-white/60 border border-white/10 transition-all hover:border-indigo-500 hover:text-white hover:bg-indigo-500" @click="changePasswordHandler">Change Password</button>
        </div>
    </div>
</template>