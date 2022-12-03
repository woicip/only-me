const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchPostMessage(body, callback){
    const options = { method: "POST", headers: { 'Content-Type': 'application/json' }, body };
    const post = await fetch(`${endpoint}/userSendMessage`, options);
    const result = await post.json();

    if(result.code === 200){
        callback(result)
    } else {
        callback(result);
    }
}