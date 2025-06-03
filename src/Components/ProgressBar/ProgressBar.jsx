import style from "./ProgressBar.module.css";

const ProgressBar = ({progress, changeSentence, currentIndex}) => {
  return (<ul className={style.progressBar}>
    {progress.length > 0 && progress.map((value, index) => (<div
      className={style.divSquare}
      key={index}
    >
      <li
        className={`${style.square} ${currentIndex === index ? style.current : ""} ${value === "finished" ? style.completed : ""}`}
        onClick={() => changeSentence(index)}
      >{index + 1}</li>
    </div>))}
  </ul>)
}

export default ProgressBar;