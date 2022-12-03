<script>
    export default {
        props: {
            name: String,
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
    <div class="mt-[10px] py-[10px] px-[15px] bg-white/5 rounded-[8px] ring-1 ring-white/10">
        <p class="text-[11px] text-white/40 font-light">{{ name }}</p>
        <textarea :value="value" name="message" id="message" :placeholder="placeholder" class="w-full h-[96px] text-sm text-white bg-transparent focus:outline-none placeholder:text-sm placeholder:text-white/20" @input="inputHandler"></textarea>
    </div>
</template>