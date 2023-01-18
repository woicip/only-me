<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authUser';

    // Components
    import DontHave from '../components/Login/DontHave.vue';
    import SignInActive from '../components/Login/SignInActive.vue';
    import Logo from '../components/Login/Logo.vue';
    import Username from '../components/Input/Username.vue';
    import LoadingButton from '../components/Buttons/Loading.vue';
    import PasswordContainer from '../components/Input/PasswordContainer.vue';
    import EyeOff from '../components/Input/EyeOff.vue';
    import EyeOn from '../components/Input/EyeOn.vue';
    import PasswordOff from '../components/Input/PasswordOff.vue';
    import PasswordOn from '../components/Input/PasswordOn.vue';
    import FailNotification from '../components/Login/FailNotification.vue';

    // graphql
    import graphql from '../fetchs/graphql';
    import loginQuery from '../../graphql/query/login';
    import ctQuery from '../../graphql/query/ct';

    // parseJWT
    import parseJWT from '../functions/parseJWT';

    const authUser = useAuthStore();
    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const showPass = ref(false);
    const loginFail = {
        show: ref(false),
        message: ref(null)
    };
    const loginProcess = ref(false);

    function usernameInput(value){
        username.value = value;
    }

    function passwordInput(value){
        password.value = value;
    }

    function showPassHandler(){
        showPass.value = !showPass.value;
    }

    async function login(){
        loginProcess.value = true;

        const login = await graphql({ query: loginQuery(username.value, password.value) });
        const { data } = login;
        
        if(data.login.code === 200){
            loginProcess.value = false;
            if(loginFail.show.value) loginFail.show.value = false;
            
            localStorage.setItem("onl_auth", data.login.token);

            const parsed = parseJWT(data.login.token);

            authUser.idHandler(parsed.id);
            authUser.usernameHandler(parsed.username);
            authUser.setLoggedIn(true);

            router.push('/dashboard');

        } else {
            loginProcess.value = false;
            loginFail.show.value = true;
            loginFail.message.value = "User Not Found"
            password.value = ""
        }
    }

    onMounted(async () => {
        document.title = "Login - Only Me";

        const authToken = localStorage.getItem('onl_auth');
        if(authToken !== null){
            try {
                const token = await graphql({ query: ctQuery(authToken) });
                const { ct } = token.data;
                if(ct.status === "AUTHORIZED") router.push('/dashboard');

            } catch(err){
                console.error(err);
                // localStorage.removeItem('onl_auth');
            }
        }
    });
</script>

<template>
    <main class="w-full h-full flex flex-col items-center justify-center animate-fadeIn">
        <section class="my-[300px] tablet:my-[280px] w-[25%] tablet:w-[85%] laptop:w-[40%]">
            <Logo />

            <section class="w-full mobileL:w-full">
                <h1 class="w-full text-left text-white text-lg">
                    Sign in to <span class="font-bold">OnlyMe</span>
                </h1>
    
                <div class="mt-[40px]">
                    <FailNotification v-if="loginFail.show.value" :message="loginFail.message" />
    
                    <Username placeholder="John Smith" :value="username" :handler="usernameInput"  />
                    <PasswordContainer>
                        <EyeOff v-if="!showPass" :handler="showPassHandler" />
                        <EyeOn v-else :handler="showPassHandler" />
                        <PasswordOff v-if="!showPass" :password="password" :handler="passwordInput" />
                        <PasswordOn v-else :password="password" :handler="passwordInput" />
                    </PasswordContainer>
                    
                    <LoadingButton v-if="loginProcess"/>
                    <SignInActive v-else :username="username" :password="password" :login="login" />
                </div>
            </section>
    
            <DontHave />

            <div>
                <p class="text-xs text-white/20 fixed bottom-10">Copyright OnlyMe@2022</p>
            </div>
        </section>

    </main>
</template>