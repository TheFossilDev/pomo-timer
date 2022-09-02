import React, { useState } from "react";

import AddTaskButton from "./AddTask/AddTaskButton";
import AddTaskMenu from "./AddTask/AddTaskMenu";
import PomoTask from "./PomoTask";
import PrimaryTaskBin from "./PrimaryTaskBin";

// All new features to-do list:
// TODO: Set active task and display at top of timer

// TODO: Handle edit menu of tasks and save changes on save
// TODO: Durations setting with actual vs estimated
// TODO: Remove display of total pomos completed
// TODO: Convert minimal styles to Tailwind to make styling reflect prev version
// TODO: Add basic input validation to both forms



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

  const getTaskByID = (id) => {
    taskList.forEach(element => {
      if (element.id === id) {
        return element;
      }
    });
    return null;
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

  const setTaskActive = (task) => {
    props.setActiveTask(task);
  };

  return (
    <div>
      <div>
        <PrimaryTaskBin task={props.activeTask} height={TASK_HEIGHT} />
        <h2>Tasks</h2>
      </div>
      <div>
        {taskList.map((task) => (
          <PomoTask key={task.id} id={task.id} task={task} height={TASK_HEIGHT} removeTask={removeTask} setTaskActive={setTaskActive} />
        ))}
        {taskList.length === 0 ? <p>No tasks yet</p> : null}
      </div>

      <div>
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
