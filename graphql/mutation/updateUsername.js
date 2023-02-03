export default function updateUsername(token, newUsername){
    return `mutation UpdateUsername{
        updateUsername(token: "${token}", newUsername: "${newUsername}"){
            status
            message
        }
    }`
};