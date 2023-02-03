export default function verifiedRequirements(id){
    return `query GetVerifiedRequirements {
        getRequirements(id: "${id}"){
            status
            messages {
                id
                sender
                message
                postedAt
                comments {
                    id
                    author
                    message
                    postedAt
                }
            }
        }
    }`
};