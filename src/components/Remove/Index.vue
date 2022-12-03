<script>
    export default {
        props: {
            remove: Boolean,
            disappearRemoveWarning: Function,
            userRemoveMessage: Function,
        },
        methods: {
            removeComment(){
                // do remove comment code
            }
        }
    }
</script>

<template>
    <div v-if="remove" class="w-full h-full px-[15px] flex flex-col items-center justify-center border border-white/10 bg-white/10 rounded-[15px] absolute z-10 animate-fadeIn">
        <h1 class="mb-[20px] text-md font-bold mobileL:text-[14px]">Are you sure want to delete this message ?</h1>
        <div class="w-[40%] flex items-center justify-center">
            <button class="w-full py-[10px] px-[15px] mobileL:text-[14px] rounded-lg text-red-600 bg-white font-medium" @click="userRemoveMessage">Delete</button>
            <button class="w-full ml-[5px] py-[10px] px-[15px] mobileL:text-[14px] rounded-lg bg-white/25 font-medium" @click="disappearRemoveWarning">Cancel</button>
        </div>
    </div>
</template>