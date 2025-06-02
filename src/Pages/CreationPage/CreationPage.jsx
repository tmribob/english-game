import style from "./CreationPage.module.css";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

const CreationPage = ({inputText, inputName, confirmText, cancel}) => {
  return (<form className={style.formInput}>
    <Input
      value={inputName.name}
      position={"center"}
      onChange={inputName.update}
      holder={"Enter text`s name"}
      width={"50%"}
      height={"2.75em"}
      theme={"blue"}
      name={"name"}
    />
    <Input
      addClass={style.inputText}
      position={"justify"}
      width={"75%"}
      theme={"lightBlue"}
      value={inputText.text}
      onChange={inputText.update}
      holder={"Enter text"}
      height={"50vh"}
      padding={"1em"}
    />
    <div className={style.operations}>
      <Button
        theme={"magenta"}
        onClick={cancel}
        content={"Cancel"}
        width={"30%"}
      />
      <Button
        theme={"lime"}
        onClick={confirmText}
        content={"Add"}
        width={"30%"}
      />
    </div>
  </form>);
}

export default CreationPage;