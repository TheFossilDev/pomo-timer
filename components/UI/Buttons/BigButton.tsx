import styles from "../../../styles/BigButton.module.css";
import { useState } from "react";

export default function BigButton(props: any) {

  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    props.onClick();
    setClicked(true);
  };
  const animationEndHandler = () => {
    setClicked(false);
  };

  return (
    <div className="w-60 h-20 cursor-pointer bg-gray-200 rounded-lg">
      {/* Base */}
      {/* <button className="text-3xl font-bold w-60 h-20 cursor-pointer bg-gray-100 rounded-lg transition-all -translate-y-1 hover:-translate-y-0.5 "> */}
      <button
        onClick={clickHandler}
        className={`${styles["BigButton"]} ${clicked ? styles["clicked"] : ""}`}
        title={props.title || ""}
        id={styles[props.id]}
        onAnimationEnd={animationEndHandler}
      >
        {props.isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}

// .BigButton {
//   font-size: 2.3em;
//   font-weight: bold;
//   width: 15rem;
//   height: 5rem;
//   cursor: pointer;

//   background-color: #eee;
//   border: none;
//   border-radius: 5%;

//   transform: translateY(-5px);
// }

// .BigButton:hover {
//   transition: all 250ms ease;
//   transform: translateY(-4px);
// }

// .clicked {
//   animation-name: hoverBounce;
//   animation-timing-function: ease;
//   animation-duration: 500ms;
// }

// @keyframes hoverBounce {
//   0% {
//     transform: translateY(-5px);
//   }
//   50% {
//     transform: translateY(-0px);
//   }
//   100% {
//     transform: translateY(-5px);
//   }
// }

// .base {
//   width: 15rem;
//   height: 5rem;
//   cursor: pointer;

//   background-color: #ddd;
//   border-radius: 5%;
// }
