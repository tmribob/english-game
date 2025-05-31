import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
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
import useFinale from "./Hooks/UseFinale";
import Header from "./Components/Header/Header";
import UseMyNavigation from "./Hooks/UseMyNavigation";


const App = () => {
  const {location, setNewLocation, header} = UseMyNavigation();
  const {
    notification, showNotification
  } = UseNotification();
  const {
    buttons,
    spans,
    changeButton,
    clearSentence,
    submitSentence,
    progress,
    goHome,
    changeSentence,
    currentIndex
  } = UsePlay(showNotification, setNewLocation, location);
  const {
    chooseText, texts, addText, delText, editText
  } = UseManageTexts(showNotification, setNewLocation, location);
  const {
    inputText, inputName, confirmText, cancel, splitText
  } = UseAddText(setNewLocation, showNotification);
  const {
    inputNameEditing, editingSentence, confirmEditing
  } = UseEditing(setNewLocation, splitText, location);
  const {mistakes} = useFinale(location);
  return (<>
    <Notification
      isVisible={notification.isVisible}
      context={notification.text}
    />
    <Header header={header} />
    <Routes>
      <Route
        path={'/'}
        element={<Navigate
          to="/home"
          replace
        />}
      />
      <Route
        path={'/home'}
        element={<TextList
          texts={texts}
          chooseText={chooseText}
          addText={addText}
          delText={delText}
          editText={editText}
        />}
      />
      <Route
        path={'/addText'}
        element={<TextCreator
          inputText={inputText}
          inputName={inputName}
          confirmText={confirmText}
          cancel={cancel}
        />}
      />
      <Route
        path={'play'}
        element={<PlayField
          buttons={buttons}
          spans={spans}
          changeButton={changeButton}
          clearSentence={clearSentence}
          submitSentence={submitSentence}
          progress={progress}
          goHome={goHome}
          currentIndex={currentIndex}
          changeSentence={changeSentence}
        />}
      />
      <Route
        path={'/editText'}
        element={<TextEditor
          editingSentence={editingSentence.array}
          inputNameEditing={inputNameEditing}
          cancel={cancel}
          changeSentence={editingSentence.update}
          confirmEditing={confirmEditing}
        />}
      />
      <Route
        path={'/end'}
        element={<EndPage
          goHome={goHome}
          mistakes={mistakes}
        />}
      />
    </Routes>
  </>);
};
export default App;