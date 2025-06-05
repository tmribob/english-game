import {useEffect, useState} from "react";
import StartTexts from "../StartTexts";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
const splitText = (text) => {
  const sentences = text.replace(/([,:—–-])/g, ` $1 `).split(/[.!?]\s*/).filter(sentence => (/[a-zA-Zа-яА-ЯёЁ]/).test(sentence.trim()));
  return sentences.map(sentence => sentence.replace(/^[^a-zA-Zа-яА-ЯёЁ]*/, '').match(/([а-яА-ЯёЁa-zA-Z0-9]+(?:['-`][а-яА-ЯёЁa-zA-Z0-9]+)*|[,-:])/g));
};

const useManageTexts = (showNotification, setNewLocation, location, saveItem, getItem) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const texts = getItem("texts");
    if (texts.length > 0) {
      setTexts(texts);
    } else {
      saveItem("texts", StartTexts);
      setTexts(StartTexts);
    }
  }, []);

  useEffect(() => {
    saveItem('texts', texts);
  }, [texts]);

  useEffect(() => {
    if (location.pathname === "/home" && location.state) {
      if ("newText" in location.state) {
        setTexts(prevTexts =>
          [...prevTexts, {
            name: location.state.newText.name,
            id: maxId() + 1,
            text: splitText(location.state.newText.text)
          }]
        )
        setNewLocation(location.pathname, null, true)
      } else if ("editedText" in location.state) {
        const editedText = location.state.editedText
        setTexts(prevTexts => prevTexts.map(text =>
          text.id === editedText.id ? {
            ...text,
            name: editedText.name,
            text: splitText(editedText.text)
          } : text)
        );
        setNewLocation(location.pathname, null, true)
      }
    }
  }, [location]);

  const maxId = () => {
    return Math.max(...texts.map(text => text.id))
  }

  const addText = () => {
    setNewLocation('/addText');
  }

  const delText = (id, event) => {
    event.stopPropagation();
    setTexts(prevText =>
      prevText.filter((text) => text.id !== id)
    );
  }

  const chooseText = (id) => {
    const currentText = texts.find(text => text.id === id);
    console.log(currentText);
    setNewLocation('/play', {
      currentText: currentText.text,
      shuffledText: currentText.text.map(sentence => shuffleArray(sentence))
    }, false, currentText.name);
  }

  const editText = (id, event) => {
    event.stopPropagation();
    setNewLocation('/editText', {
      array: texts.find(text => text.id === id)
    })
  }

  return {
    chooseText, texts, addText, delText, editText
  }
}

export default useManageTexts;