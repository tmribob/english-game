import {useState} from "react";

const UseAddText = (navigate, showNotification) => {
    const [inputText, setInputText] = useState("");
    const [inputName, setInputName] = useState("");


    const clearInputs = () => {
        setInputName("");
        setInputText("");
    }

    const confirmText = () => {
        if (!inputText.trim()) {
            showNotification("Text is not stated!");
            return;
        }
        if (!inputName.trim()) {
            showNotification("Name is not stated!");
            return;
        }
        navigate('/home', {
            state: {
                newText: {
                    text: splitText(inputText),
                    name: inputName
                },
                isAdded: false
            }
        });
        clearInputs();
    }
    const splitText = (text) => {
        const sentences = text.split(/[.!?]\s*/).filter(sentence => sentence.trim());
        return sentences.map(sentence => sentence.match(/[а-яА-ЯёЁa-zA-Z0-9]+(?:['-`][а-яА-ЯёЁa-zA-Z0-9]+ | ,)*/g));
    }
    const changeInputText = (e) => {
        setInputText(e.target.value);
    }

    const changeInputName = (e) => {
        const name = e.target.value;
        if (name.length <= 35) {
            setInputName(name.length === 1 ? name.toUpperCase() : name);
        } else {
            showNotification("Name is too long!");
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
        cancel, splitText
    });
};

export default UseAddText;