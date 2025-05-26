import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";
import StartTexts from "../StartTexts";
import {useLocation} from 'react-router-dom'

const UseManageTexts = (showNotification, navigate) => {
    const location = useLocation();
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        const texts = UseLocalStorage.get("texts");
        if (texts.length > 0) {
            setTexts(texts);
        } else {
            UseLocalStorage.save("texts", StartTexts)
            setTexts(StartTexts);
        }
    }, []);

    useEffect(() => {
        console.log(location)
        if (location.pathname === "/home") {
            if (location.state) {
                setTexts(UseLocalStorage.add('texts', location.state));
            }
        }
    }, [location.pathname]);

    const addText = () => {
        navigate('/addText');
    }

    const delText = (index, event) => {
        event.stopPropagation();
        setTexts(UseLocalStorage.remove('texts', index));
    }

    const chooseText = (index) => {
        navigate('/play', {
            state: {
                currentText: texts[index].text,
                shuffledText: texts[index].text.map(sentence => shuffleArray(sentence))
            }
        });
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