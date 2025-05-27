import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";
import StartTexts from "../StartTexts";

const UseManageTexts = (showNotification, navigate,location) => {
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
        if (location.pathname === "/home" && location.state) {
            if ("newText" in location.state) {
                setTexts(UseLocalStorage.add('texts', location.state.newText));
                navigate(location.pathname, {replace: true, state: {}})
            } else if ("editedText" in location.state) {
                setTexts(UseLocalStorage.update("texts", location.state.editedText.index, location.state.editedText.text))
                navigate(location.pathname, {replace: true, state: {}})

            }
        }
    }, [location, navigate]);

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

    const editText = (index, event) => {
        event.stopPropagation();
        navigate('/editText', {
            state: {
                array: texts[index],
                index
            }
        })
    }

    return {
        chooseText, texts, addText, delText, editText
    }
}

export default UseManageTexts;