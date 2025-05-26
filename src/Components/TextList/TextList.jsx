import style from "./TextList.module.css";
import Button from "../Button/Button";
import {RiMenuAddFill} from "react-icons/ri";
import Text from "../Text/Text"

const TextList = ({texts, chooseText, addText, delText}) => {
    return (<ul className={style.textList}>
        {texts.map((value, index) => (
            <Text key={index} isChoose={value.isChoose} chooseText={chooseText} name={value.name} index={index}
                  delText={delText}/>
        ))}
        <Button theme={"lime"} addClass={style.addText} onClick={addText} content={<RiMenuAddFill/>} width={"15%"}/>
    </ul>)
}

export default TextList;