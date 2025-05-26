import style from "./Button.module.css"

const Button = ({
                    onClick, addClass = null, content, type = "button", width = "100%", height = "100%", color, pading
                }) => {
    return (<div className={style.divButton} style={{width: width, height: height}}>
        <button type={type}
                style={{padding: pading}}
                className={`${style.button} ${addClass} ${color === "magenta" ? style.magenta : color === "lime" ? style.lime : color === "blue" ? style.blue : ""}`}
                onClick={onClick}>
            {content}
        </button>
    </div>)
}

export default Button;