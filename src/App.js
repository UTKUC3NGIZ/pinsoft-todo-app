import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineFileAdd,
  AiOutlineProfile,
} from "react-icons/ai";
import { BsFillMoonFill, BsSun } from "react-icons/bs";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, value: "deneme", completed: false },
  ]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState([]);
  const [clickedTime, setClickedTime] = useState(null);

  const [isDarkMode, setDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  //..
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Date
  const today = new Date();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, dateOptions);

  /* add task function*/
  function addTask() {
    const taskAdded = {
      id: Math.floor(Math.random() * 2000),
      value: newTask,
      completed: false,
    };
    setClickedTime(today.toLocaleTimeString());

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
    <div className="responsive flex justify-center items-center bg-cyan-100">
      <div
        className={`w-screen h-screen relative flex justify-center items-center ${
          modal ? "blur-sm" : ""
        }`}
      >
        <div className="absolute min-w-[50%]">
          <div className="bg-gradient-to-r from-cyan-300 to-blue-400/75 p-10 rounded-t-xl">
            {/* Title */}
            <h1 className="text-2xl text-white">{formattedDate}</h1>
            {/* <button onClick={toggleDarkMode} className=" text-xl">
              {
                isDarkMode ?<BsSun /> :<BsFillMoonFill/>
              }
            </button> */}
          </div>

          {/* lists of the entered tasks */}

          <div className="flex flex-col">
            {tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className=" flex last:rounded-b-xl pl-10 hover:scale-110  shadow-xl shadow-cyan-200 items-center mb-1 justify-between border-2 border-transparent bg-white py-7 "
                >
                  <div>
                    <div className="flex flex-col ">
                      <span className="text-gray-400 text-xl">
                        {clickedTime}
                      </span>
                      <h2
                        className={`${
                          task.completed ? "line-through" : ""
                        }   text-xl text-gray-600`}
                      >
                        {task.value}
                      </h2>
                    </div>
                  </div>
                  <div className="group hover:scale-110 flex">
                    <img
                    src="foto.png"
                    alt="Profil Resmi"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    />
                  {isHovered && (
                   <div>
                   <li className="group hover:scale-110 flex"> <button onClick={() => addTask()}>
                    <AiOutlineFileAdd />
                    </button></li>
                    <li className="group hover:scale-110 flex"><button onClick={() => modalBtn(task)}>
                      <AiOutlineEdit />
                    </button></li>
                    <li className="group hover:scale-110 flex"><button onClick={() => deleteTask(task.id)}>
                      <AiOutlineDelete />
                    </button></li>
                    </div>
                  )}
                  </div>

                  <div className="flex "></div>
                </div>
              );
            })}
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

// <div >

// <div className="inline-flex relative items-center mb-8">
//   <input
//     type="text"
//     placeholder="Enter a new task!"
//     value={newTask}
//     onChange={(e) => setNewTask(e.target.value)}
//     className="border-2 rounded-2xl border-black py-2 px-4 text-xl font-bold"
//   />

// </div>

// </div>

{
  /* <button onClick={() => completedTasks(task.id)}>
                      <AiOutlineCheck />
                    </button>
            
                 
                    <button onClick={deleteTodos}>delete completed</button> */
}
