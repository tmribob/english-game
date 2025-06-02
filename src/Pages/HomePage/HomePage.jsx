import style from "./HomePage.module.css";
import Button from "../../Components/Button/Button";
import {RiMenuAddFill} from "react-icons/ri";
import Text from "../../Components/Text/Text"

const HomePage = ({texts, chooseText, addText, delText, editText}) => {
  return (<ul className={style.textList}>
    {texts.map((value, index) => (<Text
      key={index}
      chooseText={chooseText}
      name={value.name}
      index={index}
      delText={delText}
      editText={editText}
    />))}
    <Button
      theme={"lime"}
      addClass={style.addText}
      onClick={addText}
      content={<RiMenuAddFill />}
      width={"15%"}
    />
  </ul>)
}

export default HomePage;