import {useEffect, useState} from "react";

const UseEditing = (navigate, splitText,location) => {
    const [originalIndex, setOriginalIndex] = useState(null);
    const [inputName, setInputName] = useState('');
    const [inputSentences, setInputSentences] = useState([]);

    useEffect(() => {
        if (location.pathname === "/editText") {
            if (location.state) {
                const {array, index} = location.state;
                setInputSentences(array.text.map((v, i) => ({key: i, text: v.join(' ')})));
                setOriginalIndex(index);
                setInputName(array.name)
            }
        }
    }, [location]);

    const changeName = (e) => {
        setInputName(e.target.value);
    }
    const changeSentence = (key, e) => {
        setInputSentences(preInputs => preInputs.map((v) => v.key === key ? {...v, text: e.target.value} : v))
    }
    const confirmEditing = () => {
        navigate('/home', {
            state: {
                editedText: {
                    index: originalIndex,
                    text: {name: inputName, text: splitText(inputSentences.map(v => v.text).join('.'))}
                }
            }
        })
    }

    return ({
        inputNameEditing: {name: inputName, update: changeName},
        editingSentence: {array: inputSentences, update: changeSentence},
        confirmEditing,

    })
}
export default UseEditing