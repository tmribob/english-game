import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";

import Notification from "./Components/Notification/Notification";
import useNotification from "./Hooks/useNotification";

import HomePage from "./Pages/HomePage/HomePage";
import useManageTexts from "./Hooks/useManageTexts";

import CreationPage from "./Pages/CreationPage/CreationPage";
import useAddText from "./Hooks/useAddText";

import PlayingPage from "./Pages/PlayingPage/PlayingPage";
import usePlay from "./Hooks/usePlay";

import EditingPage from "./Pages/EditingPage/EditingPage";
import useEditing from "./Hooks/useEditing";

import EndPage from "./Pages/EndPage/EndPage";
import useResults from "./Hooks/useResults";

import Header from "./Components/Header/Header";
import useMyNavigation from "./Hooks/useMyNavigation";
import useLocalStorage from "./Hooks/useLocalStorage";

const App = () => {
  const {location, setNewLocation, header} = useMyNavigation();
  const {notification, showNotification} = useNotification();
  const {getItem, removeItem, saveItem} = useLocalStorage();

  const {
    buttons,
    spans,
    changeButton,
    progress,
    operations,
    changeSentence,
    seconds
  } = usePlay(showNotification, setNewLocation, location, saveItem, getItem, removeItem);

  const {
    chooseText, texts, addText, delText, editText
  } = useManageTexts(showNotification, setNewLocation, location, saveItem, getItem);

  const {
    inputText,
    inputName,
    confirmText, cancel
  } = useAddText(setNewLocation, showNotification);

  const {
    inputNameEditing,
    editingSentence,
    confirmEditing
  } = useEditing(setNewLocation, location);

  const {
    answer,
    originalSentence,
    progressEnd,
    changeSentenceEnd
  } = useResults(location);

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
        element={<HomePage
          texts={texts}
          chooseText={chooseText}
          addText={addText}
          delText={delText}
          editText={editText}
        />}
      />
      <Route
        path={'/addText'}
        element={<CreationPage
          inputText={inputText}
          inputName={inputName}
          confirmText={confirmText}
          cancel={cancel}
        />}
      />
      <Route
        path={'/play'}
        element={<PlayingPage
          buttons={buttons}
          spans={spans}
          changeButton={changeButton}
          progress={progress}
          operations={operations}
          changeSentence={changeSentence}
          seconds={seconds}
        />}
      />
      <Route
        path={'/editText'}
        element={<EditingPage
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
          goHome={operations.goHome}
          answer={answer}
          originalSentence={originalSentence}
          changeSentenceEnd={changeSentenceEnd}
          progressEnd={progressEnd}
        />}
      />
    </Routes>
  </>);
};
export default App;