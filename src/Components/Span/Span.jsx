import style from './Span.module.css';

const Span = ({content, onClick = undefined, isRight = '', colorWhile}) => {
  return (<span
    className={`${style.span} ${isRight !== '' ? isRight ? style.isTrue : style.isFalse : ''} ${colorWhile && style.white}`}
    onClick={onClick}
  >
      {content}
    </span>);
};

export default Span;