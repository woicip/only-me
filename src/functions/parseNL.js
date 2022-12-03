// Parse New Line
function parseNL(text){
    if(text === null) return null;
    let result = '';
    let splitted = text.split('\n');
    splitted.forEach(word => {
        result += `${word}<br/>`;
    });
    return result;
}

export default parseNL;