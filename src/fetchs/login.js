const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchLogin(data, callback){
    const body = JSON.stringify({
        data: {
            username: data.username,
            password: data.password
        }
    });

    const login = await fetch(`${endpoint}/login`, { 
        method: "POST", 
        headers: { 'Content-Type': 'application/json' }, 
        body 
    });
    const result = await login.json();

    if(result.code === 200) callback(result);
    else callback(result);
}