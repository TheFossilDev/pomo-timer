import React, { useState, useEffect } from "react";
// import { fireBaseApp, fireBaseAnalytics } from "./FireBaseConnector";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "./store/themeReducer";
import { timerActions } from "./store/timerReducer";
import ReactGA from "react-ga"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./App.module.css";

import Timer from "./Components/Timer";
import ButtonTooltip from "./Components/UI/Buttons/ButtonTooltip";
import Button from "./Components/UI/Buttons/Button";
import Settings from "./Components/Settings";
import Modal from "./Components/UI/Modal";
import ConfirmationBox from "./Components/ResetData/ResetData";

import DarkMode from "./Components/Icons/DarkMode";
import TrashCan from "./Components/Icons/TrashCan";
import Gear from "./Components/Icons/Gear";
import Help from "./Components/Icons/Help";
import MobilePreview from "./Components/MobilePreview";
import TaskPanel from "./Components/Tasks/TaskPanel";
import CloseCircle from "./Components/Icons/CloseCircle";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwVLTwfIApxbzpbEg0-fVdSsu8p-gCcXk",
  authDomain: "pomodorio-backend.firebaseapp.com",
  projectId: "pomodorio-backend",
  storageBucket: "pomodorio-backend.appspot.com",
  messagingSenderId: "827293182697",
  appId: "1:827293182697:web:a74697815d297eb4cdde78",
  measurementId: "G-5JQT4THY4T"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireBaseAnalytics = getAnalytics(fireBaseApp);

const auth = getAuth();
async function login() {
  const uEmail = "";
  const pwd = "";
  const user = (await signInWithEmailAndPassword(auth, uEmail, pwd)).user;
  console.log(user);
};


ReactGA.initialize('G-5JQT4THY4T');
ReactGA.pageview(window.location.pathname + window.location.search);

const localStorageGetter = (key, backup) => {
  const value = localStorage.getItem(key);
  if (value === null || value === undefined) {
    return backup;
  } else {
    return value;
  }
};

const App = () => {
  const dispatch = useDispatch();

  const [isSetting, changeIsSetting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSkipConfirming, setIsSkipConfirming] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(
    localStorageGetter("TasksOpen", false) === "true"
  );
  const [headerLabel, setHeaderLabel] = useState("Pomodoro Timer");

  // Timer slice
  const timerType = useSelector((state) => state.timer.timerType);
  const timerState = useSelector((state) => state.timer.timerState);
  const pomosCompleted = useSelector((state) => state.timer.pomosCompleted);
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);

  // Theme slice
  const darkMode = useSelector((state) => state.theme.darkMode);
  const helpMode = useSelector((state) => state.theme.helpMode);

  // Sync progress to localstorage on each update
  useEffect(() => {
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
  }, [minutes, seconds]);

  const setHandler = () => {
    changeIsSetting(!isSetting);
  };

  const onConfirming = () => {
    setIsConfirming(false);
    // Reset to defaults
    dispatch(timerActions.returnTimerToDefault());
  };

  const handleSkipConfirm = () => {
    setIsSkipConfirming(false);
    dispatch(timerActions.skip());
  };
  
  async function test() {
    logEvent(fireBaseAnalytics, "Timer Action", { type: "skip confirmed" });
  }

  const modalClickHandler = () => {
    changeIsSetting(false);
  };

  const darkModeClickHandler = () => {
    localStorage.setItem("darkMode", !darkMode);
    dispatch(themeActions.flipDarkMode());
  };

  useEffect(() => {
    if (pomosCompleted === 0 && timerState === "ready") {
      setHeaderLabel("Pomodoro Timer");
    } else {
      switch (timerType) {
        case "work":
          setHeaderLabel(`Pomodoro #${pomosCompleted + 1}`);
          break;
        case "rest":
          setHeaderLabel("Short Break");
          break;
        case "break":
          setHeaderLabel("Long Break");
          break;
        default:
          setHeaderLabel("Broken!");
      }
    }
  }, [timerType, timerState, pomosCompleted]);

  return (
    <>
      {window.innerWidth < 650 ? <MobilePreview /> : null}
      <Modal clickHandler={modalClickHandler} in={isSetting}>
        <Settings changeIsSetting={changeIsSetting} />
      </Modal>

      <ConfirmationBox
        in={isConfirming}
        cancelConfirming={() => setIsConfirming(false)}
        onConfirming={onConfirming}
      />
      <ConfirmationBox
        in={isSkipConfirming}
        cancelConfirming={() => setIsSkipConfirming(false)}
        onConfirming={handleSkipConfirm}
      />
      <div
        className={`${styles["mainContainer"]} ${
          darkMode ? styles["dark"] : styles["light"]
        }`}
      >
        <header className={styles.mainHeader}>
        <h3
          className={`${styles.title} ${
            darkMode ? styles["dark"] : styles["light"]
          }`}
        >
          {headerLabel}
        </h3>
        <Button
          size={"medium"}
          flex={true}
          onClick={() => dispatch(themeActions.flipHelpMode())}
        >
          <Help />
        </Button>
        <button onClick={test}>Test</button>
        <Button size={"medium"} flex={true} onClick={setHandler}>
          <Gear />
        </Button>
        <ButtonTooltip
          size={"medium"}
          flex={true}
          onClick={() => setIsConfirming(true)}
          in={helpMode}
        >
          <TrashCan />
        </ButtonTooltip>
        <Button onClick={darkModeClickHandler}>
          <DarkMode />
        </Button>
        <Button onClick={login}>Login</Button>
      </header>
      <div className={styles.blocksContainer}>
        <div
          className={`${styles["centerContainer"]} ${
            darkMode ? styles["dark"] : styles["light"]
          }`}
        >
          <Timer
            changeIsSetting={changeIsSetting}
            isSetting={isSetting}
            flipIsConfirming={() => setIsConfirming(true)}
            setIsSkipConfirming={setIsSkipConfirming}
          />
          <CloseCircle
            className={`${styles["expandButton"]} ${
              isTasksOpen ? styles["expandButtonOpen"] : ""
            }`}
            onClick={() => {
              localStorage.setItem("TasksOpen", !isTasksOpen);
              setIsTasksOpen((prevState) => !prevState);
            }}
          />
        </div>
        {isTasksOpen ? <TaskPanel /> : null}
      </div>
      </div>
    </>
  );
};

export default App;
