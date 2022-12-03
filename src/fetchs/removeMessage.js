const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchRemoveMessage(data, callback){
    const body = JSON.stringify({ data });

    const token = localStorage.getItem('onl_token');
    const remove = await fetch(`${endpoint}/removeMessage`, { 
        method: "POST", 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body
    });
    const result = await remove.json();

    if(result.code === 200) callback(result);
    else callback(result);
}