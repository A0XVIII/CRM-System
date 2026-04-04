import { useEffect, useState } from "react";
import { updateTodo, deleteTodo } from "../api/taskAPI";

const TodoItem = (props) => {
  const {
    className = "",
    id,
    title,
    isDone,
    updateTodos,
    isEditing,
    todos,
    setEditingTodoId,
  } = props;

  const [newTodoTitle, setNewTodoTitle] = useState(title);

  useEffect(() => {
    if (!isEditing) {
      setNewTodoTitle(title);
    }
  }, [title, isEditing]);

  const onInput = (event) => {
    const { value } = event.target;
    setNewTodoTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAdmitClick();
  };

  const handleAdmitClick = async () => {
    const newTitle = newTodoTitle;
    if (newTitle.trim() === "") {
      alert("Введите значение");
      return;
    }
    if (newTitle.trim().length < 2 || newTitle.trim().length > 64) {
      alert("Введите значение от 2 до 64 символов");
      return;
    }
    const originalTodo = todos.find((todo) => todo.id === id);
    const originalTitle = originalTodo.title;

    if (originalTitle === newTitle) {
      handleCloseClick();
      return;
    }

    try {
      await updateTodo(id, {
        title: newTitle,
        isDone: isDone,
      });

      handleCloseClick();
      await updateTodos();
    } catch (error) {
      alert("Не удалось отредактировать задачу. Пожалуйста, попробуйте снова.");
      handleEditClick(id);
      await updateTodos();
    }
  };

  const handleCloseClick = () => {
    setNewTodoTitle(title);
    setEditingTodoId(null);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTodo(id);
      await updateTodos();
    } catch (error) {
      await updateTodos();
    }
  };

  const handleToggleComplete = async (event) => {
    const newIsDone = event.target.checked;

    try {
      await updateTodo(id, {
        title: title,
        isDone: newIsDone,
      });

      await updateTodos();
    } catch (error) {
      await updateTodos();
    }
  };

  const handleEditClick = (todoId) => {
    setEditingTodoId(todoId);
  };

  const currentTodo = todos.find((todo) => todo.id === id) || {
    title,
    isDone,
  };
  const displayTitle = currentTodo.title;
  const displayIsDone = currentTodo.isDone;

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={displayIsDone}
        className="todo-item_checkbox"
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <>
          <form className="todo-item_edit-form" onSubmit={handleSubmit}>
            <input
              className="todo-item_field-edit"
              placeholder="Редактирование задачи..."
              value={newTodoTitle}
              onChange={onInput}
            />
          </form>
          <button
            className="first"
            title="Подтвердить"
            aria-label="Подтвердить"
            id={id}
            onClick={handleAdmitClick}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </button>
          <button
            className="second"
            title="Закрыть"
            aria-label="Закрыть"
            id={id}
            onClick={handleCloseClick}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </>
      ) : (
        <>
          <label
            className={`todo-item_label ${displayIsDone ? "completed" : ""}`}
            htmlFor={id}
            tabIndex={0}
          >
            {displayTitle}
          </label>
          <button
            className="first"
            title="Редактировать"
            aria-label="Редактировать"
            id={id}
            onClick={() => handleEditClick(id)}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button
            className="second"
            title="Удалить"
            aria-label="Удалить"
            id={id}
            onClick={handleDeleteClick}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
