const UseLocalStorage = {
  get: (item) => {
    try {
      const texts = localStorage.getItem(item);
      return texts ? JSON.parse(texts) : [];
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
      return [];
    }
  }, save: (item, texts) => {
    try {
      localStorage.setItem(item, JSON.stringify(texts));
    } catch (error) {
      console.error('Ошибка записи в localStorage:', error);
    }
  }, add: (item, newText) => {
    const texts = UseLocalStorage.get(item);
    texts.push(newText);
    UseLocalStorage.save(item, texts);
    return UseLocalStorage.get(item);
  }, remove: (item, index) => {
    const texts = UseLocalStorage.get(item);
    UseLocalStorage.save(item, texts.filter((text, i) =>
      i !== index));
    return UseLocalStorage.get(item);
  }, update: (item, index, newText) => {
    const texts = UseLocalStorage.get(item);
    UseLocalStorage.save(item, texts.map((text, i) =>
      i === index ? newText : text));
    return UseLocalStorage.get(item);
  }
};

export default UseLocalStorage;