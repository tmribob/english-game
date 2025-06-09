import Button from "../../Components/Button/Button";
import style from "./EndPage.module.css";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Answer from "../../Components/Answer/Answer";
import Span from "../../Components/Span/Span";

const EndPage = ({
                   goHome,
                   answer,
                   originalSentence,
                   progressEnd,
                   changeSentenceEnd
                 }) => {
  return (<div className={style.playField}>
    <ProgressBar
      progress={progressEnd.map(counterMistakes =>
        ({mistakes: counterMistakes}))}
      changeSentence={changeSentenceEnd}
    />
    {answer ? <>
      <ul className={style.original}>
        {originalSentence && originalSentence.map(span =>
          (<li><Span
            colorWhile={true}
            content={span}
          /></li>))}


      </ul>
      <Answer
        sentence={answer.answer}
        time={answer.time}
      />
    </> : "Error"}
    <Button
      theme={"magenta"}
      onClick={goHome}
      content={"Home"}
      width={"30%"}
    />
  </div>)
}

export default EndPage;