import React, { useState } from "react";

import AddTaskButton from "./AddTask/AddTaskButton";
import AddTaskMenu from "./AddTask/AddTaskMenu";
import PomoTask from "./PomoTask";
import PrimaryTaskBin from "./PrimaryTaskBin";
import styles from "./TaskPanel.module.css";

const getTasksFromLocalstorage = () => {
  const tasks = JSON.parse(localStorage.getItem("Tasks"));
  if (tasks === null || tasks === undefined) {
    return [];
  } else {
    return tasks
  }
};

const TaskPanel = (props) => {
  const TASK_HEIGHT = 16;

  const [taskList, setTaskList] = useState(getTasksFromLocalstorage());
  let [inputData, setInputData] = useState({
    name: "",
    size: "",
    description: "",
  });
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  const addTaskHandler = () => {
    if (addPanelOpen) {
      addTask();
    } else {
      setAddPanelOpen(true);
    }
  };

  const addTask = () => {
    let task = inputData;
    task.id = crypto.randomUUID();
    task.subTasks = []
    setTaskList((taskList) => {
      localStorage.setItem("Tasks", JSON.stringify([...taskList, task]));
      return [...taskList, task];
    });
    setInputData({
      name: "",
      size: "",
      description: "",
    });
  };

  const removeTask = (id) => {
    setTaskList((prevState) => {
      const newState = prevState.filter((task) => task.id !== id);
      localStorage.setItem("Tasks", JSON.stringify(newState));
      return newState;
    })
  };

  return (
    <div className={styles.taskPanelContainer}>
      <div className={styles.headerContainer}>
        <PrimaryTaskBin height={TASK_HEIGHT} />
        <h2 className={styles.header}>Tasks</h2>
      </div>
      <div className={styles.taskList}>
        {taskList.map((task) => (
          <PomoTask key={task.id} id={task.id} task={task} height={TASK_HEIGHT} removeTask={removeTask} />
        ))}
        {taskList.length === 0 ? <p className={styles.emptyList}>No tasks yet</p> : null}
      </div>

      <div className={styles.addTask}>
        <AddTaskButton
          onClick={addTaskHandler}
          addPanelOpen={addPanelOpen}
          setAddPanelOpen={setAddPanelOpen}
        />
        {addPanelOpen ? (
          <AddTaskMenu
            onEnter={addTask}
            inputData={inputData}
            setInputData={setInputData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TaskPanel;
