export default function Register(username, password){
    return `mutation Register {
        register(username: "${username}", password: "${password}"){
          status
          message
        }
      }`
}