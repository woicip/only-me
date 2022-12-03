export default function Login(username, password){
    return `query Login {
        login(username: "${username}", password: "${password}"){
          code
          message
          token
        }
      }
    `
}