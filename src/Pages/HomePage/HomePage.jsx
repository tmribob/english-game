import style from "./HomePage.module.css";
import Button from "../../Components/Button/Button";
import {RiMenuAddFill} from "react-icons/ri";
import Text from "../../Components/Text/Text"

const HomePage = ({texts, chooseText, addText, delText, editText}) => {
  return (<ul className={style.textList}>
    {texts.map(text => (
      <Text
        key={text.id}
        chooseText={chooseText}
        name={text.name}
        id={text.id}
        delText={delText}
        editText={editText}
      />
    ))}
    <li key={'addText'}>
      <Button
        theme={"lime"}
        addClass={style.addText}
        onClick={addText}
        content={<RiMenuAddFill />}
        width={"7.5em"}
        margin={"0 2.25em 0"}
      />
    </li>
  </ul>)
}

export default HomePage;