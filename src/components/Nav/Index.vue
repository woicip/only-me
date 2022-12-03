<script setup>
    import { useAuthStore } from '../../stores/authUser';
    import { defineProps } from 'vue';

    defineProps({
        toggleMenuMobile: Function
    });

    const user = useAuthStore();
</script>

<template>
    <section class="fixed top-0 w-full laptop:w-full bg-[#2f323a] border-b border-white/5 z-20 border">
        <nav class="w-[900px] laptop:px-[50px] tablet:w-full tablet:px-[50px] mobileL:px-[20px] py-[15px] mx-auto flex items-center justify-between animate-fadeIn z-20">
            <div class="flex">
                <!-- <button class="hidden tablet:inline-block mr-[15px]" @click="toggleMenuMobile">
                    <img src="../../assets/hamburger-white.svg" alt="hambuger-menu" class="w-[20px]">
                </button> -->
                <a href="/" class="text-lg cursor-pointer font-bold">OnlyMe</a>
            </div>
    
            <div class="flex items-center">
                <a href="#home" class="mr-[50px] text-sm text-white/50 font-light hover:text-white tablet:hidden">Home</a>
                <a href="#offers" class="mr-[50px] text-sm text-white/50 font-light hover:text-white tablet:hidden">Offers</a>
                <a href="#about" class="mr-[50px] text-sm text-white/50 font-light hover:text-white tablet:hidden">About</a>
                <a href="#faq" class="text-sm text-white/50 font-light hover:text-white tablet:hidden">FAQ</a>

                <div class="mx-[40px] mr-[30px] w-[1px] h-[20px] bg-white/10 tablet:hidden"></div>

                <a v-if="!user.isLoggedIn" href="/register" class="py-[6px] px-[13px] text-sm text-white font-medium bg-transparent rounded-[5px] transition-all">Sign Up</a>
                <a v-if="!user.isLoggedIn" href="/login" class="ml-[10px] py-[6px] px-[20px] text-sm text-white font-medium bg-indigo-500 rounded-full hover:text-white border border-white/10">Sign In</a>
                
                <a v-if="user.isLoggedIn" href="/dashboard" class="py-[6px] px-[10px] hover:bg-white/10 rounded-lg flex items-center">
                    <p class=" mr-[10px] text-right mobileL:text-[14px] font-medium overflow-x-hidden">{{ user.username }}</p>
                    <img v-if="user.avatar !== undefined" :src="user.avatar" alt="avatar" class="w-[30px] h-[30px] rounded-full object-cover">
                    <img v-else src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="avatar" class="w-[30px] h-[30px] rounded-full object-cover">
                </a>
            </div>
        </nav>
    </section>
</template>