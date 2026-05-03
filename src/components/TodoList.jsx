import TodoItem from "./TodoItem";

const TodoList = ({ todos = [], updateTodos }) => {
  if (todos.length === 0) {
    return <p>Задач нет</p>;
  }

  return (
    <ul className="todo_list">
      {todos.map((todo) => (
        <TodoItem
          className="todo_item"
          key={todo.id}
          {...todo}
          updateTodos={updateTodos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
