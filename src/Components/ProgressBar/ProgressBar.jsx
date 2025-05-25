import style from "./ProgressBar.module.css";

const ProgressBar = ({progress, changeSentence, currentIndex}) => {
    return (<ul className={style.progressBar}>
        {progress.map((value, index) => (
            <li key={index}
                 className={`${style.square} ${currentIndex === index ? style.current : ""} ${value === "completed" ? style.completed : ""}`}
                 onClick={() => changeSentence(index)}>{index + 1}</li>
        ))}
    </ul>)
}

export default ProgressBar;