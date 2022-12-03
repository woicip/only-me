<script>
    export default {
        props: {
            showMenuMobile: String,
            handler: Function
        }
    }
</script>

<template>
    <main class="hidden tablet:fixed tablet:flex flex-col justify-between top-0 w-[70%] z-30 h-screen bg-[#373A44] border-r border-white/20 shadow-2xl" 
        :class="{ 'translate-x-[-800px]': !showMenuMobile, 'animate-closeMenuMobile': !showMenuMobile, 'translate-x-[0px]': showMenuMobile, 'animate-openMenuMobile': showMenuMobile }">

        <section>
            <div class="flex items-center justify-between text-left py-[12px] px-[15px] border-b border-white/20">
                <p class="text-md font-semibold">Menus</p>
                <button class="py-[8px] px-[11px] rounded-[8px] bg-white/10 hover:bg-indigo-500" @click="handler">
                    <svg class="w-[14px]" xmlns="http://www.w3.org/2000/svg" width="20.605" height="20.605" viewBox="0 0 20.605 20.605">
                        <g id="cross-white" transform="translate(-1307.697 -224.697)">
                            <path id="Path_6" data-name="Path 6" d="M1305.541,242.653l18.484-18.484" transform="translate(3.217 1.589)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                            <path id="Path_7" data-name="Path 7" d="M0,18.484,18.484,0" transform="translate(1327.242 225.758) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </button>
            </div>
    
            <button class="w-full text-left text-[14px] py-[15px] px-[15px] flex items-center justify-between border-b border-white/10 group hover:bg-indigo-500">
                Offers
                <svg class="w-[20px] mr-[10px] opacity-10 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="23.442" height="23.442" viewBox="0 0 23.442 23.442">
                    <g id="Group_1" data-name="Group 1" transform="translate(-1242.128 -267.279)">
                        <path id="Path_8" data-name="Path 8" d="M1305.541,238.624,1320,224.169" transform="translate(489.204 -812.889) rotate(45)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_9" data-name="Path 9" d="M1305.541,230.889l6.72-6.72" transform="translate(1488.255 -1033.261) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_10" data-name="Path 10" d="M1305.541,230.889l6.72-6.72" transform="translate(2569.627 509.889) rotate(180)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                </svg>
            </button>
    
            <button class="w-full text-left text-[14px] py-[15px] px-[15px] flex items-center justify-between border-b border-white/10 group hover:bg-indigo-500">
                About
                <svg class="w-[20px] mr-[10px] opacity-10 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="23.442" height="23.442" viewBox="0 0 23.442 23.442">
                    <g id="Group_1" data-name="Group 1" transform="translate(-1242.128 -267.279)">
                        <path id="Path_8" data-name="Path 8" d="M1305.541,238.624,1320,224.169" transform="translate(489.204 -812.889) rotate(45)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_9" data-name="Path 9" d="M1305.541,230.889l6.72-6.72" transform="translate(1488.255 -1033.261) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_10" data-name="Path 10" d="M1305.541,230.889l6.72-6.72" transform="translate(2569.627 509.889) rotate(180)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                </svg>
            </button>
    
            <button class="w-full text-left text-[14px] py-[15px] px-[15px] flex items-center justify-between border-b border-white/10 group hover:bg-indigo-500">
                FAQ
                <svg class="w-[20px] mr-[10px] opacity-10 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="23.442" height="23.442" viewBox="0 0 23.442 23.442">
                    <g id="Group_1" data-name="Group 1" transform="translate(-1242.128 -267.279)">
                        <path id="Path_8" data-name="Path 8" d="M1305.541,238.624,1320,224.169" transform="translate(489.204 -812.889) rotate(45)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_9" data-name="Path 9" d="M1305.541,230.889l6.72-6.72" transform="translate(1488.255 -1033.261) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_10" data-name="Path 10" d="M1305.541,230.889l6.72-6.72" transform="translate(2569.627 509.889) rotate(180)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                </svg>
            </button>
        </section>

        <section class="mb-[80px] py-[15px] px-[15px]">
            <p class="text-white/10">OnlyMe</p>
        </section>
    </main>
</template>