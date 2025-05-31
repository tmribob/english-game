import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";

const UsePlay = (showNotification, setNewLocation, location) => {
  const [text, setText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [spans, setSpans] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (location.pathname === "/play") {
      const {
        currentText, shuffledText
      } = location.state || UseLocalStorage.get('currentText');
      start(currentText, shuffledText)
    }
  }, [location]);


  const start = (currentText, shuffledText) => {
    setCurrentIndex(0);
    setText(currentText);
    setButtons(shuffledText.map((sentence, indexSentence) =>
      sentence.map((word, indexWord) => ({
        word, isActive: false, key: `${indexSentence}-${word}-${indexWord}`
      }))));
    setSpans(currentText.map(() => []));
    setProgress(currentText.map(() => "unfinished"));
    UseLocalStorage.save('currentText', {currentText, shuffledText})
  }


  const changeButton = (key) => {
    setSpans(prevSpans =>
      prevSpans.map((sentence, indexSentence) => {
        if (indexSentence !== currentIndex) {
          return sentence;
        }
        const currentButton = buttons[currentIndex].find(button =>
          button.key === key);
        if (currentButton.isActive) {
          return sentence.filter((span) =>
            span.key !== currentButton.key);
        }
        return [...sentence, {
          word: currentButton.word,
          key: currentButton.key
        }];
      }))
    setButtons(prevButtons =>
      prevButtons.map((sentence, indexSentence) =>
        indexSentence !== currentIndex ? sentence : sentence.map((button) =>
          button.key === key ? ({
            ...button, isActive: !button.isActive
          }) : button)));
  }

  const submitSentence = () => {
    const currentSentence = text[currentIndex];
    if (spans[currentIndex].length !== currentSentence.length) {
      showNotification("Not all the words were chosen ");
      return;
    }
    setSpans(prevSpans =>
      prevSpans.map((sentence, indexSentence) =>
        indexSentence !== currentIndex ? sentence : sentence.map((span, indexSpan) => ({
          ...span,
          color: span.word === currentSentence[indexSpan] ? "green" : "red"
        }))));
    if (spans[currentIndex].some((span, indexSpan) =>
      span.word !== currentSentence[indexSpan])) {
      showNotification(`You made mistakes`);
      return;
    }
    setProgress(prevProgress =>
      prevProgress.map((status, indexStatus) =>
        indexStatus === currentIndex ? "finished" : status));
    currentIndex < text.length - 1 && setCurrentIndex(currentIndex + 1);
    if (progress.every(sentence => sentence === "finished")) {
      endGame();
    }
  }

  const endGame = () => {
    if (spans.every((sentence, indexSentence) => {
      if (sentence.length === text[indexSentence].length) {
        return sentence.every((span, indexSpan) =>
          span.word === text[indexSentence][indexSpan]);
      }
      return false;
    })) {
      setNewLocation('/end');
      dismantling();
    }
  }

  const changeSentence = (NewIndex) => {
    setCurrentIndex(NewIndex);
  }

  const clearSentence = () => {
    setSpans(prevSpans =>
      prevSpans.map((sentence, indexSentence) =>
        indexSentence === currentIndex ? [] : sentence));
    setButtons(prevButtons =>
      prevButtons.map((sentence, indexSentence) =>
        indexSentence !== currentIndex ? sentence : sentence.map((button) => ({
          ...button, isActive: false
        }))));
    setProgress(prevProgress =>
      prevProgress.map((sentence, indexSentence) =>
        indexSentence === currentIndex ? "unfinished" : sentence));

  }
  const goHome = () => {
    setNewLocation('/home');
    dismantling();
  }
  const dismantling = () => {
    setProgress([]);
    setButtons([]);
    setCurrentIndex(0);
    setSpans([]);
    setText([]);
  }
  return ({
    buttons,
    spans,
    changeButton,
    clearSentence,
    submitSentence,
    progress,
    goHome,
    changeSentence,
    currentIndex
  })
}

export default UsePlay;