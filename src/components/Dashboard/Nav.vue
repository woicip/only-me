<script>
    export default {
        props: {
            logoutHandler: Function
        }
    }
</script>
<template>
    <nav class="flex items-center justify-between pb-[20px] mobileL:pb-[15px] mobileL:px-[15px] border-b border-white/10">
        <a href="/dashboard" class="text-lg mobileL:text-[15px] font-bold">OnlyMe <span class="py-[2px] px-[5px] ml-[6px] text-xs rounded-md bg-indigo-500">Dashboard</span></a>
        <div>
            <button class="text-[14px] text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all py-[3px] px-[12px] rounded-full mobileL:text-[13px]" @click="logoutHandler">Log out</button>
        </div>
    </nav>
</template>