import React from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../../store/timerReducer";

import styles from "./AddTaskMenu.module.css";

const AddTaskMenu = (props) => {
  const dispatch = useDispatch();

  const flipSpaceEnable = () => {dispatch(timerActions.flipSpaceEnable())};

  return (
    <div className={styles.container}>
      <form>
        <span className={styles.firstLine}>
          <label htmlFor="name">Task: </label>
          <input
            onChange={(event) =>
              props.setInputData({
                ...props.inputData,
                name: event.target.value,
              })
            }
            onBlur={flipSpaceEnable}
            onFocus={flipSpaceEnable}
            onKeyDown={(event) => event.key === "Enter" ? props.onEnter() : null}
            value={props.inputData.name}
            id="name"
            className={styles.name}
          />
          <label htmlFor="size">Est. Pomos</label>
          <input
            onChange={(event) =>
              props.setInputData({
                ...props.inputData,
                size: event.target.value,
              })
            }
            onBlur={flipSpaceEnable}
            onFocus={flipSpaceEnable}
            onKeyDown={(event) => event.key === "Enter" ? props.onEnter() : null}
            value={props.inputData.size}
            id="size"
            className={styles.size}
            type="number"
          />
        </span>
        <label htmlFor="description">Description</label>
        <input
          onChange={(event) =>
            props.setInputData({
              ...props.inputData,
              description: event.target.value,
            })
          }
          onBlur={flipSpaceEnable}
          onFocus={flipSpaceEnable}
          onKeyDown={(event) => event.key === "Enter" ? props.onEnter() : null}
            value={props.inputData.description}
            className={styles.description}
          id="description"
        />
      </form>
    </div>
  );
};

export default AddTaskMenu;
