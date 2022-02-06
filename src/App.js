import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = await res.json();

    return data;
  };
  //Fetch Task
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:3001/tasks/${id}`);
  //   const data = await res.json();

  //   return data;
  // };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // when not using backend - use this to create id
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };
  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // const toggleReminder = async (id) => {
  //   const taskToToggle = await fetchTask(id);
  //   console.log({ taskToToggle });
  //   const updTask = {
  //     ...taskToToggle,
  //     reminder: !taskToToggle.reminder,
  //     foo: "bar",
  //   };

  //   const res = await fetch(`http://localhost:3001/tasks/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-type": "application.json",
  //     },
  //     body: JSON.stringify(updTask),
  //   });

  //   const data = await res.json();

  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, reminder: data.reminder } : task
  //     )
  //   );
  // };

  return (
    <div className="container">
      <Header
        onAdd={() => setshowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks to Show"
      )}
    </div>
  );
}

export default App;
