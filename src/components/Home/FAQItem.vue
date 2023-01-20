<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        number: String,
        question: String,
        answer: String
    })

    const showAnswer = ref(false);

    function showAnswerHandler(){
        showAnswer.value = !showAnswer.value;
    }
</script>
<template>
    <div>
        <button class="w-full text-left text-[16px] font-medium border-b border-white/10 py-[15px] mobileL:text-[15px]" @click="showAnswerHandler">
            <span class="italic text-white/30 mr-[20px]" :class="{ 'text-white': showAnswer }">{{ props.number }}</span>
            {{ props.question }}
        </button>

        <p v-if="showAnswer" class="mt-[10px] mb-[20px] text-sm leading-6 text-white/70 ml-[40px]">
            {{ props.answer }}
        </p>
    </div>
</template>