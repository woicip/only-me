<script>
    export default {
        props: {
            password: String,
            handler: Function
        },
        methods: {
            inputHandler(e){
                this.handler(e.target.value);
            }
        }
    }
</script>
<template>
    <input :value="password" type="password" placeholder="•••••••••" class="w-full text-white bg-transparent focus:outline-none placeholder:text-white/20" @input="inputHandler" />
</template>