export default function user(user_id, newAvatar){
    return `mutation UpdateAvatar{
        updateAvatar(user_id: "${user_id}", newAvatar: "${newAvatar}"){
            code
            message
        }
    }`
};