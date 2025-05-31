import Button from "../Button/Button";
import style from './PlayField.module.css'
import ProgressBar from "../ProgressBar/ProgressBar";
import ButtonList from "../ButtonList/ButtonList";
import SpanList from "../SpanList/SpanList";

const PlayField = ({
                     buttons,
                     spans,
                     changeButton,
                     clearSentence,
                     submitSentence,
                     progress,
                     goHome,
                     currentIndex,
                     changeSentence
                   }) => {
  return (<div className={style.playField}>
    <ProgressBar
      progress={progress}
      changeSentence={changeSentence}
      currentIndex={currentIndex}
    />
    <ButtonList
      array={buttons[currentIndex]}
      changeButton={changeButton}
    />
    <SpanList
      array={spans[currentIndex]}
      delSpan={changeButton}
    />
    <div className={style.divOperations}>
      <Button
        theme={"magenta"}
        onClick={clearSentence}
        content={"Clear"}
        width={"25%"}
      />
      <Button
        theme={"blue"}
        onClick={goHome}
        content={"Home"}
        width={"25%"}
      />
      <Button
        theme={"lime"}
        onClick={submitSentence}
        content={"Submit"}
        width={"25%"}
      />
    </div>
  </div>);
};

export default PlayField;