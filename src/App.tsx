import { useState } from "react";
import "./App.css";
import { TaskInput } from "./components/component.Input/TaskInput";
import TaskItem from "./components/component.TaskItem/TaskItem";
import { type Task } from "./components/component.TaskItem/types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category: "Geral", // por enquanto fixo
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function handleToggle(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="App">
      <h1>Minhas Tarefas</h1>

      {/* Input controlado */}
      <TaskInput onAddTask={handleAddTask} />

      <h2>Lista de Tarefas</h2>
      <div>
        {tasks.length === 0 && <p>Nenhuma tarefa adicionada ainda.</p>}

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
