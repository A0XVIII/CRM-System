import { useState } from "react";
import { addTodo } from "../api/taskAPI";

export default function AddTodoForm({ updateTodos }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [error, setError] = useState ("");

  const validateValue = (value) => {
    if (value.trim() === "") {
      setError("Введите значение");
      return false;
    }
    if (value.trim().length < 2 || value.trim().length > 64) {
      setError("Введите значение от 2 до 64 символов");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateValue(todoTitle)) return;

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
