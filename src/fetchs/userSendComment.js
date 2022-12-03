const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function fetchUserComment(datas, callback){
    const body = JSON.stringify({ data: datas });

    const post = await fetch(`${endpoint}/userSendComment`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body });
    const result = await post.json();

    if(result.code === 200){
        callback(result);
    } else {
        callback(result);
    }
}