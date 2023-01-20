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
    const loginProcess = ref(false);
    const loginFail = {
        show: ref(false),
        message: ref(null)
    };

    function usernameInput(value){ username.value = value }
    function passwordInput(value){ password.value = value }
    function showPassHandler(){ showPass.value = !showPass.value }

    function FailLoginHandler({ loading, show, message }){
        loginProcess.value = loading;
        loginFail.show.value = show;
        loginFail.message = message;
    }

    async function login(){
        loginProcess.value = true;

        const { data: { login } } = await graphql({ query: loginQuery(username.value, password.value) }, error => {
            if(error){
                FailLoginHandler({ loading: false, show: true, message: "We have technical issue going on." });
            }
        });

        if(login.status === 'OK'){
            FailLoginHandler({ loading: false, show: false, message: null });
            
            localStorage.setItem("onl_auth", login.token);

            const parsed = parseJWT(login.token);
            authUser.idHandler(parsed.id);
            authUser.usernameHandler(parsed.username);
            authUser.setLoggedIn(true);

            router.push('/dashboard');

        } else {
            FailLoginHandler({ loading: false, show: true, message: "User not found." });
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
    <main class="w-full h-screen mobileL:h-full flex flex-col items-center justify-center animate-fadeIn">
        <section class="my-[300px] tablet:my-[280px] w-[400px] tablet:w-[85%] laptop:w-[40%]">
            <Logo />

            <section class="w-full mobileL:w-full">
                <h1 class="w-full text-left text-white text-lg">
                    Sign in to <span class="font-bold">OnlyMe</span>
                </h1>
    
                <div class="mt-[15px]">
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