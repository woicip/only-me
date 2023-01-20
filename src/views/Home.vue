<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuthStore } from '../stores/authUser';

    // Components
    import OffersContainer from '../components/Home/OffersContainer.vue';
    import OffersItemContainer from '../components/Home/OffersItemContainer.vue';
    import OffersItem from '../components/Home/OffersItem.vue';
    import AboutContainer from '../components/Home/AboutContainer.vue';
    import FAQContainer from '../components/Home/FAQContainer.vue';
    import FAQItem from '../components/Home/FAQItem.vue';
    import Nav from '../components/Nav/Index.vue';
    import Footer from '../components/Footer/Index.vue';
    import Home from '../components/Home/Home.vue';
    import MenuMobile from '../components/Nav/MenuMobile.vue';
    import { Base64 } from 'js-base64';

    // graphql
    import graphql from '../fetchs/graphql';
    import ctQuery from '../../graphql/query/ct';

    const authUser = useAuthStore();
    const showMenuMobile = ref(false);

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
            <Home />
        
            <OffersContainer>
                <section class="laptop:px-[50px] mobileL:px-[10px] tablet:w-full mx-auto">
                    <h1 class="w-full text-2xl text-center font-bold mobileL:text-[18]">
                        What <span class="font-bold text-indigo-500">OnlyMe</span> offers to you ?
                    </h1>
    
                    <OffersItemContainer>
                        <OffersItem title="Convenient UI" desc="Made with comfortable and easy to understand UI for user convenience" />
                        <OffersItem title="Transparent" desc="You can see who sent the message but not exactly his identity, for real" />
                        <OffersItem title="Rich Information" desc="Get exactly posted time, who sent message & which comment that the author sent" />
                    </OffersItemContainer>
                </section>
            </OffersContainer>

            <AboutContainer>
                <h1 class="text-3xl font-bold">About </h1>
                <div class="w-[90px] h-[20px] bg-indigo-500 opacity-50 relative bottom-[15px] left-[20px] z-[-1] mobileL:w-[110px]"></div>
                <p class="mt-[20px] text-[16px] text-white leading-relaxed">
                    OnlyMe is a simple Web Application which you can send secret anonymous message to anyone (as long as they have the user profile). 
                    <br/><br/>
                    Send your anonymous message or confess to your friend or someone you know or even public figure (if exist) without need to worry about your real identity.
                </p>
            </AboutContainer>

            <FAQContainer>
                <h1 class="text-3xl font-bold mb-[30px]">Frequently Asked Question </h1>
                <div class="w-[330px] h-[20px] bg-indigo-500 opacity-50 relative bottom-[40px] left-[20px] mobileL:bottom-[45px] mobileL:left-[30px] z-[-1] mobileL:w-[130px]"></div>
                
                <FAQItem number="01" question="Why OnlyMe is exist ?" answer="The main purpose of creating OnlyMe is because i want people can send their message to someone that they know but they don't want to expose their identity to someone they send the message. This is good for expressing" />
                <FAQItem number="02" question="Is OnlyMe free to use ?" answer="Yes, you can use the app for Free." />
                <FAQItem number="03" question="Does OnlyMe collecting user's data and selling the data to any third parties ?" answer="OnlyMe never collect & selling your data to any third parties." />
                <FAQItem number="04" question="Does my data will be deleted completely after i deleted my account ?" answer="Yes, OnlyMe won't backup any of your data before and after deleting account process." />
            </FAQContainer>

            <Footer />
        </section>
    </main>
</template>