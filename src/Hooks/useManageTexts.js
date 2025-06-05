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

const useManageTexts = (showNotification, setNewLocation, location, getItem, saveItem) => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const texts = getItem("texts");
    if (texts.length > 0) {
      setTexts(texts);
    } else {
      saveItem("texts", StartTexts)
      setTexts(StartTexts);
    }
  }, []);

  useEffect(() => {
    saveItem('texts', texts);
  }, [texts]);

  useEffect(() => {
    if (location.pathname === "/home" && location.state) {
      if ("newText" in location.state) {
        setTexts(prevTexts => {
          return [...prevTexts, {...location.state.newText, id: maxId() + 1}];
        });
        setNewLocation(location.pathname, null, true)
      } else if ("editedText" in location.state) {
        const editedText = location.state.editedText
        setTexts(prevTexts => {
          return prevTexts.map((text, indexText) =>
            indexText === editedText.index ? editedText.text : text)
        })
        setNewLocation(location.pathname, null, true)
      }
    }
  }, [location.state]);

  const maxId = () => {
    return Math.max(...texts.map(text => text.id))
  }

  const addText = () => {
    setNewLocation('/addText');
  }

  const delText = (index, event) => {
    event.stopPropagation();
    setTexts(removeInItem('texts', index));
  }

  const chooseText = (index) => {
    setNewLocation('/play', {
      newPlay: {
        currentText: texts[index].text,
        shuffledText: texts[index].text.map(sentence => shuffleArray(sentence))
      }
    }, false, texts[index].name);
  }

  const editText = (index, event) => {
    event.stopPropagation();
    setNewLocation('/editText', {
      array: texts[index], index
    })
  }

  return {
    chooseText, texts, addText, delText, editText
  }
}

export default useManageTexts;