import style from "./SpanList.module.css";

const SpanList = ({array, delSpan}) => {
  return (<div className={style.spanList}>
    {array && array.map((value) => (<span
      key={value.key}
      onClick={() => delSpan(value.key)}
      className={`${style.span} ${"isRight" in value ? value.isRight ? style.isTrue : style.isFalse : ''}`}
    >{value.word}</span>))}
  </div>);
}

export default SpanList;