<script>
    export default {
        props: {
            placeholder: String,
            value: String,
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
    <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] border border-white/5">
        <p class="text-[11px] text-white/80 font-light">Username</p>
        <input :value="value" type="text" name="username" id="username" :placeholder="placeholder" class="w-full text-white bg-transparent focus:outline-none placeholder:text-white/30" @input="inputHandler"/>
    </div>
</template>