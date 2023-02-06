import graphql from '../../src/fetchs/graphql';
import verifiedRequirementsQuery from '../query/verifiedRequirements';

async function VerifiedRequirementsGraphQL(token){
    try {
        const { data: { verifiedRequirements } } = await graphql({ query: verifiedRequirementsQuery(token) });
        return [ verifiedRequirements, null ];

    } catch(err){
        return [ null, true ];
    }
}

export default VerifiedRequirementsGraphQL;