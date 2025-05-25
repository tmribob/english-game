const UseLocalStorage = {
    get: (item) => {
        try {
            const texts = localStorage.getItem(item);
            return texts ? JSON.parse(texts) : [];
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error);
            return [];
        }
    },
    save: (item, texts) => {
        try {
            localStorage.setItem(item, JSON.stringify(texts));
        } catch (error) {
            console.error('Ошибка записи в localStorage:', error);
        }
    },
    add: (item, newText) => {
        const texts = UseLocalStorage.get(item);
        texts.push(newText);
        UseLocalStorage.save(item, texts);
        return texts;
    },
    remove: (item, index) => {
        const texts = UseLocalStorage.get(item);
        UseLocalStorage.save(item, texts.filter((text, i) => i !== index));
        return texts;
    },
    removeItem: (item) => {
        try {
            localStorage.removeItem(item);
        } catch (error) {
            console.error('Ошибка удаления в localStorage:', error);
        }
    }
};

export default UseLocalStorage;