import {useEffect, useState} from "react";
import {accuracyAnswer} from "../utils/accuracyAnswer";
import {timeConversion} from "../utils/timeСonversion";

const useResults = (location) => {
  const [answer, setAnswer] = useState([]);
  const [originalText, setOriginalText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (location.pathname === "/end") {
      const {originalText, history, times} = location.state || {};
      const [newAnswer, newProgress] = accuracyAnswer(originalText, history);
      setAnswer(newAnswer.map((answer, indexSentence) =>
        ({answer, time: timeConversion(times[indexSentence])})));
      setCurrentIndex(0);
      setProgress(newProgress);
      setOriginalText(originalText);
    }
  }, [location]);

  const changeSentence = (index) => {
    setCurrentIndex(index);
  }

  return ({
    answer: answer[currentIndex],
    originalSentence: originalText[currentIndex],
    progressEnd: progress,
    changeSentenceEnd: changeSentence
  })
}

export default useResults