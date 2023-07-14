import { createContext, useContext, useState } from "react";
import { executeQuery } from "../api/api.js";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext)
  if(!context){
    throw new Error("useTasks must be used within a TaskContextProvider");
  }
  return context;
}

export const TaskContextProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);

  // async function loadTasks() {
  //   const response = await getListTask();
  //   setTasks(response.data);
  // }

  // async function handleDelete (id) {
  //   try {
  //     const response = await deleteTask(id)
  //     setTasks(tasks.filter(task => task.id !== id))
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function handleCreate (task) {
  //   try {
  //     const response = await createTask(task);
  //     // setTasks([...tasks, response.data])
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async function loadTaskDetail (id) {
  //   try{
  //     const response = await getTaskDetail(id)
  //     return response.data
  //   } catch (error){
  //     console.error(error);
  //   }
  // }

  // async function handleUpdate (id, task) {
  //   try{
  //     const response = await updateTask(id, task)
  //   } catch(error){
  //     console.error(error);
  //   }
  // }

  // async function toggleTaskDone (id) {
  //   try {
  //     const taskFound = tasks.find((task) => task.id === id); 
  //     await toggleTask(id, taskFound.done === 0 ? true : false)
  //     tasks.map(task => {
  //       task.id === id ? task.done = task.done === 0 ? 1 : 0 : task.done
  //       setTasks([...tasks])
  //     })
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return <TaskContext.Provider value={{ tasks }}>
    {children}
    </TaskContext.Provider>
}