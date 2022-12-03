import axios from "axios";
const endpoint = import.meta.env.VITE_GRAPHQL_API;

const headers = {
    'Content-Type': 'application/json',
};

export default function graphql(data, callback){
    return axios({
        url: `${endpoint}/graphql`,
        method: "POST",
        headers,
        data: {
            query: data.query
        }
    })
        .then(res => ({ status: res.status, data: res.data.data }))
        .catch(err => console.error(err))
}