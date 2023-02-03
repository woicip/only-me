export default function updatePassword(token, newPassword, currentPassword){
    return `mutation UpdatePassword{
        updatePassword(token: "${token}", newPassword: "${newPassword}", currentPassword: "${currentPassword}"){
            status
            message
        }
    }`
};