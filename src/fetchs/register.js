const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchRegister(data, callback){
    const body = JSON.stringify({
        data: {
            username: data.username,
            password: data.password
        }
    });

    const options = { method: "POST", headers: { 'Content-Type': 'application/json' }, body };
    const register = await fetch(`${endpoint}/register`, options);
    const result = await register.json();

    if(result.code === 200){
        callback(result)
        
    } else {
        callback(result);
    }
}