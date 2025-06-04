import style from "./ButtonList.module.css";
import Button from "../Button/Button";

const ButtonList = ({array, changeButton}) => {
  return (<ul className={style.buttonList}>
    {array && array.map((value) => (<Button
      addClass={value.isActive ? style.isActive : ""}
      key={value.key}
      width={"auto"}
      theme={"blue"}
      onClick={() => changeButton(value.key)}
      content={value.word}
    />))}
  </ul>);
}
export default ButtonList;