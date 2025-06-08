import style from "./ButtonList.module.css";
import Button from "../Button/Button";

const ButtonList = ({array, changeButton}) => {
  return (<ul className={style.buttonList}>
    {array && array.map((value) => (<li key={value.key}>
      <Button
        addClass={value.isActive ? style.isActive : ""}
        width={"auto"}
        theme={"blue"}
        onClick={() => changeButton(value.key)}
        content={value.word}
      />
    </li>))}
  </ul>);
}
export default ButtonList;