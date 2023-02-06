import graphql from '../../src/fetchs/graphql';
import sendMessagequery from '../mutation/sendMessage';

async function SendMessageGraphQL(userID, senderName, message){
    try {
        const date = new Date();
        const { data: { sendMessage } } = await graphql({ query: sendMessagequery(userID, senderName, message, date) });
        return [ sendMessage, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default SendMessageGraphQL;