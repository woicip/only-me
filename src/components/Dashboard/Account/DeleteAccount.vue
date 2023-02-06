<script setup>
    import { ref } from 'vue';

    const type = ref('');
    const understand = ref(false);

    function understandHandler(){
        understand.value = true;
    }

    function typeHandler(e){
        type.value = e.target.value;
    }
</script>
<template>
    <div class="py-[20px] pb-[10px] px-[20px] animate-fadeIn">
        <div>
            <h1 class="text-[18px] font-medium">Why are you leaving ? 🙁</h1>
            <p class="mt-[10px] text-white/80 text-[15px] mobileL:text-[14px]">Once you delete your account your account will be lost forever. You cannot restore your account after deletion process.</p>
        </div>

        <button v-if="!understand" class="mt-[40px] w-full py-[10px] font-semibold text-[15px] mobileL:text-[14px] text-white border border-white/20 transition-all hover:border-red-500/80 hover:bg-red-500/80 mt-[40px] rounded-lg animate-fadeIn" @click="understandHandler">I'm Understand</button>

        <div v-else class="mt-[40px] animate-fadeIn">
            <label for="type" class="text-white/50 font-medium">Type <span class="font-semibold text-white/90">delete account</span> to proceed</label>
            <input type="text" placeholder="" class="w-full block py-[10px] bg-transparent border-b border-white/10 outline-none focus:border-white transition-all" @input="typeHandler">
            <button v-if="type === 'delete account'" class="w-full py-[10px] bg-red-500/80 font-semibold mt-[20px] rounded-lg animate-fadeIn">Delete Account</button>
        </div>
    </div>
</template>