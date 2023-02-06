export default function deleteMessage(token){
    return `mutation GetVerified{
        getVerified(token: "${token}"){
            status
            message
        }
    }`
};