import axios from "axios";
const endpoint = import.meta.env.VITE_GRAPHQL_API;

const headers = {
    'Content-Type': 'application/json',
};

export default function graphql({ query }, callback){
    return axios({
        url: `${endpoint}/graphql`,
        method: "POST",
        headers,
        data: {
            query: query
        }
    })
        .then(res => ({ status: res.status, data: res.data.data }))
        .catch(err => callback(true))
}