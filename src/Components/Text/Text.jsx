import style from "./Text.module.css"
import Button from "../Button/Button";
import {RiDeleteBin2Line, RiEdit2Line} from "react-icons/ri";

const Text = ({name, chooseText, index, delText, editText}) => {
    return (<li className={`${style.text} `} onClick={() => chooseText(index)}>
        {name}
        <div className={style.actions}>
            <Button theme={"lime"} onClick={() => editText(index)} content={<RiEdit2Line/>} padding={"4px 0 0 0"}
                    width={"40%"}/>
            <Button theme={"magenta"} onClick={() => delText(index)} content={<RiDeleteBin2Line/>} padding={"4px 0 0 0"}
                    width={"40%"}/>
        </div>


    </li>);
}

export default Text;