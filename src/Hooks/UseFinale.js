import {useEffect, useState} from "react";

const UseFinale = (location) => {
  const [mistakes, setMistakes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (location.pathname === "/end") {
      const newMistakes = location.state.mistakes || [];
      setMistakes(newMistakes);
      setCurrentIndex(0);
      setProgress(newMistakes.map(() => "finished"))
    }
  }, [location]);

  const changeSentence = (index) => {
    setCurrentIndex(index);
  }

  return ({
    mistakes,
    progressEnd: progress,
    currentIndexEnd: currentIndex,
    changeSentenceEnd: changeSentence
  })
}

export default UseFinale