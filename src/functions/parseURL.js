function generateURL(url){
    return `<a href="${url}" class="text-blue-400 font-semibold hover:underline" target="_blank">${url}</a>`;
}

function parseURL(text){
    if(text === null) return null;
    const startURL = text.indexOf('http');
    const copyText = text;

    let urlResult = "";

    for(let i = startURL; i < text.length; i++){
        if(text[i] === " ") text = "";
        else urlResult += text[i];
    }

    const result = generateURL(urlResult);
    const changeText = copyText.replace(urlResult, result);
    return changeText;
}

export default parseURL;