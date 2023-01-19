<script setup>
    import { computed } from '@vue/reactivity';

    const props = defineProps({
        messages: Array,
        messageView: Boolean,
        handler: Function
    });

    function messageViewHandler(){
        props.handler();
    }

    const whetherMessages = computed(() => {
        return props.messages.length > 1 ? "Messages" : "Message";
    });

    const messagesAmount = computed(() => {
        return props.messages !== null ? props.messages.length : 0;
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
                <span v-if="messages !== null" class="rounded-full mobileL:text-[13px] font-semibold">
                    <p class="inline mr-[5px] font-semibold">{{ messages.length }}</p>
                        {{ whetherMessages }}
                    </span>
            </button>

        </div>
    </div>
</template>