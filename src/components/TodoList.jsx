import TodoItem from "./TodoItem";

const TodoList = ({
  todos = [],
  editingTodoId,
  setEditingTodoId,
  updateTodos,
}) => {
  if (todos.length === 0) {
    return <p>Задач нет</p>;
  }

  return (
    <ul className="todo_list">
      {todos.map((todo) => (
        <TodoItem
          className="todo__item"
          key={todo.id}
          {...todo}
          isEditing={editingTodoId === todo.id}
          setEditingTodoId={setEditingTodoId}
          updateTodos={updateTodos}
          todos={todos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
