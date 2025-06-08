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
      progress={progress.map(value =>
        ({color: value.isCurrent ? "magenta" : value.isSubmitted ? "lime" : ""}))}
      changeSentence={changeSentence}
    />
    <ButtonList
      array={buttons}
      changeButton={changeButton}
    />
    <SpanList
      array={spans}
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
        content={progress.find((_, index) => index === progress.length - 1)?.isCurrent ? "Finish" : "Submit"}
        width={"25%"}
      />
    </div>
  </div>);
};

export default PlayingPage;