export default function user(user_id){
    return `query GetUser {
        user(id: "${user_id}"){
            status
            data {
                id
                bio
                avatar
                username
                fullname
                verified
            }
        }
    }`
};