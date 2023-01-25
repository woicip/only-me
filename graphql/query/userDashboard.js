export default function userDashboard(id){
    return `query GetUserForDashboard {
        user(id: "${id}"){
            status
            data {
                bio
                avatar
                email
                username
                fullname
                verified
            }
        }
    }`
};