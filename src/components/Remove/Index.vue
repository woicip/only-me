<script setup>
    import { ref } from 'vue';
    import DeleteMessageGraphQL from '../../../graphql/fetch/DeleteMessageGraphQL';

    // Components
    import DeletingMessage from '../Message/Detail/DeletingMessage.vue';

    const props = defineProps({
        remove: Boolean,
        message_id: String,
        HideRemoveWarning: Function,
        GetUserMessages: Function
    });

    const deleting = ref(false);

    async function deleteMessage(){
        deleting.value = true;
        const token = localStorage.getItem('onl_auth');
        const [ deleteMessage, error ] = await DeleteMessageGraphQL(token, props.message_id );

        if(error){
            deleting.value = false;
            alert('SOMETHING_WENT_WRONG!');

        } else {
            if(deleteMessage.status === 'OK'){
                deleting.value = false;
                props.HideRemoveWarning();
                props.GetUserMessages();
            }
        }
    }

</script>

<template>
    <DeletingMessage v-if="deleting && props.remove" />

    <div v-if="props.remove && !deleting" class="w-full h-full px-[15px] flex flex-col items-center justify-center border border-white/10 bg-white/10 rounded-[15px] absolute z-10 animate-fadeIn">
        <h1 class="mb-[20px] text-md font-bold mobileL:text-[14px]">Are you sure want to delete this message ?</h1>
        <div class="w-[40%] flex items-center justify-center">
            <button class="w-full py-[10px] px-[15px] mobileL:text-[14px] rounded-lg text-red-600 bg-white font-medium" @click="deleteMessage">Delete</button>
            <button class="w-full ml-[5px] py-[10px] px-[15px] mobileL:text-[14px] rounded-lg bg-white/25 font-medium" @click="props.HideRemoveWarning">Cancel</button>
        </div>
    </div>
</template>