const TodoMenu = ({
  currentFilter,
  onFilterChange,
  todosAllCount,
  todosInWorkCount,
  todosCompletedCount,
}) => {
  return (
    <nav className="todo_menu">
      <ul className="todo_menu-list">
        <li className="todo_menu-item">
          <button
            className={`todo_menu-link ${currentFilter === "all" ? "is-active" : ""}`}
            onClick={() => onFilterChange("all")}
          >
            Все ({todosAllCount})
          </button>
        </li>
        <li className="todo_menu-item">
          <button
            className={`todo_menu-link ${currentFilter === "inWork" ? "is-active" : ""}`}
            onClick={() => onFilterChange("inWork")}
          >
            В работе ({todosInWorkCount})
          </button>
        </li>
        <li className="todo_menu-item">
          <button
            className={`todo_menu-link ${currentFilter === "completed" ? "is-active" : ""}`}
            onClick={() => onFilterChange("completed")}
          >
            Сделано ({todosCompletedCount})
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TodoMenu;
