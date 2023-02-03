<script>
    import Comment from '../Comment/Index.vue';
    import MessageDetail from './Detail.vue';
    import parseText from '../../functions/parseText';

    export default {
        components: {
            Comment,
            MessageDetail
        },
        props: {
            id: String,
            sender: String,
            message: String,
            comments: Array,
            postedAt: String,
            detail: Boolean,
            toggleDetail: Function
        },
        data(){
            return {
                comment: null,
                months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
            }
        },
        computed: {
            dateTimestamp(){
                const numberedDate = parseInt(this.postedAt);
                const dt = new Date(numberedDate);
                return `${this.months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
            },
            messageContent(){
                return parseText(this.message);
            }
        },  
        methods: {
            commentInput(e){
                this.comment = e.target.value;
            }
        }
    }
</script>

<template>
    <div>
        <button class="w-full h-[170px] mobileL:h-[150px] py-[15px] px-[20px] flex flex-col items-start justify-between text-white bg-white/10 rounded-[15px] hover:ring-2 hover:ring-indigo-500 ring-1 ring-white/20" @click="toggleDetail({ show: true, id })">
            <div class="w-full flex items-start justify-between">
                <div class="w-full text-left overflow-hidden">
                    <h1 class="text-[15px] font-bold">{{ sender }}</h1>
                    <p v-bind:innerHTML="messageContent" class="mt-[5px] text-[14px] mobileL:text-[14px] text-white/80"></p>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <p class="text-[12px] font-medium text-white/50 hover:underline">{{ comments.length }} Comments</p>
                <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div>
                <p class="text-[12px] font-medium text-white/50 hover:underline">{{ dateTimestamp }}</p>
            </div>
        </button>
    </div>
</template>