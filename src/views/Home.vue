<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuthStore } from '../stores/authUser';

    import Nav from '../components/Nav/Index.vue';
    import Footer from '../components/Footer/Index.vue';
    import HomeHeader from '../components/Header/Home.vue';
    import MenuMobile from '../components/Nav/MenuMobile.vue';
    import { Base64 } from 'js-base64';

    // graphql
    import graphql from '../fetchs/graphql';
    import ctQuery from '../../graphql/query/ct';

    const authUser = useAuthStore();

    const showMenuMobile = ref(false);

    const faq_one = ref(false);
    const faq_two = ref(false);
    const faq_three = ref(false);
    const faq_four = ref(false);
    const faq_five = ref(false);

    function toggleMenuMobile(){
        showMenuMobile.value = !showMenuMobile.value;
    }

    onMounted(async () => {
        document.title = "OnlyMe - Send Your Secret Anonymous Message";

        const authToken = localStorage.getItem('onl_auth');

        if(authToken !== null){
            const token = await graphql({ query: ctQuery(authToken) });
            const { ct } = token.data;

            if(ct.status === "AUTHORIZED"){
                authUser.setLoggedIn(true);
                    
                const token = localStorage.getItem('onl_auth').split('.');
                const decoded = Base64.decode(token[1]);
                const parsed = JSON.parse(decoded);

                authUser.id = parsed.id;
                authUser.username = parsed.username;
                authUser.setLoggedIn(true);

            } else {
                authUser.idHandler("");
                authUser.usernameHandler("");
                authUser.setLoggedIn(false);
            }

        } else {
            authUser.setLoggedIn(false);
        }
    });

</script>

<template>
    <main class="tablet:overflow-hidden" :class="{ 'overflow-hidden': showMenuMobile, 'h-screen': showMenuMobile }">
        <section class="mx-auto text-white">
            <!-- <MenuMobile :showMenuMobile="showMenuMobile" :handler="toggleMenuMobile" /> -->
            <Nav :toggleMenuMobile="toggleMenuMobile" />
            <HomeHeader />
        
            <section id="offers" class="w-[900px] tablet:w-screen mx-auto tablet:px-[50px] mobileL:px-[20px] mt-[200px] mobileL:mt-[150px] animate-fadeIn">
                <section class="laptop:px-[50px] mobileL:px-[10px] tablet:w-full mx-auto">
                    <h1 class="w-full text-2xl text-center font-bold mobileL:text-[18]">What <span class="font-bold text-indigo-400">OnlyMe</span> offers to you ?</h1>
    
                    <section class="mt-[50px] grid grid-cols-3 gap-3 672px:grid-cols-1">
                        <div class="p-[20px] pb-[10px] rounded-xl bg-white/10 hover:bg-indigo-500 transition-all border border-white/10">
                            <h1 class="font-bold text-[18px]">Convenient UI</h1>
                            <p class="mt-[15px] text-sm leading-normal text-white/70">Made with comfortable and easy to understand UI for user convenience</p>
                        </div>
        
                        <div class="p-[20px] rounded-xl bg-white/10 hover:bg-indigo-500 transition-all border border-white/10">
                            <h1 class="font-bold text-[18px]">Transparent </h1>
                            <p class="mt-[15px] text-sm leading-normal text-white/70">You can see who sent the message but not exactly his identity, for real</p>
                        </div>
    
                        <div class="p-[20px] rounded-xl bg-white/10 hover:bg-indigo-500 transition-all border border-white/10">
                            <h1 class="font-bold text-[18px]">Rich Information</h1>
                            <p class="mt-[15px] text-sm leading-normal text-white/70">Get exactly posted time, who sent message & which comment that the author sent</p>
                        </div>
                    </section>
                </section>
            </section>

            <section id="about" class="w-[900px] mt-[200px] mx-auto relative laptop:px-[50px] mobileL:px-[30px] tablet:w-screen">
                <h1 class="text-3xl font-bold">About </h1>
                <div class="w-[90px] h-[20px] bg-indigo-500 opacity-50 relative bottom-[15px] left-[20px] z-[-1] mobileL:w-[110px]"></div>
                <p class="mt-[20px] text-lg text-white leading-relaxed">
                    OnlyMe is a simple Web Application which you can send secret anonymous message to anyone (as long as they have the user profile). 
                    <br/><br/>
                    Send your anonymous message or confess to your friend or someone you know or even public figure (if exist) without need to worry about your real identity.
                </p>
            </section>

            <section id="faq" class="w-[900px] mt-[200px] mx-auto laptop:px-[50px] mobileL:px-[30px] tablet:w-screen">
                <h1 class="text-3xl font-bold mb-[30px]">Frequently Asked Question </h1>
                <div class="w-[330px] h-[20px] bg-indigo-500 opacity-50 relative bottom-[40px] left-[20px] mobileL:bottom-[45px] mobileL:left-[30px] z-[-1] mobileL:w-[130px]"></div>

                <div>
                    <button class="w-full text-left text-[16px] font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="() => faq_one = !faq_one"><span class="italic text-white/30 mr-[20px]">01</span> Why OnlyMe is exist ?</button>
                    <p v-if="faq_one" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">The main purpose of creating OnlyMe is because i want people can send their message to someone that they know but they don't want to expose their identity to someone they send the message. This is good for expressing</p>
                </div>
                <div>
                    <button class="w-full text-left text-[16px]  font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="() => faq_two = !faq_two"><span class="italic text-white/30 mr-[20px]">02</span>Who is created OnlyMe ?</button>
                    <p v-if="faq_two" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">Check out this cool guy <a href="https://github.com/woicip" target="_blank" class="underline text-blue-400">Cipta</a> </p>
                </div>
                <div>
                    <button class="w-full text-left text-[16px]  font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="() => faq_three = !faq_three"><span class="italic text-white/30 mr-[20px]">03</span>Is OnlyMe Free ?</button>
                    <p v-if="faq_three" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">Yes, you can use the app for Free.</p>
                </div>
                <div>
                    <button class="w-full text-left text-[16px]  font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="() => faq_four = !faq_four"><span class="italic text-white/30 mr-[20px]">04</span>Does OnlyMe collecting user's data and selling the data to any third parties ?</button>
                    <p v-if="faq_four" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">OnlyMe never collect & selling your data to any third parties. As you can see you won't see any ads on OnlyMe.</p>
                </div>
                <div>
                    <button class="w-full text-left text-[16px]  font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="() => faq_five = !faq_five"><span class="italic text-white/30 mr-[20px]">05</span>Does my data will be deleted completely after i deleted my account ?</button>
                    <p v-if="faq_five" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">Yes, OnlyMe won't backup any of your data before and after deleting account process.</p>
                </div>
            </section>

            <Footer />
        </section>
    </main>
</template>