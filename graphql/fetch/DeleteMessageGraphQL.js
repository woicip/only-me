import graphql from '../../src/fetchs/graphql';
import deleteMessageQuery from '../mutation/deleteMessage';

async function DeleteMessageGraphQL(token, message_id){
    try {
        const { data: { deleteMessage } } = await graphql({ query: deleteMessageQuery(token, message_id) });
        return [ deleteMessage, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default DeleteMessageGraphQL;