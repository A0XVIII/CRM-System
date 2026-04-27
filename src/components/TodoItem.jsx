import { useEffect, useState } from "react";
import { validateTodoTitle } from "../utils/validateTodoTitle";
import { updateTodo, deleteTodo } from "../api/taskAPI";
import { CheckIcon } from "../assets/CheckIcon";
import { CloseIcon } from "../assets/CloseIcon";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";

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
  const [error, setError] = useState("");
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
    if (!validateTodoTitle(newTitle, setError)) return;
    const originalTodo = todos.find((todo) => todo.id === id);
    const originalTitle = originalTodo.title;

    if (originalTitle === newTitle) {
      handleCloseClick();
      return;
    }
    EditIcon;
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
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
          <button
            className="first"
            title="Подтвердить"
            aria-label="Подтвердить"
            id={id}
            onClick={handleAdmitClick}
            type="button"
          >
            <CheckIcon />
          </button>
          <button
            className="second"
            title="Закрыть"
            aria-label="Закрыть"
            id={id}
            onClick={handleCloseClick}
            type="button"
          >
            <CloseIcon />
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
            <EditIcon />
          </button>
          <button
            className="second"
            title="Удалить"
            aria-label="Удалить"
            id={id}
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
