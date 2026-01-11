import { useState } from "react";

export default function TodoForm() {
  const [value, setValue] = useState(""); // хранение значения input

  const validateValue = (value) => {
    if (value.trim() === "") {
      alert("Введите значение");
      return false;
    }
    if (value.trim().length < 2 || value.trim().length > 64) {
      alert("Введите значение от 2 до 64 символов");
      return false;
    }
    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateValue(value)) return;

    //отправка на бэкенд
    console.log('Отправлено', value)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Добавьте задачу"
        value={value}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
}
