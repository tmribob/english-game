import {useEffect, useState} from "react";
import StartTexts from "../StartTexts";
import {splitText, shuffleArray} from "../utils/textUtils";

const useManageTexts = (showNotification, setNewLocation, location, saveItem, getItem) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const texts = getItem("texts");
    if (texts && texts.length > 0) {
      setTexts(texts);
    } else {
      setTexts(StartTexts);
    }
  }, []);

  useEffect(() => {
    if (texts && texts.length > 0) {
      saveItem('texts', texts);
    }
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
            text: splitText(editedText.text) || []
          } : text)
        );
        setNewLocation(location.pathname, null, true)
      }
    }
  }, [location]);

  const maxId = () => {
    return texts.length > 0 ? Math.max(...texts.map(text => text.id)) : 0;
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
    setNewLocation('/play', {
      newPlay: {
        currentText: currentText.text,
        shuffledText: currentText.text.map(sentence => shuffleArray(sentence))
      }
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