<script>
    export default {
        props: {
            updated: Boolean,
            updatedHandler: Function
        }
    }
</script>

<template>
    <section class="h-[140px] w-full fixed bottom-0 flex items-center justify-center mobileL:w-screen">
        <div :class="{ 'animate-updatedInformation': updated }" class="opacity-0 w-fit pl-[20px] rounded-lg bg-black/20 fixed flex items-center">
            <p class="text-white mobileL:text-sm">Your information is updated</p>
            <button class="ml-[50px] py-[14px] px-[20px] h-full border-l border-white/10 text-white text-sm" @click="updatedHandler">Close</button>
        </div>
    </section>
</template>