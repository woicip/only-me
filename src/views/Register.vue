<script setup>
    import { ref, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';
    import InputText from '../components/Input/Text.vue';

    // GraphQL
    import graphql from '../fetchs/graphql';
    import registerUser from '../../graphql/mutation/register';

    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const showPass = ref(false);
    const process = ref(false);
    const problem = ref({ show: false, message: "" });
    const success = ref({ show: false, message: "" });
    const timer = ref(3);

    function usernameInput(value){
        username.value = value;
    }

    function showPassHandler(){
        showPass.value = !showPass.value;
    }

    function passwordInput(e){
        password.value = e.target.value;
    }

    const timeout = ref(null);
    const interval = ref(null);

    async function register(){
        process.value = true;
        const register = await graphql({ query: registerUser(username.value, password.value) });
        const { status, message } = register.data.register;
        if(status === "OK"){
            timeout.value = setTimeout(() => {
                router.push('/login');
            }, 3000);
            
            interval.value = setInterval(() => {
                timer.value--
            }, 1000);

            process.value = false;
            problem.value.show ? problem.value = { show: false, message: "" } : "";
            success.value = { show: true, message: message };

        } else if(status === "CONFLICT") {
            problem.value = { show: true, message: message };
            process.value = false;

        } else if(status === "ERROR"){
            problem.value = { show: true, message: message };
            process.value = false;
        }
    }

    onUnmounted(() => {
        clearTimeout(timeout);
        clearInterval(interval);
    });

</script>

<template>
    <main class="w-screen h-screen flex items-center justify-center">
        <section class="w-[45%] laptop:w-[75%] tablet:w-[85%] laptopL:w-[60%]">
            <div class="h-fit fixed top-[50px]">
                <a href="/" class="text-white font-medium">OnlyMe</a>
            </div>

            <div class="w-full flex items-start justify-between mobileL:flex-col">
                <div class="h-full">
                    <h1 class="text-[38px] text-white font-bold mobileL:text-3xl">Sign Up</h1>
                    <p class="mt-[100px] mobileL:mt-[10px] text-white/50">Sign up now to get started and make your <br/>own host anonymous message.</p>
                    <div class="w-[140px] h-[20px] bg-indigo-500 opacity-50 relative bottom-[165px] left-[24px] mobileL:bottom-[70px] mobileL:left-[24px] z-[-1] mobileL:w-[110px]"></div>
                </div>
    
                <div class="my-0 w-[1px] h-full border border-white/10 mobileL:hidden"></div>
    
                <div class="w-[40%] mobileL:w-full mobileL:mt-[30px]">
                    <div v-if="problem.show" class="mb-[10px] bg-red-500 px-[15px] py-[3px] rounded-lg animate-fadeIn">
                        <p class="text-sm text-white">{{ problem.message }}</p>
                    </div>

                    <div v-if="success.show" class="flex items-center justify-between mb-[10px] bg-green-500/50 px-[15px] py-[10px] rounded-lg animate-fadeIn">
                        <p class="text-sm text-white">{{ success.message }}</p>
                        <p class="text-sm text-white font-bold">{{ timer }}</p>
                    </div>

                    <InputText name="Username" placeholder="smithster" :value="username" :handler="usernameInput" />
                    <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] relative ring-1 ring-white/10">
                        <p class="text-[11px] text-white/50 font-light">Password</p>
    
                        <img v-if="!showPass" src="../assets/interface-edit-view-interface-white.svg" alt="icon" class="w-[21px] h-full absolute top-0 right-5 cursor-pointer z-10" @click="showPassHandler">
                        <img v-else-if="showPass" src="../assets/interface-edit-view-off-interface-white.svg" alt="icon" class="w-[21px] h-full absolute top-0 right-5 cursor-pointer z-10" @click="showPassHandler">
    
                        <input v-if="!showPass" :value="password" type="password" placeholder="•••••••••" class="w-full text-white bg-transparent focus:outline-none placeholder:text-white/20" @input="passwordInput">
                        <input v-else-if="showPass" :value="password" type="text" placeholder="•••••••••" class="w-full text-white bg-transparent focus:outline-none placeholder:text-white/20" @input="passwordInput">
                    </div>

                    <div v-if="!process">
                        <button v-if="username.length > 3 && password.length > 6" class="w-full mt-[10px] text-white font-bold py-[13px] px-[15px] bg-indigo-500 animate-fadeIn rounded-lg transition-all" @click="register">Sign Up</button>
                        <button v-else disabled class="w-full mt-[10px] text-white font-bold py-[13px] px-[15px] bg-indigo-500 rounded-lg opacity-20">Sign Up</button>
                    </div>

                    <div v-else>
                        <button class="w-full mt-[10px] text-white font-bold py-[13px] px-[15px] bg-indigo-500 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="13" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                </circle>
                            </svg>
                        </button>
                    </div>

                    <div class="mt-[20px]">
                        <p class="text-white/50 font-thin text-[13px]">Already have an account ?</p>
                        <a href="/login" class="text-[13px] text-white/50 hover:underline hover:text-indigo-500">Login</a>
                    </div>
                </div>
            </div>

            <div class="fixed bottom-[40px]">
                <p class="text-white/30 text-xs font-thin">Part of CiptaCreate</p>
            </div>
        </section>

    </main>
</template>