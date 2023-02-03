import graphql from "../../src/fetchs/graphql";
import updatePasswordQuery from "../mutation/updatePassword";

async function UpdatePasswordGraphQL(token, newPassword, currentPassword){
    try {
        const { data: { updatePassword } } = await graphql({ query: updatePasswordQuery(token, newPassword, currentPassword) })
        return [ updatePassword, null ];
        
    } catch(err){
        return [ null, true ];
    }
}

export default UpdatePasswordGraphQL;