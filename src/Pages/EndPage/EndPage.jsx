import Button from "../../Components/Button/Button";

const EndPage = ({goHome, mistakes}) => {
    return (<div>
        {mistakes && mistakes.map(sentence => (
          <p>{sentence.map(span => span.word).join(' ')}</p>))}
        <Button
          theme={"magenta"}
          onClick={goHome}
          content={"Home"}
        />
    </div>)
}

export default EndPage;