import {useEffect, useState} from "react";

const useEditing = (setNewLocation, location) => {
  const [originalId, setOriginalId] = useState(null);
  const [inputName, setInputName] = useState('');
  const [inputSentences, setInputSentences] = useState([]);

  useEffect(() => {
    if (location.pathname === "/editText") {
      if (location.state) {
        const array = location.state.array;
        setInputSentences([...array.text.map((v, i) => ({
          key: i, text: v.join(' ')
        })), {key: array.text.length, text: ""}]);
        setOriginalId(array.id);
        setInputName(array.name);
      }
    }
  }, [location]);

  const changeName = (e) => {
    setInputName(e.target.value);
  }
  const changeSentence = (key, e) => {
    setInputSentences(preInputs => {
      const updateInputs = preInputs.map((v) => v.key === key ? {
        ...v, text: e.target.value
      } : v).filter(v => v.text.trim() !== '')
      if (updateInputs[updateInputs.length - 1].text.trim() !== '') {
        const maxKey = Math.max(...updateInputs.map(v => v.key));
        return [...updateInputs, {key: maxKey + 1, text: ""}];
      }
      return updateInputs;
    })
  }
  const confirmEditing = () => {
    setNewLocation('/home', {
      editedText: {
        name: inputName,
        id: originalId,
        text: inputSentences.map(v => v.text).join('.')
      }
    })
  }

  return ({
    inputNameEditing: {name: inputName, update: changeName},
    editingSentence: {array: inputSentences, update: changeSentence},
    confirmEditing
  })
}
export default useEditing