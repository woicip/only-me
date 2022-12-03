<script>
    import Comment from '../Comment/Index.vue';
    import RemoveWarning from '../Remove/Index.vue';
    import doRemoveMessage from '../../fetchs/removeMessage';

    // graphql
    import graphql from '../../fetchs/graphql';
    import sendCommentQuery from '../../../graphql/mutation/sendComment';
    import deleteMessage from '../../../graphql/mutation/deleteMessage';

    export default {
        components: {
            Comment,
            RemoveWarning
        },
        props: {
            id: String,
            user_id: String,
            sender: String,
            message: String,
            comments: Array,
            postedAt: String,
            author: Boolean,
            toggleDetail: Function,
            GetUserMessages: Function,
            dashboard: Boolean
        },
        data(){
            return {
                months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                comment: "",
                showSendProcess: false,
                time: new Date(parseInt(this.postedAt)),
                date: `${new Date(parseInt(this.postedAt)).getDate()}`,
                hours: `${new Date(parseInt(this.postedAt)).getHours()}`,
                minutes: `${new Date(parseInt(this.postedAt)).getMinutes()}`,
                month: `${new Date(parseInt(this.postedAt)).getMonth()}`,
                year: `${new Date(parseInt(this.postedAt)).getFullYear()}`,
                remove: false,
                deleting: false,
            }
        },
        computed: {
            dateTimestamp(){
                return `${this.months[this.month]} ${this.date}, ${this.year}`;
            },
            hoursMinutes(){
                const numberedDate = parseInt(this.postedAt);
                const dt = new Date(numberedDate);
                return `${this.hours.length < 2 ? `0${this.hours}` : this.hours}.${this.minutes.length < 2 ? `0${this.minutes}` : this.minutes }`
            }
        },
        methods: {
            async userPostComment(){
                this.showSendProcess = true;

                const data = {
                    message_id: this.id,
                    author: this.author ? true : false,
                    message: this.comment
                }

                const response = await graphql({ query: sendCommentQuery( data.message_id, data.author, data.message ) });
                const { sendComment } = response.data;

                if(sendComment.status === "OK"){
                    this.comment = "";
                    this.showSendProcess = false;
                    this.GetUserMessages();

                } else {
                    alert(sendComment.message);
                    this.comment = "";
                    this.showSendProcess = false;
                }
            },
            async userRemoveMessage(){
                this.deleting = true;
                const authToken = localStorage.getItem('onl_auth');

                const result = await graphql({ query: deleteMessage(authToken, this.id) });
                const { data } = result;

                if(data.deleteMessage.status === "OK"){
                    this.deleting = false;
                    this.GetUserMessages();
                    
                } else {
                    alert(data.deleteMessage.message);
                }

            },
            doAskConfirmRemove(){
                this.remove = !this.remove;
            },
            commentInputHandler(e){
                this.comment = e.target.value;
            },
            disappearRemoveWarning(){
                this.remove = false;
            },
            textareaGrow(e){
                const target = e.target;
                const value = e.target.value;
                this.comment = value;

                const minHeight = 45;
                const lineHeight = 24;
                const padding = 10;
                const borderRadius = 6;
                const lineBreaks = value.split(/\n/).length - 1;

                const newHeight = minHeight + lineBreaks * lineHeight + padding + borderRadius;
                target.style.height = `${newHeight}px`;
            }
        }
    }
</script>

