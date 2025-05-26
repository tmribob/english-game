import style from "./TextCreator.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

const TextCreator = ({inputText, inputName, confirmText, cancel}) => {
    return (<form className={style.formInput}>
        <Input value={inputName.name} position={"center"} onChange={inputName.update} holder={"Enter text`s name"}
               width={"40%"} height={"10vh"} theme={"blue"} name={"name"} />
        <textarea className={style.inputText}
                  value={inputText.text}
                  onChange={inputText.update}
                  placeholder={"Enter Text"}/>
        <div className={style.operations}>
            <Button theme={"magenta"} onClick={cancel} content={"Cancel"} width={"30%"}/>
            <Button theme={"lime"} onClick={confirmText} content={"Add"} width={"30%"}/>
        </div>
    </form>);
}

export default TextCreator;