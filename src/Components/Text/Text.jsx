import style from "./Text.module.css"
import Button from "../Button/Button";
import {RiDeleteBin2Line, RiEdit2Line} from "react-icons/ri";

const Text = ({name, chooseText, id, delText, editText}) => {
  return (<li
    className={`${style.text} `}
    onClick={() => chooseText(id)}
  >
    <span>
      {name}
    </span>
    <div className={style.actions}>
      <Button
        theme={"lime"}
        onClick={(e) => editText(id, e)}
        content={<RiEdit2Line />}
        padding={"4px 0 0 0"}
        width={"40%"}
      />
      <Button
        theme={"magenta"}
        onClick={(e) => delText(id, e)}
        content={<RiDeleteBin2Line />}
        padding={"4px 0 0 0"}
        width={"40%"}
      />
    </div>
  </li>);
}

export default Text;