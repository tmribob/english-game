import {useEffect, useState} from "react";

const usePlay = (showNotification, setNewLocation, location, saveItem, getItem, removeItem) => {
  const [text, setText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [spans, setSpans] = useState([]);
  const [progress, setProgress] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (location.pathname === "/play") {
      if ("currentText" in location.state) {
        const {currentText, shuffledText} = location.state;
        saveItem('currentText', {
          buttons: shuffledText.map((sentence, indexSentence) =>
            sentence.map((word, indexWord) => ({
              word,
              isActive: false,
              key: `${indexSentence}-${word}-${indexWord}`
            }))),
          spans: currentText.map(() => []),
          progress: currentText.map(() => "unfinished"),
          text: currentText,
          history: currentText.map(() => []),
          currentIndex: 0
        });
        setNewLocation(location.pathname, {}, true)
      } else if (getItem('currentText')) {
        const {
          buttons,
          progress,
          currentIndex,
          spans,
          history,
          text
        } = getItem('currentText');
        setButtons(buttons);
        setProgress(progress);
        setCurrentIndex(currentIndex);
        setSpans(spans);
        setHistory(history);
        setText(text);
      }
    }
  }, [location]);

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
      }));
    setButtons(prevButtons =>
      prevButtons.map((sentence, indexSentence) =>
        indexSentence !== currentIndex ? sentence : sentence.map((button) =>
          button.key === key ? ({
            ...button, isActive: !button.isActive
          }) : button)));
  };

  const submitSentence = () => {
    const colorizedSpans = spans[currentIndex].map((span, indexSpan) => ({
      ...span,
      isRight: span.word === text[currentIndex][indexSpan]
    }));
    const newHistory = history.map((sentence, indexSentence) =>
      indexSentence !== currentIndex ? sentence : [...sentence, colorizedSpans]
    );
    setHistory(newHistory);
    if (currentIndex === text.length - 1) {
      setNewLocation('/end', {
          mistakes: newHistory
        }
      );
      dismantling();
      return;
    }
    changeSentence(currentIndex + 1);
  };

  const changeSentence = (NewIndex) => {
    if (spans[currentIndex].length > 0) {
      setProgress(prevProgress =>
        prevProgress.map((status, indexStatus) =>
          indexStatus === currentIndex ? "finished" : status));
    }
    setCurrentIndex(NewIndex);
    saveItem('currentText', {
      buttons,
      spans,
      progress,
      history,
      text,
      currentIndex
    });
  };

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
  };

  const goHome = () => {
    setNewLocation('/home');
    dismantling();
  };


  const dismantling = () => {
    setProgress([]);
    setButtons([]);
    setCurrentIndex(0);
    setSpans([]);
    setText([]);
    setHistory([]);
    removeItem('currentText')
  };

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
  });
};

export default usePlay;