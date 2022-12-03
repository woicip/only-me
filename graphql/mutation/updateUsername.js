export default function user(token, newUsername){
    return `mutation UpdateUsername{
        updateUsername(token: "${token}", newUsername: "${newUsername}"){
            status
            message
        }
    }`
};