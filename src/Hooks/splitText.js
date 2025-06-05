export default (text) => {
    const sentences = text.replace(/([,:—–-])/g, ` $1 `).split(/[.!?]\s*/).filter(sentence => (/[a-zA-Zа-яА-ЯёЁ]/).test(sentence.trim()));
    return sentences.map(sentence => sentence.replace(/^[^a-zA-Zа-яА-ЯёЁ]*/, '').match(/([а-яА-ЯёЁa-zA-Z0-9]+(?:['-`][а-яА-ЯёЁa-zA-Z0-9]+)*|[,-:])/g));
};