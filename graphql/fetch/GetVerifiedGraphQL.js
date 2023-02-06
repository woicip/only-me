import graphql from '../../src/fetchs/graphql';
import getVerifiedQuery from '../mutation/getVerified';

async function GetVerifiedGraphQL(token){
    try {
        const { data: { getVerified } } = await graphql({ query: getVerifiedQuery(token) });
        return [ getVerified, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default GetVerifiedGraphQL;