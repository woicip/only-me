export default function user(id){
    return `query GetUserMessages {
        userMessages(id: "${id}"){
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