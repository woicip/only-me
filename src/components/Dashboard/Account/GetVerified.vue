<script setup>
    import { onMounted, ref } from 'vue';
    import VerifiedRequirementsGraphQL from '../../../../graphql/fetch/VerifiedRequirementsGraphQL';

    const verifiedRequirements = {
        messages: ref(0),
        comments: ref(0)
    }

    async function getRequirements(){
        const token = localStorage.getItem('onl_auth');
        const [ result, error ] = await VerifiedRequirementsGraphQL(token);
        
        if(error){
            alert('SOMETHING_WENT_WRONG!');

        } else {
            const { status } = result;

            if(status === 'OK'){
                verifiedRequirements.messages.value = result.messages;
                verifiedRequirements.comments.value = result.comments;

            } else {
                alert("Can't get verified requirements!");
            }
        }
    }

    onMounted(() => {
        getRequirements();
    })

</script>
<template>
    <div class="py-[20px] pb-[10px] px-[20px] mobileL:px-[15px] animate-fadeIn">
        <div>
            <h1 class="text-[18px] mobileL:text-[17px] font-medium flex items-center">
                Get Your Verified Badge!
                <img src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[25px] ml-[6px]"/>
            </h1>
            <p class="mt-[5px] text-white/80 text-[15px] mobileL:text-[14px]">There are several information that I want to share to you before you get the verified badge.</p>

            <div class="mt-[40px]">
                <h2 class="font-medium text-[18px] mobileL:text-[17px]">Why you should get verified ?</h2>
                <ul class="mt-[5px]">
                    <li class="py-[3px] text-white/80 text-[15px] mobileL:text-[14px] flex items-center">
                        <img src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[22px] mr-[10px]"/>
                        Prevent someone to impersonate you
                    </li>
                    <li class="py-[3px] text-white/80 text-[15px] mobileL:text-[14px] flex items-center">
                        <img src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[22px] mr-[10px]"/>
                        Make sure someone sending a message to the right person
                    </li>
                    <li class="py-[3px] text-white/80 text-[15px] mobileL:text-[14px] flex items-center">
                        <img src="https://img.icons8.com/color/48/000000/verified-badge.png" class="w-[22px] mr-[10px]"/>
                        Also make sure your account is not a bot
                    </li>
                </ul>
            </div>

            <div class="mt-[40px]">
                <h1 class="font-medium text-[18px] mobileL:text-[17px]">Requirements</h1>
                <div>
                    <div class="mt-[10px] flex items-center">
                        <div v-if="verifiedRequirements.messages.value >= 1000" class="w-[20px] h-[20px] mr-[10px] bg-green-500 rounded-md"></div>
                        <div v-else class="w-[20px] h-[20px] mr-[10px] bg-yellow-500 rounded-md"></div>
                        <h1 class="text-white/80 text-[15px] mobileL:text-[14px]">
                            {{ `${verifiedRequirements.messages.value}/1000 Messages` }}
                        </h1>
                    </div>

                    <div class="mt-[10px] flex items-center">
                        <div v-if="verifiedRequirements.comments.value >= 500" class="w-[20px] h-[20px] mr-[10px] bg-green-500 rounded-md"></div>
                        <div v-else class="w-[20px] h-[20px] mr-[10px] bg-yellow-500 rounded-md"></div>
                        <h1 class="text-white/80 text-[15px] mobileL:text-[14px]">{{ `${verifiedRequirements.comments.value}/500 Comments` }}</h1>
                    </div>
                </div>
                <p v-if="verifiedRequirements.messages.value >= 1000 && verifiedRequirements.comments.value >= 500" class="mt-[20px] text-white/80 text-[15px] mobileL:text-[14px] font-medium">You are ready to get your verified badge!</p>
                <p v-else class="mt-[20px] text-white/80 text-[15px] mobileL:text-[14px] font-medium">Reach the requirements to get your verified badge</p>
            </div>

            <button v-if="verifiedRequirements.messages.value >= 1000 && verifiedRequirements.comments.value >= 500" class="w-full py-[10px] mt-[40px] bg-blue-500/90 font-medium rounded-lg hover:bg-blue-500/80">Get Verified</button>
            <button v-else disabled class="w-full py-[10px] mt-[40px] bg-blue-500/90 font-medium rounded-lg opacity-50">Get Verified</button>
        </div>
    </div>
</template>