import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";
import StartTexts from "../StartTexts";

const UseManageTexts = (showNotification, navigate, start) => {
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
        setCurrentIndexText(null);
    }

    const chooseText = (index) => {
        if (currentIndexText === index) {
            const currentText = texts[index].text;
            UseLocalStorage.save('text', currentText)
            start(currentText, currentText.map(sentence => shuffleArray(sentence)));
            navigate('/play');
            setCurrentIndexText(null);
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
        chooseText, texts, addText, delText, setNewText
    }
}

export default UseManageTexts;