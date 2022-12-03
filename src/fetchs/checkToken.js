const endpoint = import.meta.env.VITE_API_ENDPOINT;

export default async function checkToken(callback){ // check whether the token is still authorized or not.
    const authToken = localStorage.getItem('onl_auth');
    const check = await fetch(`${endpoint}/cgx`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` } });
    const result = await check.json();

    if(result.code === 200){
        callback({ authorized: true });

    } else {
        callback({ authorized: false });
    }
}