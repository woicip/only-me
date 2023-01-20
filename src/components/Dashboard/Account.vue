<script>
    export default {
        props: {
            email_address: String,
            password: String,
        }
    }
</script>
<template>
    <section class="animate-fadeIn mobileL:px-[15px]">
        <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
            <div class="absolute py-[5px] px-[15px] rounded-full bg-yellow-600/80 z-10 text-xs right-4 top-4">Under Construction</div>
            <p class="text-[11px] text-white/30 font-light">Email Address</p>
            <input :value="email_address" type="text" name="fullname" id="fullname" :placeholder="email_address" class="w-full text-white bg-transparent focus:outline-none" @input="email_address"/>
        </div>

        <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
            <div class="absolute py-[5px] px-[15px] rounded-full bg-yellow-600/80 z-10 text-xs right-4 top-4">Under Construction</div>
            <p class="text-[11px] text-white/30 font-light">New Password</p>
            <input :value="email_address" type="password" name="fullname" id="fullname" :placeholder="password" class="w-full text-white bg-transparent focus:outline-none" @input="password"/>
        </div>
    </section>
</template>