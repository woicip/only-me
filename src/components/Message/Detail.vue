<script>
    import { computed } from '@vue/reactivity';

    // Components
    import DetailContainer from './Detail/Container.vue';
    import Wrapper from './Detail/Wrapper.vue';
    import DeletingMessage from './Detail/DeletingMessage.vue';
    import RemoveWarning from '../Remove/Index.vue';
    import CloseButton from './Detail/CloseButton.vue';
    import DeleteButton from './Detail/DeleteButton.vue';
    import SenderMessage from './Detail/SenderMessage.vue';
    import Timestamp from './Detail/Timestamp.vue';
    import CommentContainer from './Detail/Comment/Container.vue';
    import CommentSection from './Detail/Comment/Section.vue';
    import CommentBox from './Detail/Comment/Box.vue';
    import CommentButton from './Detail/Comment/SendButton.vue';
    import SenderMessageContainer from './Detail/SenderMessageContainer.vue';
    import CommentList from './Detail/Comment/CommentList.vue';
    import TopSenderMessage from './Detail/TopSenderMessage.vue';

    // graphql
    import graphql from '../../fetchs/graphql';
    import sendCommentQuery from '../../../graphql/mutation/sendComment';
    import deleteMessage from '../../../graphql/mutation/deleteMessage';

    export default {
        components: {
            Comment,
            RemoveWarning,
            DeletingMessage,
            CloseButton,
            DeleteButton,
            SenderMessage,
            Timestamp,
            CommentContainer,
            DetailContainer,
            Wrapper,
            TopSenderMessage,
            CommentSection,
            CommentBox,
            CommentButton,
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
            commentInputHandler(value){
                this.comment = value;
            },
            disappearRemoveWarning(){
                this.remove = false;
            },
            textareaGrow(e){
                const target = e.target;
                const value = e.target.value;
                this.comment = value;

                const minHeight = 50;
                const lineHeight = 24;
                const padding = 10;
                const borderRadius = 6;
                const lineBreaks = value.split(/\n/).length - 1;

                console.log(lineBreaks);

                if(lineBreaks < 5){
                    const newHeight = minHeight + (lineBreaks * lineHeight) + padding + borderRadius;
                    target.style.height = `${newHeight}px`;
                }

            }
        }
    }
</script>

<template>
    <DetailContainer>
        <RemoveWarning v-if="!deleting" :remove="remove" :disappearRemoveWarning="disappearRemoveWarning" :userRemoveMessage="userRemoveMessage" />
        <DeletingMessage v-if="deleting && remove" />

        <Wrapper :remove="remove">
            <SenderMessageContainer>
                <TopSenderMessage>
                    <SenderMessage :sender="sender" :hoursMinutes="hoursMinutes" :message="message" />
                    <div>
                        <DeleteButton v-if="dashboard" :handler="doAskConfirmRemove" />
                        <CloseButton v-else :handler="toggleDetail" />
                    </div>
                </TopSenderMessage>
                <Timestamp :dateTimestamp="dateTimestamp" :commentLength="comments.length" />
            </SenderMessageContainer>
    
            <CommentContainer>
                <CommentSection>
                    <CommentBox :comment="comment" :commentInputHandler="commentInputHandler" :textareaGrow="textareaGrow" />
                    <CommentButton :comment="comment" :showSendProcess="showSendProcess" :handler="userPostComment" />
                </CommentSection>

                <CommentList :comments="comments" />
            </CommentContainer>
        </Wrapper>
    </DetailContainer>
</template>