<template>
    <footer class="px-[200px] laptopS:px-[100px] tablet:w-screen mx-auto h-full flex items-center justify-center mt-[200px] py-[40px] bg-[#2f323a] laptop:px-[50px] mobileL:px-[25px] mobileL:py-[25px]">
        <section class="w-full h-full mx-auto flex mobileL:flex-col items-start justify-between">
            
            <div class="w-full h-full flex flex-col justify-between">
                <h1 class="font-bold text-[17px] text-white">OnlyMe</h1>
                <p class="mt-[5px] text-sm text-white/40">Send Your Anonymous Message</p>

                <div class="mt-[25px]">
                    <p class="w-[60%] text-white/40 text-sm">This is free application that the founder made.</p>
                </div>
            </div>

            <section class="mobileL:w-full mobileL:mt-[40px] flex mobileL:grid mobileL:grid-cols-2">
                <div class="w-fit">
                    <h4 class="font-bold">Navigation</h4>
                    <div class="mt-[10px] flex flex-col">
                        <a href="#offers" class="my-[3px] text-sm text-white/50 hover:underline">Offers</a>
                        <a href="#about" class="my-[3px] text-sm text-white/50 hover:underline">About</a>
                        <a href="/faq" class="my-[3px] text-sm text-white/50 hover:underline">FAQ</a>
                    </div>
                </div>
                
                <div class="ml-[50px] mobileL:ml-0 justify-self-start">
                    <h4 class="font-bold">Application</h4>
                    <div class="mt-[10px] flex flex-col">
                        <a href="/login" class="my-[3px] text-sm text-white/50 hover:underline">Sign In</a>
                        <a href="/register" class="my-[3px] text-sm text-white/50 hover:underline">Sign Up</a>
                    </div>
                </div>
            </section>

        </section>
    </footer>
</template>