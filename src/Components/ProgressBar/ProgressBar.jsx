import style from "./ProgressBar.module.css";

const ProgressBar = ({progress, changeSentence}) => {
  return (
    <ul className={style.progressBar}>
      {progress.length > 0 && progress.map((value, index) => (
        <li
          className={style.divSquare}
          key={index}
        >
          <div
            className={`${style.square} ${value.color==="magenta" ? style.magenta : value.color==="lime" ? style.lime : ""}`}
            onClick={() => changeSentence(index)}
          >
            {index + 1}
          </div>
        </li>))}
    </ul>)
}

export default ProgressBar;