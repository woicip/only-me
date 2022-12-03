const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchUser({ id }, callback){
    const body = JSON.stringify({ data: { user_id: id } });

    const options = { 
        method: "POST", 
        headers: { 
            'Content-Type': 'application/json', 
        }, 
        body
    }

    const messages = await fetch(`${endpoint}/user`, options);
    const result = await messages.json();
    
    if(result.code === 200){
        callback(result);

    } else {
        callback(result);
    }
}