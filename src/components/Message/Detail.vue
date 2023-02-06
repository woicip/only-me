<script>
    import { useAuthStore } from '../../stores/authUser';

    // Components
    import DetailContainer from './Detail/Container.vue';
    import Wrapper from './Detail/Wrapper.vue';
    import DeletingMessage from './Detail/DeletingMessage.vue';
    import DeleteMessage from '../Remove/Index.vue';
    import CloseButton from './Detail/CloseButton.vue';
    import DeleteButton from './Detail/DeleteButton.vue';
    import SenderMessage from './Detail/SenderMessage.vue';
    import Timestamp from './Detail/Timestamp.vue';
    import CommentContainer from './Detail/Comment/Container.vue';
    import Comment from './Detail/Comment/Comment.vue';
    import SenderMessageContainer from './Detail/SenderMessageContainer.vue';
    import CommentList from './Detail/Comment/CommentList.vue';
    import TopSenderMessage from './Detail/TopSenderMessage.vue';

    // graphql
    import graphql from '../../fetchs/graphql';
    import sendCommentQuery from '../../../graphql/mutation/sendComment';

    export default {
        components: {
            Comment,
            DeleteMessage,
            DeletingMessage,
            CloseButton,
            DeleteButton,
            SenderMessage,
            Timestamp,
            CommentContainer,
            DetailContainer,
            Wrapper,
            TopSenderMessage,
            SenderMessageContainer,
            CommentList
        },
        props: {
            id: String,
            user_id: String,
            sender: String,
            message: String,
            comments: Array,
            postedAt: String,
            toggleDetail: Function,
            GetUserMessages: Function,
            dashboard: Boolean
        },
        setup(){
            const authUser = useAuthStore()
            return { authUser };
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
                    author: this.authUser.isLoggedIn ? true : false,
                    message: this.comment,
                    postedAt: new Date()
                }

                const response = await graphql({ query: sendCommentQuery( data.message_id, data.author, data.message, data.postedAt ) });
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
            commentInputHandler(value){
                this.comment = value;
            },
            ShowRemoveWarning(){
                this.remove = true;
            },
            HideRemoveWarning(){
                this.remove = false;
            },
        }
    }
</script>

<template>
    <DetailContainer>
        <DeleteMessage v-if="!deleting" :remove="remove" :message_id="id" :HideRemoveWarning="HideRemoveWarning" :GetUserMessages="GetUserMessages" />

        <Wrapper :remove="remove">
            <SenderMessageContainer>
                <TopSenderMessage>
                    <SenderMessage :sender="sender" :hoursMinutes="hoursMinutes" :message="message" />
                    <div>
                        <DeleteButton v-if="dashboard" :handler="ShowRemoveWarning" />
                        <CloseButton v-else :handler="toggleDetail" />
                    </div>
                </TopSenderMessage>
                <Timestamp :dateTimestamp="dateTimestamp" :hoursMinutes="hoursMinutes" />
            </SenderMessageContainer>
    
            <CommentContainer>
                <Comment :message_id="id" :GetUserMessages="GetUserMessages" />

                <h1 class="w-full px-[20px] py-[12px] flex items-center font-semibold border-b border-white/10">
                    {{ comments.length }}
                    <p class="ml-[5px] text-[13px]">{{ comments.length > 1 ? 'Comments' : 'Comment' }}</p>
                </h1>
                <CommentList :comments="comments" />
            </CommentContainer>
        </Wrapper>
    </DetailContainer>
</template>