export default function user( message_id, author, message){
    return `mutation SendComment{
        sendComment(message_id: "${message_id}", author: ${author}, message: "${message}"){
            status
            message
        }
    }`
};