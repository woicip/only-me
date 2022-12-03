export default function deleteMessage(token, message_id){
    return `mutation DeleteMessage{
        deleteMessage(token: "${token}", message_id: "${message_id}"){
            status
            message
        }
    }`
};