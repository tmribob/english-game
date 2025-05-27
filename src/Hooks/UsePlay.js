import {useEffect, useState} from "react";
import UseLocalStorage from "./UseLocalStorage";

const UsePlay = (showNotification, navigate, location) => {
    const [text, setText] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttons, setButtons] = useState([]);
    const [spans, setSpans] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        if (location.pathname === "/play") {
            const {currentText, shuffledText} = location.state || UseLocalStorage.get('currentText');
            setText(currentText);
            start(currentText, shuffledText)
        }
    }, [location]);

    useEffect(() => {
        if (spans.length > 0) {
            updateProgress();
        }
    }, [spans]);

    const start = (currentText, shuffledText) => {
        setCurrentIndex(0);
        setButtons(shuffledText.map((sentence) => sentence.map((word, index) => ({
            word, isActive: false, key: `${currentIndex}-${word}-${index}`
        }))));
        setSpans(currentText.map(() => []));
        setProgress(currentText.map(() => "uncompleted"));
        UseLocalStorage.save('currentText', {currentText, shuffledText})
    }

    const updateProgress = () => {
        if (spans[currentIndex].some((span, index) => span.word !== text[currentIndex][index])) {
            setProgress(prevProgress => prevProgress.map((value, index) => index === currentIndex ? "uncompleted" : value))
        }
    }

    const changeButton = (key) => {
        const currentButton = buttons[currentIndex].find(button => button.key === key);
        updateProgress();
        setSpans(prevSpan => prevSpan.map((sentence, index) => {
            if (index !== currentIndex) {
                return sentence;
            } else if (currentButton.isActive) {
                return sentence.map(span => ({...span, color: null})).filter((span) => span.key !== currentButton.key);
            }
            return [...sentence, {word: currentButton.word, key: currentButton.key}];

        }))
        setButtons(prevButton => prevButton.map((sentence, index) => {
            if (index !== currentIndex) {
                return sentence;
            }
            return sentence.map((button) => button.key === key ? {...button, isActive: !button.isActive} : button);
        }));
    }

    const nextSentence = () => {
        const currentSentence = text[currentIndex];
        if (spans[currentIndex].length === currentSentence.length) {
            setSpans(prevSpans => prevSpans.map((sentence, index) => index !== currentIndex ? sentence : sentence.map((value, index) => ({
                ...value, color: value.word === currentSentence[index] ? "green" : "red"
            }))));
            if (spans[currentIndex].some((span, index) => span.word !== currentSentence[index])) {
                showNotification(`You made mistakes`);
            } else {
                if (currentIndex === text.length - 1) {
                    endGame();
                } else {
                    setProgress(prevProgress => prevProgress.map((value, index) => index === currentIndex ? "completed" : value));
                    setCurrentIndex(currentIndex + 1);
                }
            }
        } else {
            showNotification("Not all the words were chosen ");
        }
    }

    const endGame = () => {
        if (!spans.some((sentence, index) => {
            if (sentence.length === text[index].length) {
                return sentence.some((span, indexSpan) => span.word !== text[index][indexSpan]);
            }
            return true;

        })) {
            navigate('/end', {
                state: {
                    mistakes
                }
            });
            setProgress([]);
            setButtons([]);
            setCurrentIndex(0);
            setSpans([]);
            setText([]);
        }
    }

    const changeSentence = (index) => {
        setCurrentIndex(index)
    }

    const clearSentence = () => {
        setSpans(prevSpan => prevSpan.map((sentence, index) => index === currentIndex ? [] : sentence));
        setButtons(prevButton => prevButton.map((sentence, index) => {
            if (index !== currentIndex) {
                return sentence;
            }
            return sentence.map((button) => ({...button, isActive: false}));
        }));
    }
    const goHome = () => {
        navigate('/home');
    }
    return ({
        buttons, spans, changeButton, clearSentence, nextSentence, progress, goHome, changeSentence, currentIndex, start
    })
}

export default UsePlay;