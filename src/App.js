import React, { useState } from 'react';
import './App.css';

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
  function editTask() {
    
  }

   /* to complete a task */
   function completedTasks(id) {
    const newList = tasks.map((task => task.id === id ? 
      {...task, completed: !task.completed}: task))
    setTasks(newList);
  }
  
  return (
    <div className="app">
      {/* Title */}
      <h1>Tasks To-Do</h1>

      {/* Entering new tasks */}
      <input
        type = "text"
        placeholder = "Enter a new task!"
        value = {newTask}
        onChange = {(e) => setNewTask(e.target.value)}
      />

      {/* button for adding tasks */}
      <button onClick={() => addTask()}>Add</button>

      {/* lists of the entered tasks */}
      <ul> 
        {tasks.map(task => {
          return (
            <li key={task.id}> 
              {task.value}
              <button onClick = {() => deleteTask(task.id)}>  
                DELETE
              </button>
              <button onClick = {() => completedTasks(task.id)}>  
                COMPLETED
              </button>
            </li>
          )
          
        })}
      </ul>
      
    </div>
  );
}

export default App;
