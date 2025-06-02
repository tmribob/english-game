import style from "./EditingPage.module.css";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";


const EditingPage = ({
                      editingSentence,
                      inputNameEditing,
                      cancel,
                      confirmEditing,
                      changeSentence
                    }) => {
  return (<form className={style.formInput}>
    <Input
      value={inputNameEditing.name}
      position={"center"}
      onChange={inputNameEditing.update}
      holder={"Enter text`s name"}
      width={"50%"}
      height={"2.75em"}
      theme={"blue"}
    />
    <ul className={style.sentences}>
      {editingSentence && editingSentence.map((value) => (<Input
        key={value.key}
        value={value.text}
        onChange={(e) => changeSentence(value.key, e)}
        position={"justify"}
        holder={"Enter sentence"}
        theme={"lightBlue"}
        addClass={style.inputSentence}
        height={`calc(${Math.ceil(value.text.length / 55) * 1.5}em + 2em`}
      />))}
    </ul>
    <div className={style.operations}>
      <Button
        theme={"magenta"}
        onClick={cancel}
        content={"Cancel"}
        width={"30%"}
      />
      <Button
        theme={"lime"}
        onClick={confirmEditing}
        content={"Confirm"}
        width={"30%"}
      />
    </div>
  </form>)
}

export default EditingPage;