<script setup>
    import { useAuthStore } from '../../stores/authUser';
    import { defineProps, ref } from 'vue';

    // Assets
    import menu from '../../assets/icons/menu-onlyme.svg';
    import menuClose from '../../assets/icons/menu-close-onlyme.svg';
    import login from '../../assets/icons/login-onlyme.svg';
    import register from '../../assets/icons/register-onlyme.svg';

    defineProps({
        toggleMenuMobile: Function
    });

    const menuMobile = ref(false);

    function menuMobileHandler(){
        menuMobile.value = !menuMobile.value;
    }

    const user = useAuthStore();
</script>

<template>
    <section class="fixed top-0 w-full laptop:w-full bg-[#2f323a] border-b border-white/5 z-20">
        <nav class="w-full py-[15px] px-[300px] laptopM:px-[200px] laptopS:px-[100px] laptop:px-[50px] tablet:w-full tablet:px-[50px] mobileL:px-[20px] flex items-center justify-between animate-fadeIn z-20">
            <a href="/" class="text-lg cursor-pointer font-bold">OnlyMe</a>
    
            <div class="flex items-center tabletL:hidden">
                <a href="#offers" class="mr-[50px] text-sm text-white/50 font-light hover:text-white">Offers</a>
                <a href="#about" class="mr-[50px] text-sm text-white/50 font-light hover:text-white">About</a>
                <a href="#faq" class="text-sm text-white/50 font-light hover:text-white">FAQ</a>

                <div class="mx-[40px] mr-[30px] w-[1px] h-[20px] bg-white/10"></div>

                <a v-if="!user.isLoggedIn" href="/register" class="py-[6px] px-[13px] text-sm text-white font-medium bg-transparent rounded-[5px] transition-all">Sign Up</a>
                <a v-if="!user.isLoggedIn" href="/login" class="ml-[10px] py-[6px] px-[20px] text-sm text-white font-medium bg-indigo-500 rounded-full hover:text-white border border-white/10">Sign In</a>
                
                <a v-if="user.isLoggedIn" href="/dashboard" class="py-[6px] px-[10px] hover:bg-white/10 rounded-lg flex items-center">
                    <p class=" mr-[10px] text-right mobileL:text-[14px] font-medium overflow-x-hidden">{{ user.username }}</p>
                    <img v-if="user.avatar !== undefined" :src="user.avatar" alt="avatar" class="w-[30px] h-[30px] rounded-full object-cover">
                    <img v-else src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="avatar" class="w-[30px] h-[30px] rounded-full object-cover">
                </a>
            </div>

            <div class="hidden tabletL:block">
                <button class="py-[5px] px-[15px] flex items-center rounded-full" :class="{ 'bg-white/5': menuMobile }" @click="menuMobileHandler">
                    <img v-if="!menuMobile" :src="menu" alt="menu_icon" class="w-[13px]" />
                    <img v-else :src="menuClose" alt="menu_icon" class="w-[13px]" />
                    <p class="ml-[10px]">Menu</p>
                </button>
            </div>
        </nav>

        <section v-if="menuMobile" class="hidden w-full h-full tabletL:flex flex-col justify-between bg-[#2f323a] border-b border-white/5">
            <div class="w-full mt-[10px]">
                <a href="#offers" class="inline-block w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">Offers</a>
                <a href="#about" class="inline-block w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">About</a>
                <a href="#faq" class="inline-block w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">FAQ</a>
                <a v-if="!user.isLoggedIn" href="/login" class="w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] flex items-center border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">
                    <img :src="login" alt="login_icon" class="w-[18px] mr-[10px]" />
                    Sign In
                </a>
                <a v-if="!user.isLoggedIn" href="/register" class="w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] flex items-center border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">
                    <img :src="register" alt="login_icon" class="w-[18px] mr-[10px]" />
                    Register
                </a>
                <a v-if="user.isLoggedIn" href="/register" class="w-full text-[16px] py-[10px] mobileL:px-[20px] tabletL:px-[50px] flex items-center border-b border-white/10 hover:bg-white/5" @click="menuMobileHandler">
                    <img :src="register" alt="login_icon" class="w-[18px] mr-[10px]" />
                    {{ user.username }}
                </a>
            </div>

            <p class="my-[20px] mobileL:px-[20px] tabletL:px-[50px] text-[12px] text-white/30">Copyright OnlyMe 2023</p>
        </section>
    </section>
</template>