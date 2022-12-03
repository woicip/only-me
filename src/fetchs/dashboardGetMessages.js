const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function getMessages(callback){
    const authToken = localStorage.getItem('onl_auth');
    const getMessages = await fetch(`${endpoint}/getMessages`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` } });
    const result = await getMessages.json();
    
    if(result.code === 200){
        callback(result);
    } else {
        callback(result);
    }
}