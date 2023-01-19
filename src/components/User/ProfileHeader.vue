<script setup>

    defineProps({
        avatar: String,
        username: String,
        fullname: String,
        bio: String,
        verified: Boolean
    });

</script>

<template>
    <main>
        <section class="flex items-center">
            <img v-if="avatar !== null" :src="avatar" :alt="username" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover">
            <img v-if="avatar === null" src="https://www.theparentingplace.net/wp-content/uploads/2021/02/BlankImage.jpg" :alt="username" class="w-[80px] h-[80px] mobileL:w-[70px] mobileL:h-[70px] rounded-full object-cover">
    
            <div class="ml-[20px]">
                <div>
                    <h1 class="text-white font-bold text-lg">{{ fullname === null ? username : fullname }}</h1>
                    <div class="flex items-center">
                        <p class="text-[14px] text-white/40">@{{ username }}</p>
                        <img v-if="verified" src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[20px] ml-[6px]"/>
                    </div>
                </div>
            </div>
        </section>

        <div class="mt-[26px]">
            <p v-if="bio !== null" v-bind:innerHTML="bio" class="mt-[5px] text-[13px] text-[#B1B1B1]"></p>
            <p v-else class="mt-[5px] text-[14px] text-[#B1B1B1]">No bio available</p>
        </div>
    </main>
</template>