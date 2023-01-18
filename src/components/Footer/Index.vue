<template>
    <footer class="900px:w-[900px] tablet:w-screen mx-auto h-full flex items-center justify-center mt-[200px] py-[40px] bg-[#2f323a] laptop:px-[50px] mobileL:px-[25px] mobileL:py-[25px]">
        <section class="w-[900px] h-full mx-auto flex items-start justify-between">
            
            <div class="h-full flex flex-col justify-between">
                <h1 class="font-bold text-[17px] text-white">OnlyMe</h1>
                <p class="mt-[5px] text-sm text-white/40">Send Your Anonymous Message</p>

                <div class="mt-[25px]">
                    <p class="w-[60%] text-white/40 text-sm">This is free application that the founder made.</p>
                </div>
            </div>

            <section class="flex ml-[30px] mobileL:flex-col">
                <div>
                    <h4 class="font-bold">Navigation</h4>
                    <div class="mt-[10px] flex flex-col">
                        <a href="#offers" class="my-[3px] text-sm text-white/50 hover:underline">Offers</a>
                        <a href="#about" class="my-[3px] text-sm text-white/50 hover:underline">About</a>
                        <a href="/faq" class="my-[3px] text-sm text-white/50 hover:underline">FAQ</a>
                    </div>
                </div>
                
                <div class="ml-[50px] w-[90px] mobileL:ml-[0px] mobileL:mt-[30px]">
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