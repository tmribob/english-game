import style from "./TextCreator.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

const TextCreator = ({inputText, inputName, confirmText, cancel}) => {
    return (<form className={style.formInput}>
        <Input value={inputName.name} position={"center"} onChange={inputName.update} holder={"Enter text`s name"}
               width={"40%"} height={"10vh"}/>
        <textarea className={style.inputText}
                  value={inputText.text}
                  onChange={inputText.update}
                  placeholder={"Enter Text"}/>
        <div className={style.operations}>
            <Button addClass={style.buttons} onClick={cancel} content={"Cancel"}/>
            <Button addClass={style.buttons} onClick={confirmText} content={"Add"}/>
        </div>
    </form>);
}

export default TextCreator;