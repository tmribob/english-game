export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const splitText = (text) => {
  const sentences = text.replace(/([,:—–-])/g, ` $1 `).split(/[.!?]\s*/).filter(sentence => (/[a-zA-Zа-яА-ЯёЁ]/).test(sentence.trim()));
  return sentences.map(sentence => sentence.replace(/^[^a-zA-Zа-яА-ЯёЁ]*/, '').match(/([а-яА-ЯёЁa-zA-Z0-9]+(?:['-`][а-яА-ЯёЁa-zA-Z0-9]+)*|[,-:])/g));
};