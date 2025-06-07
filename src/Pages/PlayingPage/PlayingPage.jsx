import Button from "../../Components/Button/Button";
import style from './PlayingPage.module.css'
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import ButtonList from "../../Components/ButtonList/ButtonList";
import SpanList from "../../Components/SpanList/SpanList";
import Notification from "../../Components/Notification/Notification";

const PlayingPage = ({
                       buttons,
                       spans,
                       changeButton,
                       progress,
                       operations,
                       currentIndex,
                       changeSentence,
                       seconds
                     }) => {
  return (<div className={style.playField}>

    <Notification
      isVisible={true}
      context={seconds}
      right={true}
    />
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
        onClick={operations.clearSentence}
        content={"Clear"}
        width={"25%"}
      />
      <Button
        theme={"blue"}
        onClick={operations.goHome}
        content={"Home"}
        width={"25%"}
      />
      <Button
        theme={"lime"}
        onClick={operations.submitSentence}
        content={currentIndex === progress.length - 1 ? "Finish" : "Submit"}
        width={"25%"}
      />
    </div>
  </div>);
};

export default PlayingPage;