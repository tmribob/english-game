import style from "./Button.module.css"

const Button = ({
                  onClick,
                  addClass = null,
                  content,
                  type = "button",
                  width = "100%",
                  height = "100%",
                  theme,
                  padding
                }) => {
  return (<div
    className={style.divButton}
    style={{width: width, height: height}}
  >
    <button
      type={type}
      style={{padding: padding}}
      className={`${style.button} ${addClass} ${theme === "magenta" ? style.magenta : theme === "lime" ? style.lime : theme === "blue" ? style.blue : ""}`}
      onClick={onClick}
    >
      {content}
    </button>
  </div>)
}

export default Button;