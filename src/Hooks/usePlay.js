import {useEffect, useState} from "react";
import {timeConversion} from "../utils/timeСonversion";

const usePlay = (showNotification, setNewLocation, location, saveItem, getItem, removeItem) => {
  const [text, setText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttons, setButtons] = useState([]);
  const [spans, setSpans] = useState([]);
  const [progress, setProgress] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    let timer;
    if (seconds !== null) {
      timer = setTimeout(() => {
        setSeconds(prev => prev + 1);
        saver();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    if (progress && progress.length > 0) {
      setProgress(prevProgress =>
        prevProgress.map((status, indexStatus) =>
          ({...status, isCurrent: indexStatus === currentIndex})))
    }
  }, [currentIndex]);

  const saver = () => {
    if (text.length > 0) {
      saveItem('currentText', {
        buttons,
        spans,
        progress,
        text,
        currentIndex,
        seconds,
        times
      });
    }
  }

  const setterState = () => {
    const {
      buttons,
      progress,
      currentIndex,
      spans,
      times,
      text,
      seconds
    } = getItem('currentText');
    setButtons(buttons);
    setProgress(progress);
    setCurrentIndex(currentIndex);
    setSpans(spans);
    setTimes(times)
    setText(text);
    setSeconds(seconds);
  }

  useEffect(() => {
    if (location.pathname === "/play") {
      const continueSentence = getItem('currentText')
      if (continueSentence) {
        setterState();
      } else if ("newPlay" in location.state) {
        const {currentText, shuffledText} = location.state.newPlay;
        saveItem('currentText', {
          buttons: shuffledText.map((sentence, indexSentence) =>
            sentence.map((word, indexWord) => ({
              word,
              isActive: false,
              key: `${indexSentence}-${word}-${indexWord}`
            }))),
          spans: currentText.map(() => []),
          progress: currentText.map((_, indexSentence) =>
            ({isSubmitted: false, isCurrent: indexSentence === 0})),
          text: currentText,
          times: currentText.map(() => 0),
          currentIndex: 0,
          seconds: 0
        });
        setterState();
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
    setTimes(prevTimes =>
      prevTimes.map((time, indexSentence) =>
        indexSentence === currentIndex ? seconds : time));
    if (currentIndex === text.length - 1) {
      setNewLocation('/end', {
          originalText: text,
          history: spans,
          times: times
        }
      );
      dismantling();
      return;
    }
    setProgress(prevProgress =>
      prevProgress.map((status, indexStatus) =>
        indexStatus === currentIndex ? {...status, isSubmitted: true} : status
      ))
    changeSentence(currentIndex + 1);
  };

  const changeSentence = (NewIndex) => {
    setCurrentIndex(NewIndex);
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
    if (progress[currentIndex].isSubmitted) {
      setProgress(prevProgress =>
        prevProgress.map((sentence, indexSentence) =>
          indexSentence === currentIndex ? {
            ...sentence,
            isSubmitted: false
          } : sentence));
    }
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
    setText([])
    setSeconds(null);
    removeItem('currentText');
  };

  return ({
    buttons: buttons[currentIndex],
    spans: spans[currentIndex],
    operations: {clearSentence, submitSentence, goHome},
    changeButton,
    progress,
    changeSentence,
    seconds: timeConversion(seconds)
  });
};

export default usePlay;