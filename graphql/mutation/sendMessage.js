export default function sendMessage(id, sender, message, postedAt){
    return `mutation SendUserMessage {
        sendMessage(id: "${id}", sender: "${sender}", message: """${message}""", postedAt: "${postedAt}"){
            status
            message
        }
    }`
};