import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";
import StartTexts from "../StartTexts";

const UseEnglish = (showNotification, navigate, start) => {
    const [texts, setTexts] = useState([]);
    const [currentIndexText, setCurrentIndexText] = useState(null);


    useEffect(() => {
        const texts = UseLocalStorage.get('texts');
        setTexts(texts ? texts : StartTexts);
    }, []);

    const setNewText = (newText) => {
        setTexts(UseLocalStorage.add('texts', newText));
    }

    const addText = () => {
        navigate('/addText');
    }

    const delText = (index) => {
        setTexts(UseLocalStorage.remove('texts', index));
    }

    const chooseText = (index) => {
        if (currentIndexText === index) {
            setCurrentIndexText(null);
            const currentText = texts[index].text;
            start(currentText, currentText.map(sentence => shuffleArray(sentence)));
        } else {
            setCurrentIndexText(index);
            setTexts(prevTexts => prevTexts.map((text, i) => ({...text, isChoose: i === index})));
        }
    }

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }


    return {
        chooseText,
        texts,
        addText,
        delText,
        setNewText
    }
}

export default UseEnglish;