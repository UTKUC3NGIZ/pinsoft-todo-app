import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { BsFillMoonFill, BsSun } from "react-icons/bs";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState([]);

  const [isDarkMode, setDarkMode] = useState(false);

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

  /* to complete a task */
  function completedTasks(id) {
    const newList = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newList);
  }

  /* Modal */
  function modalBtn(task) {
    setModal(!modal);
    setEdit(task);
  }
  /* editing existing tasks */
  function editTask(e) {
    setEdit({ ...edit, value: e });
  }
  // change Todo
  function change() {
    const changeTodo = tasks.map((task) =>
      task.id === edit.id ? { ...task, value: edit.value } : task
    );
    setTasks(changeTodo);
    setModal(false);
  }
  function deleteTodos() {
    setTasks(tasks.filter((todo) => !todo.completed));
  }

  // dark mode

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <div className="responsive flex justify-center items-center">
      <div
        className={`w-screen h-screen relative flex justify-center items-center ${
          modal ? "blur-sm" : ""
        }`}
      >
        <div className="absolute">
          <div className="flex items-center justify-between mb-10">
            {/* Title */}
            <h1 className="text-4xl font-bold ">Todo List</h1>
            <button onClick={toggleDarkMode} className=" text-xl">
              <BsSun />
            </button>
          </div>
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
                  <div className="flex">
                    <button
                      onClick={() => modalBtn(task)}
                      className="hover:scale-150 text-xl delay-100 mr-2"
                    >
                      <AiOutlineEdit />
                    </button>
                    <h2
                      className={`${
                        task.completed ? "line-through" : ""
                      }  font-bold text-xl`}
                    >
                      {task.value}
                    </h2>
                  </div>

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
            <button
              onClick={deleteTodos}
              className=" text-xl right-4 pl-2 border-2 border-black h-full rounded-2xl"
            >
              delete completed
            </button>
          </div>
        </div>
      </div>
      <div className={`absolute ${modal ? "block" : "hidden"} `}>
        <div className="border-2 border-black px-20 py-10 bg-white relative rounded-2xl">
          <AiOutlineClose
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={() => setModal(false)}
          />
          <h2 className="absolute top-2 left-2 text-xl font-bold">Edit Todo</h2>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold mr-2 line-through">
              {edit.value}
            </span>
            <span className="text-xl font-bold">=</span>
            <div className="relative flex">
              <input
                type="text"
                value={edit.value}
                onChange={(e) => editTask(e.target.value)}
                placeholder="Update the task!"
                className="border-2 ml-2 rounded-2xl border-black py-2 px-4 text-xl font-bold"
              />
              <button
                onClick={() => change()}
                className="absolute text-xl right-4 pl-2 border-l-2 border-black h-full rounded-2xl"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