<template>
    <section class="overflow-hidden h-full mb-[10px] rounded-[15px] relative">
        <RemoveWarning v-if="!deleting" :remove="remove" :disappearRemoveWarning="disappearRemoveWarning" :userRemoveMessage="userRemoveMessage" />

        <!-- Deleting Message -->
        <section v-if="deleting && remove" class="w-full h-full bg-white/10 absolute z-10 flex flex-col items-center justify-center">
            <div>
                <p class="mb-[10px] text-white font-bold text-lg mobileL:text-md">Deleting Message</p>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="22px" height="22px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="13" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </div>
        </section>

        <div class="w-full h-fit pb-[13px]  flex flex-col items-start justify-between text-white bg-white/10 overflow-hidden rounded-[15px] animate-fadeIn"
            :class="{ 'bg-red-700': remove, 'blur-sm': remove }">
    
    
            <div class="w-full py-[15px] px-[20px] flex items-start justify-between">
                <div class="text-left">
                    <div class="flex items-center">
                        <h1 class="text-[15px] font-bold">{{ sender }}</h1>
                        <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div>
                        <p class="text-[12px] text-white/40">{{ hoursMinutes }}</p>
                    </div>
                    <p v-bind:innerHTML="message" class="mt-[5px] text-[14px] mobileL:text-[14px] text-white/80"></p>
                </div>
    
                <div>
                    <button v-if="dashboard" class="py-[8px] px-[8px] text-white/25 hover:text-white bg-white/0 hover:bg-red-500/90 rounded-full" @click="doAskConfirmRemove">
                        <svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.5H13" stroke="white" stroke-opacity="0.50" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.5 3.5H11.5V12.5C11.5 12.7652 11.3946 13.0196 11.2071 13.2071C11.0196 13.3946 10.7652 13.5 10.5 13.5H3.5C3.23478 13.5 2.98043 13.3946 2.79289 13.2071C2.60536 13.0196 2.5 12.7652 2.5 12.5V3.5Z" stroke="white" stroke-opacity="0.50" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.5 3.5V3C4.5 2.33696 4.76339 1.70107 5.23223 1.23223C5.70107 0.763392 6.33696 0.5 7 0.5C7.66304 0.5 8.29893 0.763392 8.76777 1.23223C9.23661 1.70107 9.5 2.33696 9.5 3V3.5" stroke="white" stroke-opacity="0.50" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.5 5.5V11" stroke="white" stroke-opacity="0.50" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.5 5.5V11" stroke="white" stroke-opacity="0.50" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button v-else class="py-[2px] px-[5px] text-xs text-white/25 hover:text-white hover:bg-white/10 rounded-full" @click="toggleDetail({ show: false, id: null })">Close</button>
                </div>
            </div>
    
            <div class="comments w-full mt-[25px] text-sm flex flex-col items-start justify-between">
                <div class="flex items-center mb-[5px]">
                    <p class="text-[12px] pl-[20px] text-white/40 hover:underline">{{ dateTimestamp }}</p>
                    <div class="mx-[10px] w-[3px] h-[3px] bg-white/40 rounded-full"></div>
                    <p class="text-[12px] text-white/40 hover:underline">{{ comments.length }} Comments</p>
                </div>
    
                <div class="comment-section mt-[5px] w-full flex justify-between border-b border-t border-white/10">
                    <textarea name="comment-box" id="comment-box" :value="comment" placeholder="Write your comment ..." class="bg-black/5 resize-none w-full min-h-[45px] text-white leading-[24px] p-[10px] px-[20px] focus:outline-none" @keyup="textareaGrow"></textarea>
                    
                    <div class="">
                        <button v-if="comment" class="h-full flex flex-col px-4 text-white border-white/10 bg-indigo-500" @click="userPostComment">
                            <p v-if="!showSendProcess" class="mt-5 font-bold text-white">SEND</p>
                            <img v-else src="../../assets/loading-white.svg" alt="loading" class="w-[24px] h-full" />
                        </button>

                        <button v-else class="h-full px-4 font-bold text-white/10 border-white/10 bg-black/5" disabled>SEND</button>
                    </div>
                </div>
    
                <section class="comment-content w-full">
                    <div v-for="comment in comments" :key="comment.id">
                        <Comment :author="comment.author" :message="comment.message" :time="comment.postedAt" />
                    </div>
                </section>
            </div>
        </div>
        
    </section>
</template>