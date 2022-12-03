export default function user(token, newFullname){
    return `mutation UpdateFullname{
        updateFullname(token: "${token}", newFullname: "${newFullname}"){
            status
            message
        }
    }`
};