import style from "./SpanList.module.css";
import Span from "../Span/Span";

const SpanList = ({array, delSpan}) => {
  return (<ul className={style.spanList}>
    {array && array.map((value) => (<li key={value.key}>
      <Span
        onClick={() => delSpan(value.key)}
        isRight={"isRight" in value ? value.isRight : ''}
        content={value.word}
      />
    </li>))}
  </ul>);
}

export default SpanList;