<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/authUser';
    import LoadingButton from '../components/Buttons/Loading.vue';

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

    function usernameInput(e){
        username.value = e.target.value;
    }

    function passwordInput(e){
        password.value = e.target.value;
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
    <main class="w-screen h-screen mobileL:px-[15px] flex flex-col items-center justify-center animate-fadeIn">
        <section class="w-[400px] mobileL:px-[20px] mobileL:w-screen">
            <a href="/" class="w-fit mt-[30px] text-white hover:underline items-center fixed top-10"> OnlyMe </a>

            <section class="w-full mobileL:w-full">
                <h1 class="w-full text-left text-white text-lg">Sign in to <span class="font-bold">OnlyMe</span></h1>
    
                <div class="mt-[40px]">
                    <p v-if="loginFail.show.value" class="text-red-500 font-semibold text-sm rounded-md">{{ loginFail.message }}</p>
    
                    <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5">
                        <p class="text-[11px] text-white/30 font-light">Username</p>
                        <input v-bind:value="username" type="text" name="username" id="username" placeholder="John Wells" class="w-full text-white bg-transparent focus:outline-none placeholder:text-white/30" @input="usernameInput"/>
                    </div>
    
                    <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5 relative">
                        <p class="text-[11px] text-white/30 font-light">Password</p>
                        <img v-if="!showPass" src="../assets/interface-edit-view-interface-white.svg" alt="icon" class="w-[21px] h-full absolute top-0 right-5 cursor-pointer z-10" @click="showPassHandler">
                        <img v-else src="../assets/interface-edit-view-off-interface-white.svg" alt="icon" class="w-[21px] h-full absolute top-0 right-5 cursor-pointer z-10" @click="showPassHandler">
    
                        <input v-if="!showPass" v-bind:value="password" type="password" name="password" id="password" placeholder="•••••••••" class="w-full text-white bg-transparent focus:outline-none" @input="passwordInput"/>
                        <input v-else v-bind:value="password" type="text" name="password" id="password" placeholder="•••••••••" class="w-full text-white bg-transparent focus:outline-none" @input="passwordInput"/>
                    </div>
                    
                    <LoadingButton v-if="loginProcess"/>
                    <button v-else v-show="username.length && password.length" class="w-full mt-[10px] py-[14px] text-md rounded-[8px] text-white text-[16px] font-semibold bg-indigo-500 animate-fadeIn focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-600" @click="login">Sign In</button>
                </div>
    
            </section>
    
            <div class="mt-[10px] py-[10px]">
                <p class="text-white/50 font-thin text-[13px]">Doesn't have an account ? </p>
                <a href="/register" class="text-[13px] text-white/50 hover:underline hover:text-white">Sign Up</a>
            </div>

            <div>
                <p class="text-xs text-white/20 fixed bottom-10">Copyright OnlyMe@2022</p>
            </div>
        </section>

    </main>
</template>