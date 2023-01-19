<script setup>
    const props = defineProps({
        id: String,
        avatar: String,
        bio: String,
        fullname: String,
        username: String,
        verified: Boolean,
        copy: Object,
        copyClickHandler: Function
    })

</script>
<template>
    <section>
        <div class="header mt-[30px] mobileL:mt-[30px] mobileL:w-full flex items-center justify-between">
            <div class="flex items-center">
                <img v-if="avatar !== null" :src="avatar" alt="avatar" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover ">
                <img v-else src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" alt="avatar" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover ">

                <div class="ml-[30px] mobileL:ml-[20px]">
                    <h1 class="fullname text-lg font-bold mobileL:text-[16px]">{{ fullname !== null ? fullname : username }}</h1>
                    <div class="flex items-center">
                        <p class="username text-white/40 text-sm mobileL:text-[13px]">@{{ username }}</p>
                        <img v-if="verified" src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[20px] ml-[6px]"/>
                    </div>
                </div>
            </div>
        </div>

        <p v-if="bio !== null" v-bind:innerHTML="bio" class="mt-[30px] mobileL:mt-[30px] text-[#a8a8a8] text-[13px] mobileL:text-[13px]"></p>
    </section>
</template>