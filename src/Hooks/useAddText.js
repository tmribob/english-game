import {useState} from "react";
import splitText from "./splitText";

const useAddText = (setNewLocation, showNotification) => {
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
      }
    });
    clearInputs();
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
    cancel
  });
};

export default useAddText;