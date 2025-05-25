import {useState} from "react";

const UsePlay = (showNotification, navigate) => {
    const [text, setText] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttons, setButtons] = useState([]);
    const [spans, setSpans] = useState([]);
    const [progress, setProgress] = useState([]);

    const start = (currentText, shuffledText) => {
        navigate('/play')
        setCurrentIndex(0);
        setButtons(shuffledText.map((sentence) => sentence.map((word, index) => ({
            word, isActive: false, key: index
        }))));
        setText(currentText);
        setSpans(currentText.map(() => []));
        setProgress(currentText.map(() => "uncompleted"));

    }

    const changeButton = (key) => {
        const currentButton = buttons[currentIndex].find(button => button.key === key);
        setSpans(prevSpan => prevSpan.map((sentence, index) => {
            if (index !== currentIndex) {
                return sentence;
            } else if (currentButton.isActive) {
                return sentence.filter((span) => span.key !== currentButton.key);
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
            if (spans[currentIndex].some((span, index) => span.word !== currentSentence[index])) {
                showNotification(`You made mistakes`);
                setSpans(prevSpans => prevSpans.map((sentence, index) => {
                    if (index !== currentIndex) {
                        return sentence;
                    }
                    return sentence.map((value, index) => ({
                        ...value, color: value.word === currentSentence[index] ? "green" : "red"
                    }));
                }));
            } else {
                if (currentIndex === text.length - 1) {
                    navigate('/home')
                } else {
                    setProgress(progress.map((value, index) => index === currentIndex ? "completed" : value));
                    setCurrentIndex(currentIndex + 1);
                }
            }
        } else {
            showNotification("Not all the words were chosen ");
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
        buttons,
        spans,
        changeButton,
        clearSentence,
        nextSentence,
        progress,
        goHome,
        changeSentence,
        currentIndex,
        start
    })
}

export default UsePlay;