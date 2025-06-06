import style from "./SpanList.module.css";
import Span from "../Span/Span";

const SpanList = ({array, delSpan}) => {
  return (<ul className={style.spanList}>
    {array && array.map((value) => (<Span
      key={value.key}
      onClick={() => delSpan(value.key)}
      isRight={"isRight" in value ? value.isRight : ''}
      content={value.word}
    />))}
  </ul>);
}

export default SpanList;