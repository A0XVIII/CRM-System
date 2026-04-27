import { useState } from "react";
import { addTodo } from "../api/taskAPI";

export default function AddTodoForm({ updateTodos }) {
  const [todoTitle, setTodoTitle] = useState("");

  const validateValue = (value) => {
    if (value.trim() === "") {
      alert("Введите значение");
      return false;
    }
    if (value.trim().length < 2 || value.trim().length > 64) {
      alert("Введите значение от 2 до 64 символов");
      return false;
    }
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
      <input
        onChange={(e) => setTodoTitle(e.target.value)}
        type="text"
        placeholder="Добавьте задачу"
        value={todoTitle}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
}
