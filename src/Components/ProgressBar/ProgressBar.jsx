import style from "./ProgressBar.module.css";

const ProgressBar = ({progress, changeSentence, currentIndex}) => {
  return (
    <ul className={style.progressBar}>
      {progress.length > 0 && progress.map((value, index) => (
        <li
          className={style.divSquare}
          key={index}
        >
          <div
            className={`${style.square} ${currentIndex === index ? style.current : ""} ${value === "finished" ? style.completed : ""}`}
            onClick={() => changeSentence(index)}
          >
            {index + 1}
          </div>
        </li>))}
    </ul>)
}

export default ProgressBar;