export default function sendMessage(id, sender, message){
    return `mutation SendUserMessage {
        sendMessage(id: "${id}", sender: "${sender}", message: """${message}"""){
            status
            message
        }
    }`
};