<script setup>
    const props = defineProps({
        accountView: Boolean,
        handler: Function
    });

    function accountViewHandler(){
        props.handler();
    }
</script>
<template>
    <div class="ml-[8px] relative bottom-[-1px]">
        <button v-if="accountView" class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-lg bg-indigo-500 border-b border-indigo-500">Account</button>
        <button v-else class="py-[10px] px-[15px] text-sm font-semibold mobileL:text-[13px] rounded-t-md hover:bg-white/10 border-b border-transparent hover:border-white" @click="accountViewHandler">Account</button>
    </div>
</template>