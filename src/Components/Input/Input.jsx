import style from "./Input.module.css"

const Input = ({
                   name, value, holder = null, onChange, width = "100%", height = "100%", position = "left"
               }) => {
    return (<div className={style.divInput} style={{width: width, height: height}}>
            <input name={name}
                   value={value}
                   placeholder={holder}
                   onChange={onChange}
                   style={{textAlign: position}}
                   className={style.inputText}/>
        </div>

    )
}

export default Input