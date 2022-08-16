import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./BigButton.module.css";



const BigButton = (props) => {
  const spaceEnable = useSelector((state) => state.timer.spaceEnable);

  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    props.onClick();
    setClicked(true);
  };
  const animationEndHandler = () => {
    setClicked(false);
  };

  const handleSpace = (event) => {
    if (event.key === " " && spaceEnable) {
      event.preventDefault()
      clickHandler();
    } 
  };

  document.onkeydown = handleSpace;
  return (
    <>
      <div className={styles.base}>
        <button
          onClick={clickHandler}
          className={`${styles["BigButton"]} ${
            clicked ? styles["clicked"] : ""
          }`}
          title={props.title || ""}
          id={styles[props.id]}
          onAnimationEnd={animationEndHandler}
        >
          {props.children}
        </button>
      </div>
    </>
  );
};

export default BigButton;
