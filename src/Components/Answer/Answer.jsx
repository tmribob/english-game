import style from './Answer.module.css';
import Span from '../Span/Span'

const Answer = ({sentence}) => {
  return (<li
    className={style.answer}
  >
    {sentence.answer.map(span => (<Span
        key={span.key}
        isRight={span.isRight}
        content={span.word}
      />))}
    <Span
      content={sentence.time}
    />
  </li>);
};

export default Answer;