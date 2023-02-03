function parseText(value){
    let text = value;
    const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g
    const URLs = text.match(regex);

    if(!URLs){
        const breakpoints = text.split('\n');
        text = breakpoints.join(' <br/> ');
        return text;

    } else {
        const breakpoints = text.split('\n');
        text = breakpoints.join(' <br/> ');
        
        URLs.forEach(url => {
            text = text.replace(`${url}`, `<a href="${url}" target="_blank" rel="noreferrer" class="url-link" style="color: #63b1ff;" onmouseover="this.style.textDecoration = 'underline';" onmouseleave="this.style.textDecoration = 'none';">${url}</a>`);
        });

        return text;
    }
}

export default parseText;