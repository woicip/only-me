import graphql from '../../src/fetchs/graphql';
import sendCommentQuery from '../mutation/sendComment';

async function SendCommentGraphQL(message_id, author, message, postedAt){
    try {
        const { data: { sendComment } } = await graphql({ query: sendCommentQuery(message_id, author, message, postedAt ) });
        return [ sendComment, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default SendCommentGraphQL;