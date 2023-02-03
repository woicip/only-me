export default function sendComment( message_id, author, message, postedAt){
    return `mutation SendComment{
        sendComment(message_id: "${message_id}", author: ${author}, message: """${message}""", postedAt: "${postedAt}"){
            status
            message
        }
    }`
};