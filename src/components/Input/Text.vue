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
    <div class="w-full py-[10px] px-[15px] bg-white/5 rounded-[8px] ring-1 ring-white/10">
        <p class="text-[11px] text-white/70">{{ name }}</p>
        <input :value="value" type="text" :placeholder="placeholder" class="w-full text-sm text-white bg-transparent focus:outline-none placeholder:text-sm placeholder:text-white/20" @input="inputHandler">
    </div>
</template>