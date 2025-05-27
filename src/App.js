import "./App.css";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import UseManageTexts from "./Hooks/UseManageTexts";
import Notification from "./Components/Notification/Notification";
import UseNotification from "./Hooks/UseNotification";
import TextList from "./Components/TextList/TextList";
import TextCreator from "./Components/TextCreator/TextCreator";
import PlayField from "./Components/PlayField/PlayField";
import UseAddText from "./Hooks/UseAddText";
import UsePlay from "./Hooks/UsePlay";
import TextEditor from "./Components/TextEditor/TextEditor";
import UseEditing from "./Hooks/UseEditing";
import EndPage from "./Components/EndPage/EndPage";


const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        notification,
        showNotification
    } = UseNotification();
    const {
        buttons,
        spans,
        changeButton,
        clearSentence,
        nextSentence,
        progress,
        goHome,
        changeSentence,
        currentIndex
    } = UsePlay(showNotification, navigate, location);
    const {
        chooseText,
        texts,
        addText,
        delText,
        editText
    } = UseManageTexts(showNotification, navigate, location);
    const {
        inputText,
        inputName,
        confirmText,
        cancel,
        splitText
    } = UseAddText(navigate, showNotification);
    const {
        inputNameEditing,
        editingSentence,
        confirmEditing
    } = UseEditing(navigate, splitText, location);
    return (
        <>
            <Notification isVisible={notification.isVisible} context={notification.text}/>
            <Routes>
                <Route path={'/'} element={<Navigate to="/home" replace/>}/>
                <Route path={'/home'} element={<TextList texts={texts}
                                                         chooseText={chooseText}
                                                         addText={addText}
                                                         delText={delText}
                                                         editText={editText}/>}/>
                <Route path={'/addText'} element={<TextCreator inputText={inputText}
                                                               inputName={inputName}
                                                               confirmText={confirmText}
                                                               cancel={cancel}/>}/>
                <Route path={'play'} element={<PlayField buttons={buttons}
                                                         spans={spans}
                                                         changeButton={changeButton}
                                                         clearSentence={clearSentence}
                                                         nextSentence={nextSentence}
                                                         progress={progress}
                                                         goHome={goHome}
                                                         currentIndex={currentIndex}
                                                         changeSentence={changeSentence}/>}/>
                <Route path={'/editText'} element={<TextEditor editingSentence={editingSentence.array}
                                                               inputNameEditing={inputNameEditing}
                                                               cancel={cancel}
                                                               changeSentence={editingSentence.update}
                                                               confirmEditing={confirmEditing}/>}/>
                <Route path={'/end'} element={<EndPage goHome={goHome} />}/>
            </Routes>
        </>
    );
};
export default App;