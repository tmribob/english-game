import Button from "../Button/Button";

const EndPage = ({goHome}) => {
    return (<div>
        <h1>ТЫ МОЛОДЕЦ ЗАВЕРШИЛ ТРЕНЕРОВКУ</h1>
        <Button theme={"magenta"} onClick={goHome} content={"Home"}/>
    </div>)
}

export default EndPage;