import style from './Answer.module.css';
import Span from '../Span/Span'

const Answer = ({sentence, time}) => {
  return (<ul
    className={style.answer}
  >
    {sentence.map(span => (<li><Span
      key={span.key}
      isRight={span.isRight}
      content={span.word}
    /></li>))}
    <Span content={time} />
  </ul>);
};

export default Answer;