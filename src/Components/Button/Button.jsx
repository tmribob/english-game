import style from "./Button.module.css"

const Button = ({onClick, addClass = null, content, type = "button", width = "100%", height = "100%"}) => {
    return (<div className={style.divButton} style={{width: width, height: height}}>
            <button type={type} className={`${style.button} ${addClass}`} onClick={onClick}>
                {content}
            </button>
        </div>)
}

export default Button;