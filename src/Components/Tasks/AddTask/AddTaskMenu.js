import React from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../../store/timerReducer";

const AddTaskMenu = (props) => {
  const dispatch = useDispatch();

  const flipSpaceEnable = () => {dispatch(timerActions.flipSpaceEnable())};

  return (
    <div>
      <form>
        <span>
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
          id="description"
        />
      </form>
    </div>
  );
};

export default AddTaskMenu;
