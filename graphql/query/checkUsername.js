export default function checkUsername(token, username){
    return `query CheckUsername {
        checkUsername(token: "${token}", username: "${username}"){
            status
            message
        }
      }
    `
}