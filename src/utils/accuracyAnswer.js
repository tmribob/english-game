export const accuracyAnswer = (originalText, answerText) => {
  const newAnswer = answerText.map((sentence, indexSentence) =>
    sentence.map((span, indexSpan) => {
      return ({
        ...span,
        isRight: span.word === originalText[indexSentence][indexSpan]
      });
    }));
  const progress = newAnswer.map((sentence, indexSentence) =>
    1 - sentence.filter(span => span.isRight).length / originalText[indexSentence].length
  );
  return [newAnswer, progress]
}