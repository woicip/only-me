<script setup>
    import Item from './Account/Item.vue';
</script>
<template>
    <section class="animate-fadeIn mobileL:px-[15px] bg-white/10 py-[20px] rounded-lg">
        <h1 class="text-[18px] px-[20px]">Account Center</h1>

        <div class="mt-[20px] border-t border-white/10">
            <Item name="Credential" desc="Email address, password" />
            <Item name="Get Verified" desc="Wanna get verified ?" />
            <Item name="Delete Account" desc="You'll lose your account" />
        </div>
    </section>
</template>