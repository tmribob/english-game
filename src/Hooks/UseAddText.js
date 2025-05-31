import {useState} from "react";

const UseAddText = (setNewLocation, showNotification) => {
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
    setNewLocation('/home', {
      newText: {
        text: splitText(inputText), name: inputName
      }, isAdded: false
    });
    clearInputs();
  }
  const splitText = (text) => {
    const sentences = text.replace(/([,:—–-])/g, ` $1 `).split(/[.!?]\s*/).filter(sentence => (/[a-zA-Zа-яА-ЯёЁ]/).test(sentence.trim()));
    return sentences.map(sentence => sentence.replace(/^[^a-zA-Zа-яА-ЯёЁ]*/, '').match(/([а-яА-ЯёЁa-zA-Z0-9]+(?:['-`][а-яА-ЯёЁa-zA-Z0-9]+)*|[,-:])/g));
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
    setNewLocation('/home');
    clearInputs();
  }
  return ({
    inputText: {text: inputText, update: changeInputText},
    inputName: {name: inputName, update: changeInputName},
    confirmText,
    cancel,
    splitText
  });
};

export default UseAddText;