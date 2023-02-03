export default function updateFullname(token, newFullname){
    return `mutation UpdateFullname{
        updateFullname(token: "${token}", newFullname: "${newFullname}"){
            status
            message
        }
    }`
};