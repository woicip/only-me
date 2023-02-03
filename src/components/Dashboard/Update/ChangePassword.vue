<script setup>
    import { ref } from 'vue';
    import UpdatePasswordGraphQL from '../../../../graphql/fetch/UpdatePasswordGraphQL';

    const showChangePassword = ref(false);

    const newPassword = {
        visible: ref(false),
        password: ref('')
    }
    const currentPassword = {
        visible: ref(false),
        password: ref(''),
        wrong: ref(false),
        wrongMessage: ref('')
    }

    const successUpdate = ref(false);
    const updating = ref(false);

    async function updatePassword(){
        updating.value = true;
        const token = localStorage.getItem('onl_auth');
        const [ result, error ] = await UpdatePasswordGraphQL(token, newPassword.password.value, currentPassword.password.value);

        if(error){
            alert(result.message);
            updating.value = false;
            successUpdate.value = false;

        } else {
            if(result.status === 'CONFLICT'){
                successUpdate.value = false;
                updating.value = false;
                currentPassword.wrong.value = true;
                currentPassword.wrongMessage.value = result.message;

            } else {
                successUpdate.value = true;
                newPassword.password.value = "";
                currentPassword.password.value = "";
                updating.value = false;
                currentPassword.wrong.value = false;
            }
        }
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
    <div>
        <h1 class="mt-[30px] text-[15px] mobileL:text-[14px] font-medium">Password</h1>
        <div v-if="showChangePassword" class="w-full mt-[5px] animate-fadeIn">
            <div>
                <div v-if="newPassword.visible.value" class="flex items-center relative">
                    <input :value="newPassword.password.value" type="text" placeholder="Set new password" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="newPasswordHandler">
                    <button v-if="newPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showNewPasswordHandler">
                        <img src="../../../assets/interface-edit-view-off-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                    </button>
                </div>
                
                <div v-else class="flex items-center relative">
                    <input :value="newPassword.password.value" type="password" placeholder="Set new password" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" @input="newPasswordHandler">
                    <button v-if="newPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showNewPasswordHandler">
                        <img src="../../../assets/interface-edit-view-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                    </button>
                </div>
            </div>

            <div class="mt-[5px]">
                <div v-if="currentPassword.visible.value" class="flex flex-col items-start relative">
                    <div class="w-full flex items-center">
                        <input :value="currentPassword.password.value" type="text" placeholder="Current password" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" :class="{ 'border-red-500': currentPassword.wrong.value }" @input="currentPasswordHandler">
                        <button v-if="currentPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showCurrPasswordHandler">
                            <img src="../../../assets/interface-edit-view-off-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                    <p v-if="currentPassword.wrong.value" class="py-[5px] mobileL:text-[14px] text-red-500 animate-fadeIn">{{ currentPassword.wrongMessage.value }}</p>
                    <p v-if="successUpdate" class="py-[5px] mobileL:text-[13px] font-medium text-green-400 animate-fadeIn">Success update password</p>
                </div>
                
                <div v-else class="flex flex-col items-start relative">
                    <div class="w-full flex items-center">
                        <input :value="currentPassword.password.value" type="password" placeholder="Current password" class="w-full py-[12px] mobileL:text-[14px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all animate-fadeIn" :class="{ 'border-red-500': currentPassword.wrong.value }" @input="currentPasswordHandler">
                        <button v-if="currentPassword.password.value.length" class="py-[10px] px-[10px] absolute right-0 cursor-pointer group animate-fadeIn outline-none" @click="showCurrPasswordHandler">
                            <img src="../../../assets/interface-edit-view-interface-white.svg" alt="eye-on-icon" class="w-[22px] opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-all">
                        </button>
                    </div>
                    <p v-if="currentPassword.wrong.value" class="py-[5px] mobileL:text-[14px] text-red-500 animate-fadeIn">{{ currentPassword.wrongMessage.value }}</p>
                    <p v-if="successUpdate" class="py-[5px] mobileL:text-[13px] font-medium text-green-400 animate-fadeIn">Success update password</p>
                </div>
            </div>

        </div>
        
        <div v-if="showChangePassword">
            <button v-if="newPassword.password.value.length && currentPassword.password.value.length" class="w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 animate-fadeIn" @click="updatePassword">
                <p v-if="!updating" class="font-medium">Save Changes</p>

                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="24px" height="22px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="13" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </button>
            <button v-else disabled class="opacity-50 w-full py-[10px] px-[15px] text-[14px] mt-[15px] font-medium rounded-[5px] text-white transition-all bg-indigo-500 cursor-not-allowed">Save Changes</button>
        </div>
        
        <button v-if="!showChangePassword" class="py-[5px] px-[10px] text-[13px] mt-[15px] mobileL:mt-[8px] font-medium rounded-[5px] text-white/60 border border-white/10 transition-all hover:border-indigo-500 hover:text-white hover:bg-indigo-500" @click="changePasswordHandler">Change Password</button>
    </div>
</template>