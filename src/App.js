import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineFileAdd,
  AiOutlineProfile,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
// import Login from './components/Login';

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState([]);
  const [addButton, setaddButton] = useState(false);

  // Date
  const today = new Date();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, dateOptions);
  
  /* add task function*/
  function addTask() {
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const todoAddDate = today.toLocaleTimeString([], timeOptions);
  
    const taskAdded = {
      id: Math.floor(Math.random() * 2000),
      value: newTask,
      completed: false,
      time: todoAddDate,
    };
  
    setTasks((previousTasks) => [...previousTasks, taskAdded]);
    setNewTask("");
    setaddButton(false);
  }

  console.log(tasks);
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
  // function deleteTodos() {
  //   setTasks(tasks.filter((todo) => !todo.completed));
  // }

  // addbutton
  function plusButton() {
    setaddButton(true);
  }

  return (
    <div className="responsive flex justify-center  items-center bg-cyan-100 min-h-screen">
      {/* <Login /> */}
      <div
        className={`w-screen  flex justify-center items-center ${
          modal ? "blur-sm" : ""
        }`}
      >
        <div className=" min-w-[40%]">
          <div className="bg-gradient-to-r from-cyan-300 to-blue-400/75 p-10 rounded-t-xl">
            {/* Title */}
            <h1 className="text-2xl text-white">{formattedDate}</h1>
          </div>

          {/* lists of the entered tasks */}

          <div className="flex flex-col z-20">
            {tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className=" flex relative last:rounded-b-xl pl-10 border-l-8 border-transparent hover:border-cyan-300  shadow-xl shadow-cyan-200 items-center mb-1 justify-between  bg-white py-5 px-10"
                >
                  <div>
                    <div className="flex flex-col ">
                      <span className="text-gray-400 text-xl">{task.time}</span>
                      <h2
                        className={`${
                          task.completed ? "line-through text-gray-300" : ""
                        }   text-xl text-gray-600`}
                      >
                        {task.value}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center group ">
                    <button
                      onClick={() => modalBtn(task)}
                      className="absolute text-lg p-3 border-2 border-transparent bg-white shadow-lg rounded-full right-28 hidden group-hover:!flex hover:scale-110 "
                    >
                      <AiOutlineEdit className="text-cyan-400" />
                    </button>
                    <span className="absolute w-20 h-20 right-9 "></span>

                    <button
                      onClick={() => completedTasks(task.id)}
                      className="absolute text-lg p-3 border-2 border-transparent bg-white shadow-lg rounded-full -top-8  hidden group-hover:!flex  hover:scale-110 "
                    >
                      <AiOutlineCheck className="text-cyan-400" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="absolute text-lg p-3 border-2 border-transparent bg-white shadow-lg rounded-full -bottom-8 hidden group-hover:!flex z-50 hover:scale-110"
                    >
                      <AiOutlineDelete className="text-cyan-400" />
                    </button>

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt=""
                      className="w-14 group"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-3 flex-col items-center">
            <button
              className={`text-lg border-2 rounded-full border-transparent shadow-lg  p-4 bg-white ${
                addButton ? "!hidden" : ""
              }`}
              onClick={plusButton}
            >
              <AiOutlinePlus className="text-cyan-400" />
            </button>
            <div
              className={`relative hidden  items-center w-full opacity-0  ${
                addButton ? "animate-wiggle !flex !opacity-100" : ""
              } `}
            >
              <input
                type="text"
                placeholder="Enter a new task!"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className={`border-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold outline-none w-full placeholder:text-cyan-400 text-gray-600 ${
                  addButton ? "animate-opacity" : ""
                }`}
              />
              <button
                onClick={() => addTask()}
                className={`absolute right-0 pr-4 text-cyan-400   ${
                  addButton ? "animate-opacity " : ""
                }`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute ${modal ? "block" : "hidden"} `}>
        <div className="border-2 border-transparent shadow-lg px-20 py-10 bg-white relative rounded-2xl">
          <AiOutlineClose
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={() => setModal(false)}
          />
          <h2 className="absolute top-2 left-2 text-xl font-bold text-cyan-300">
            Edit Todo
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold mr-2 line-through text-gray-300">
              {edit.value}
            </span>
            <span className="text-xl font-bold text-cyan-300">=</span>
            <div className="relative flex">
              <input
                type="text"
                value={edit.value}
                onChange={(e) => editTask(e.target.value)}
                placeholder="Update the task!"
                className="border-2 ml-2 rounded-2xl border-transparent shadow-lg py-2 px-4 text-xl font-bold text-gray-600 outline-cyan-300"
              />
              <button
                onClick={() => change()}
                className="absolute text-xl right-4 pl-2 h-full rounded-2xl text-cyan-300 "
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

// </div>

// {
//    <button onClick={() => completedTasks(task.id)}>
//                       <AiOutlineCheck />
//                     </button>

//                     <button onClick={deleteTodos}>delete completed</button>
// }
