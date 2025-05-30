import style from "./TextList.module.css";
import Button from "../Button/Button";
import {RiMenuAddFill} from "react-icons/ri";
import Text from "../Text/Text"

const TextList = ({texts, chooseText, addText, delText, editText}) => {
    return (<ul className={style.textList}>
        {texts.map((value, index) => (
            <Text key={index} chooseText={chooseText} name={value.name} index={index}
                  delText={delText} editText={editText}/>
        ))}
        <Button theme={"lime"} addClass={style.addText} onClick={addText} content={<RiMenuAddFill/>} width={"15%"}/>
    </ul>)
}

export default TextList;