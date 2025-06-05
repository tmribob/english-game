import Button from "../../Components/Button/Button";
import style from "./EndPage.module.css";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";

const EndPage = ({
                   goHome,
                   mistakes,
                   progressEnd,
                   changeSentenceEnd,
                   currentIndexEnd
                 }) => {
  return (<div className={style.playField}>
    <ProgressBar
      progress={progressEnd}
      changeSentence={changeSentenceEnd}
      currentIndex={currentIndexEnd}
    />
    {mistakes.length > 0 && mistakes[currentIndexEnd].map((sentence, indexSentence) => (
      <div
        className={style.mistakesList}
        key={indexSentence}
      >
        {sentence.answer.map(span => (<span
          key={span.key}
          className={span.isRight ? style.isTrue : style.isFalse}
        >{span.word}
        </span>))}
        {sentence.time}
      </div>))}

    <Button
      theme={"magenta"}
      onClick={goHome}
      content={"Home"}
      width={"30%"}
    />
  </div>)
}

export default EndPage;