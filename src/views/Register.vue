<script setup>
    import { ref, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';

    // Components
    import MiniBanner from '../components/Register/MiniBanner.vue';
    import SignUpActive from '../components/Register/SignUpActive.vue';
    import SignUpDisable from '../components/Register/SignUpDisable.vue';
    import ErrorNotification from '../components/Register/ErrorNotification.vue';
    import SuccessNotification from '../components/Register/SuccessNotification.vue';
    import LoadingButton from '../components/Buttons/Loading.vue';
    import EyeOn from '../components/Input/EyeOn.vue';
    import EyeOff from '../components/Input/EyeOff.vue';
    import PasswordContainer from '../components/Input/PasswordContainer.vue';
    import PasswordOn from '../components/Input/PasswordOn.vue';
    import PasswordOff from '../components/Input/PasswordOff.vue';
    import Logo from '../components/Register/Logo.vue';
    import FormContainer from '../components/Register/FormContainer.vue';
    import InputText from '../components/Input/Text.vue';
    import InputEmail from '../components/Input/Email.vue';
    import AlreadyHave from '../components/Register/AlreadyHave.vue';

    // GraphQL
    import graphql from '../fetchs/graphql';
    import registerUser from '../../graphql/mutation/register';

    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const email = ref("");
    const showPass = ref(false);
    const process = ref(false);
    const problem = ref({ show: false, message: "" });
    const success = ref({ show: false, message: "" });
    const timer = ref(3);

    function usernameInput(value){
        username.value = value;
    }

    function emailInput(value){
        email.value = value;
    }

    function showPassHandler(){
        showPass.value = !showPass.value;
    }

    function passwordInput(value){
        password.value = value;
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
    <main class="w-full h-full flex items-center justify-center">
        <section class="my-[300px] tablet:my-[200px] w-[45%] laptop:w-[75%] tablet:w-[85%] 900px:w-[90%] laptopL:w-[60%]">
            <Logo />

            <div class="w-full flex items-start justify-between tablet:flex-col">
                <MiniBanner />
    
                <FormContainer>
                    <ErrorNotification v-if="problem.show" :message="problem.message" />
                    <SuccessNotification v-if="success.show" :message="success.message" :timer="timer" />

                    <InputText name="Username" placeholder="smithster" :value="username" :handler="usernameInput" />
                    <InputEmail placeholder="smithster@mail.com" :value="email" :handler="emailInput" />

                    <PasswordContainer>
                        <EyeOn v-if="showPass" :handler="showPassHandler" />
                        <EyeOff v-else :handler="showPassHandler" />
                        <PasswordOn v-if="showPass" :password="password" :handler="passwordInput" />
                        <PasswordOff v-else :password="password" :handler="passwordInput" />
                    </PasswordContainer>

                    <section>
                        <div v-if="!process">
                            <SignUpActive v-if="username.length > 3 && password.length > 6 && email.includes('@')" :register="register" />
                            <SignUpDisable v-else />
                        </div>
                        <LoadingButton v-else />
                    </section>

                    <AlreadyHave />
                </FormContainer>
            </div>

            <div class="tablet:mt-[100px]">
                <p class="text-white/30 text-xs font-thin">© Copyright OnlyMe 2023</p>
            </div>
        </section>
    </main>
</template>