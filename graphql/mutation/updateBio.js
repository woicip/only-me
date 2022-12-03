export default function user(token, newBio){
    return `mutation UpdateBio { 
        updateBio(token: "${token}", newBio: """${newBio}"""){ 
            status 
            message 
        } 
    }`;
};