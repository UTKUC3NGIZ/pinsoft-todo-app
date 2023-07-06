import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  /* add task function*/
  function addTask() {
    const taskAdded = {
      id: Math.floor(Math.random() * 2000),
      value: newTask,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, taskAdded]);

    setNewTask("");
  }

  /* delete task function, parameter: id */
  function deleteTask(id) {
    /* we add the new array all the tasks whose id's are different*/
    const newList = tasks.filter((task) => task.id !== id);
    setTasks(newList);
  }

  /* editing existing tasks */
  function editTask() {}

  /* to complete a task */
  function completedTasks(id) {
    const newList = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newList);
  }

  return (
    <div className="w-screen h-screen relative flex justify-center items-center">
      <div className="absolute">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-10">Todo List</h1>

        {/* Entering new tasks */}
        <div className="inline-flex relative items-center mb-8">
          <input
            type="text"
            placeholder="Enter a new task!"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border-2 rounded-2xl border-black py-2 px-4 text-xl font-bold"
          />

          {/* button for adding tasks */}
          <button
            onClick={() => addTask()}
            className="absolute text-xl right-4 pl-2 border-l-2 border-black h-full rounded-2xl"
          >
            Add
          </button>
        </div>

        {/* lists of the entered tasks */}

        <div className="flex flex-col">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className="flex mb-5 items-center justify-between border-2 border-black py-2 px-4 rounded-2xl "
              >
                <h2
                  className={`${
                    task.completed ? "line-through" : ""
                  }  font-bold text-xl`}
                >
                  {task.value}
                </h2>
                <div className="flex ">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="hover:scale-150 text-xl mr-5 delay-100"
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    onClick={() => completedTasks(task.id)}
                    className="hover:scale-150 text-xl delay-100"
                  >
                    <AiOutlineCheck />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
