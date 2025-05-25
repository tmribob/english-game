import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";

const UseAddText = (navigate, showNotification, setNewText) => {
    const [inputText, setInputText] = useState("");
    const [inputName, setInputName] = useState("");
    useEffect(() => {
        setInputName(UseLocalStorage.get('addText').name);
        setInputText(UseLocalStorage.get('addText').text);
    }, []);

    const clearInputs = () => {
        setInputName("");
        setInputText("");
        UseLocalStorage.removeItem('addText')
    }

    const confirmText = () => {
        if (!inputText.trim()) {
            showNotification("Text is not stated");
            return;
        }
        if (!inputName.trim()) {
            showNotification("Name is not stated");
            return;
        }
        setNewText({text: splitText(inputText), name: inputName})
        clearInputs();
        navigate('/home');
    }
    const splitText = (input) => {
        const sentences = input.split(/[.!?]\s*/).filter(sentence => sentence.length > 0);
        return sentences.map(sentence => sentence.match(/[а-яА-ЯёЁa-zA-Z0-9]+(?:['`][а-яА-ЯёЁa-zA-Z0-9]+)*/g));
    }
    const changeInputText = (e) => {
        const text = e.target.value;
        UseLocalStorage.save('addText', {name: inputName, text});
        setInputText(text);
    }

    const changeInputName = (e) => {
        const name = e.target.value;
        if (name.length <= 35) {
            setInputName(name);
            UseLocalStorage.save('addText', {name, text: inputText});
        } else {
            showNotification("Name is so long");
        }
    }
    const cancel = () => {
        navigate('/home');
        clearInputs();
    }
    return ({
        inputText: {text: inputText, update: changeInputText},
        inputName: {name: inputName, update: changeInputName},
        confirmText,
        cancel
    });
};

export default UseAddText;