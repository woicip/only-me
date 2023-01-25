<script setup>
    import { ref } from 'vue';
    import Item from './Account/Item.vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../../stores/authUser';

    // Components
    import Account from './Account/Account.vue';
    import GetVerified from './Account/GetVerified.vue';
    import DeleteAccount from './Account/DeleteAccount.vue';
    
    // Assets
    import credentialIcon from '../../assets/credential.svg';
    import getVerifiedIcon from '../../assets/get-verified.svg';
    import deleteAccountIcon from '../../assets/delete-account.svg';

    const authUser = useAuthStore();
    const router = useRouter();

    const open = {
        credential: ref(false),
        getVerified: ref(false),
        deleteAccount: ref(false)
    }

    function backHandler(){
        open.credential.value = false;
        open.getVerified.value = false;
        open.deleteAccount.value = false;
    }

    function credentialHandler(){
        open.credential.value = true;
        open.getVerified.value = false;
        open.deleteAccount.value = false;
    }

    function getVerifiedHandler(){
        open.credential.value = false;
        open.getVerified.value = true;
        open.deleteAccount.value = false;
    }

    function deleteAccountHandler(){
        open.credential.value = false;
        open.getVerified.value = false;
        open.deleteAccount.value = true;
    }

    function logoutHandler(){
        authUser.setLoggedIn(false);
        localStorage.removeItem('onl_auth');
        router.push('/');
    }

</script>
<template>
    <section class="animate-fadeIn mobileL:px-[15px] bg-white/5 border border-white/5 py-[20px] rounded-lg">
        <div>
            <h1 v-if="!open.credential.value && !open.getVerified.value && !open.deleteAccount.value" class="text-[18px] px-[20px]">Account Center</h1>
            <div v-if="open.credential.value" class="px-[20px] pb-[20px] border-b border-white/10 flex items-center">
                <button class="py-[5px] px-[15px] text-[14px] rounded-full bg-white/5 hover:bg-white/10" @click="backHandler">Back</button>
                <h1 class="ml-[15px] text-[18px] font-medium">Account</h1>
            </div>

            <div v-if="open.getVerified.value" class="px-[20px] pb-[20px] border-b border-white/10 flex items-center">
                <button class="py-[5px] px-[15px] text-[14px] rounded-full bg-white/5 hover:bg-white/10" @click="backHandler">Back</button>
                <h1 class="ml-[15px] text-[18px] font-medium">Get Verified</h1>
            </div>

            <div v-if="open.deleteAccount.value" class="px-[20px] pb-[20px] border-b border-white/10 flex items-center">
                <button class="py-[5px] px-[15px] text-[14px] rounded-full bg-white/5 hover:bg-white/10" @click="backHandler">Back</button>
                <h1 class="ml-[15px] text-[18px] font-medium">Delete Account</h1>
            </div>
        </div>

        <div v-if="!open.credential.value && !open.getVerified.value && !open.deleteAccount.value" class="mt-[20px] border-t border-white/10 animate-fadeIn">
            <Item name="Account" desc="Email address, password" :image="credentialIcon" :handler="credentialHandler" />
            <Item name="Get Verified" desc="Wanna get verified ?" :image="getVerifiedIcon" :handler="getVerifiedHandler" />
            <Item name="Delete Account" desc="You'll lose your account" :image="deleteAccountIcon" :handler="deleteAccountHandler" />
        </div>

        <Account v-if="open.credential.value" />
        <GetVerified v-if="open.getVerified.value" />
        <DeleteAccount v-if="open.deleteAccount.value" />
    </section>

    <button class="w-full mt-[20px] animate-fadeIn mobileL:px-[15px] bg-white/5 border border-red-400/30 py-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg" @click="logoutHandler">
        Logout
    </button>
</template>