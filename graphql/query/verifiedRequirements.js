export default function verifiedRequirements(token){
    return `query GetVerifiedRequirements {
        verifiedRequirements(token: "${token}"){
            status
            messages
            comments
        }
    }`
};