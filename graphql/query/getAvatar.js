export default function getAvatar(id){
    return `query GetAvatar {
        user(id: "${id}"){
          status
          data {
            username
            avatar
          }
        }
      }
    `
}