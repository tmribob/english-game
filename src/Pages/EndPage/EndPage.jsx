import Button from "../../Components/Button/Button";
import style from "./EndPage.module.css";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Answer from "../../Components/Answer/Answer";
import Span from "../../Components/Span/Span";

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
    {mistakes.length > 0 ?
      <>
        <div className={style.original}>
          <Span content={mistakes[currentIndexEnd].original} />
        </div>
        <ul className={style.answerList}>
          {mistakes[currentIndexEnd].history.map((sentence, indexSentence) => (
            <Answer
              key={indexSentence}
              sentence={sentence}
            />
          ))}
        </ul>
      </> : <Span content={"Произошла Ошибка"}/>}
    <Button
      theme={"magenta"}
      onClick={goHome}
      content={"Home"}
      width={"30%"}
    />
  </div>)
}

export default EndPage;