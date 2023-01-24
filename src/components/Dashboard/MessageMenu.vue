<script setup>
    import { computed } from '@vue/reactivity';
    import { useAuthStore } from '../../stores/authUser';

    const authUser = useAuthStore();

    const props = defineProps({
        messageView: Boolean,
        handler: Function
    });

    function messageViewHandler(){
        props.handler();
    }

    const whetherMessages = computed(() => {
        return authUser.messagesLength > 1 ? "Messages" : "Message";
    });

    const messagesAmount = computed(() => {
        return authUser.messagesLength !== null ? authUser.messagesLength : 0;
    })

</script>
<template>
    <div class="relative bottom-[-1px]">
        <div>
            <button v-if="messageView" class="py-[10px] px-[15px] text-sm rounded-t-lg bg-indigo-500 border-b border-indigo-500">
                <span class="rounded-full mobileL:text-[13px] font-semibold">
                    <p class="inline mr-[5px] font-semibold">{{ messagesAmount }}</p> 
                    {{ whetherMessages }}
                </span>
            </button>

            <button v-else class="py-[10px] px-[15px] text-sm rounded-t-md hover:bg-white/10 border-b border-transparent hover:border-white" @click="messageViewHandler">
                <span class="rounded-full mobileL:text-[13px] font-semibold">
                    <p class="inline mr-[5px] font-semibold">{{ authUser.messagesLength }}</p>
                    {{ whetherMessages }}
                </span>
            </button>

        </div>
    </div>
</template>