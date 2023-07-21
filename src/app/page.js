"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  //tasks = array of {id: string, title: string, completed: boolean}
  const [tasks, setTasks] = useState([]);
  const [count1, setCount1] = useState(0) ;
  const [count2, setCount2] = useState(0) ;

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setCount1(count1+1);
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setCount1(count1-1);
    setTasks(newTasks);
    setCount2(Math.max(count2-1,0));
  };

  const toggleDoneTask = (taskId) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);
    const isTaskcomplete = task.completed;
    task.completed = !task.completed;
    setTasks(newTasks);
    if(task.completed && !isTaskcomplete){
      setCount2(count2+1);
    }else if (!task.completed === isTaskcomplete){
      setCount2(Math.max(count2-1,0));
    }
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({count1}) Done ({count2})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Penpicha Thongkham" studentId="650610795" />
    </div>
  );
}
