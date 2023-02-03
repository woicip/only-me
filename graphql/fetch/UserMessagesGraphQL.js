import graphql from '../../src/fetchs/graphql';
import userMessagesQuery from '../query/userMessages';

async function UserMessagesGraphQL(userID){
    try {
        const { data: { userMessages } } = await graphql({ query: userMessagesQuery(userID) });
        return [ userMessages, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default UserMessagesGraphQL;