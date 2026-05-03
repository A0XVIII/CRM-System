import { useEffect, useState } from "react";
import { validateTodoTitle } from "../utils/validateTodoTitle";
import { updateTodo, deleteTodo } from "../api/taskAPI";
import { CheckIcon } from "../assets/CheckIcon";
import { CloseIcon } from "../assets/CloseIcon";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";

const TodoItem = (props) => {
  const { className = "", id, title, isDone, updateTodos } = props;
  const [error, setError] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

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
    if (!validateTodoTitle(newTitle, setError)) return;
    if (title === newTitle) {
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
      handleEditClick();
      await updateTodos();
    }
  };

  const handleCloseClick = () => {
    setNewTodoTitle(title);
    setIsEditing(false);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <li className={`todo-item ${className}`}>
      <input
        type="checkbox"
        id={`todo-checkbox-${id}`}
        checked={isDone}
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              className="first"
              title="Подтвердить"
              aria-label="Подтвердить"
              type="submit"
              style={{ background: "#4caf7d" }}
            >
              <CheckIcon />
            </button>
          </form>
          <button
            className="second"
            title="Закрыть"
            aria-label="Закрыть"
            onClick={handleCloseClick}
            type="button"
          >
            <CloseIcon />
          </button>
        </>
      ) : (
        <>
          <label
            className={`todo-item_label ${isDone ? "completed" : ""}`}
            htmlFor={`todo-checkbox-${id}`}
            tabIndex={0}
          >
            {title}
          </label>
          <button
            className="first"
            title="Редактировать"
            aria-label="Редактировать"
            onClick={handleEditClick}
            type="button"
          >
            <EditIcon />
          </button>
          <button
            className="second"
            title="Удалить"
            aria-label="Удалить"
            onClick={handleDeleteClick}
            type="button"
          >
            <DeleteIcon />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
