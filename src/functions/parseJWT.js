import { Base64 } from "js-base64";

export default function parseJWT(token){
    const token_copy = token.split('.');
    const decoded = Base64.decode(token_copy[1]);
    const parsed = JSON.parse(decoded);
    return parsed;
}