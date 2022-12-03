export default function CT(token){
    return `query CheckToken {
        ct(token: "${token}"){
          status
        }
      }
    `
}