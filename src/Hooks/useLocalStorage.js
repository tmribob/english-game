const useLocalStorage = () => {
  const getItem = (item) => {
    try {
      const texts = localStorage.getItem(item);
      return texts ? JSON.parse(texts) : [];
    } catch (error) {
      console.error('Ошибка чтения из localStorage:', error);
      return [];
    }
  }

  const saveItem = (item, texts) => {
    try {
      localStorage.setItem(item, JSON.stringify(texts));
    } catch (error) {
      console.error('Ошибка записи в localStorage:', error);
    }
  }

  const removeItem = (item) => {
    localStorage.removeItem(item);
  }

  return {getItem, removeItem, saveItem}

};

export default useLocalStorage;