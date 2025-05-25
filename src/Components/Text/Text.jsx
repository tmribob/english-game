import style from "./Text.module.css"
import Button from "../Button/Button";
import {RiDeleteBin2Line} from "react-icons/ri";

const Text = ({name, chooseText, index, delText, isChoose}) => {
    return (<li className={`${style.text} ${isChoose?style.isChoose:''}`} onClick={() => chooseText(index)}>
        {name}
        <Button onClick={() => delText(index)} content={<RiDeleteBin2Line/>}/>
    </li>);
}

export default Text;