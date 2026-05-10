import { useState } from "react";
import { addTodo } from "../api/taskAPI";
import { validateTodoTitle } from "../utils/validateTodoTitle";

export default function AddTodoForm({ updateTodos }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [error, setError] = useState ("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTodoTitle(todoTitle, setError)) return;

    try {
      await addTodo({ title: todoTitle, isDone: false });
      setTodoTitle("");
      await updateTodos();
    } catch (error) {
      alert("Не удалось добавить задачу. Попробуйте еще раз");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
      <input
        onChange={(e) => setTodoTitle(e.target.value)}
        type="text"
        placeholder="Добавьте задачу"
        value={todoTitle}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <button type="submit">Добавить задачу</button>
    </form>
  );
}
