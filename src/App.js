import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Gym",
      day: "Jan 31 at 3:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Shower",
      day: "Jan 31 at 3:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Coding",
      day: "Jan 31 at 3:30pm",
      reminder: true,
    },
    {
      id: 4,
      text: "Lunch",
      day: "Jan 31 at 3:30pm",
      reminder: true,
    },
  ]);

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
