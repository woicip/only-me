export default function updateBio(token, newBio){
    return `mutation UpdateBio { 
        updateBio(token: "${token}", newBio: """${newBio}"""){ 
            status 
            message 
        } 
    }`;
};