export default function user(id){
    return `query GetUserMessages {
        userMessages(id: "${id}"){
            code
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