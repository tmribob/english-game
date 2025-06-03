import Button from "../../Components/Button/Button";
import style from "./EndPage.module.css";

const EndPage = ({goHome, mistakes}) => {
  return (<div>
    {mistakes && mistakes.map(sentence => (
      <span className={style.mistakesList}>
        {sentence.map(span => (
          <span
            key={span.key}
            className={span.isRight ? style.isTrue : style.isFalse}
          >{span.word}
        </span>))}
      </span>))}

    <Button
      theme={"magenta"}
      onClick={goHome}
      content={"Home"}
    />
  </div>)
}

export default EndPage;