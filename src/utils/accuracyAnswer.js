export const accuracyAnswer = (originalText, answerText) => {
  const newAnswer = answerText.map((sentence, indexSentence) =>
    sentence.map((span, indexSpan) => {
      return ({
        ...span,
        isRight: span.word === originalText[indexSentence][indexSpan]
      });
    }));
  const progress = originalText.map((sentence, indexSentence) => {
    if (sentence.length === newAnswer[indexSentence].length) {
      return newAnswer[indexSentence].every(span => span.isRight)
    } else {
      return false;
    }
  });
  return [newAnswer, progress]
}