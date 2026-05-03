import { useEffect, useState } from "react";
import { getTodos } from "../api/taskAPI";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoMenu from "../components/TodoMenu";

const TodosPage = () => {
  const [todoCounts, setTodoCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [currentFilter, setCurrentFilter] = useState("all");
  const [todos, setTodos] = useState([]);

  const updateTodos = async () => {
    try {
      const response = await getTodos(currentFilter);
      setTodos(response.data);
      setTodoCounts({
        all: response.info.all,
        inWork: response.info.inWork,
        completed: response.info.completed,
      });
    } catch (error) {
      alert("Произошла ошибка! Попробуйте снова");
    }
  };

  useEffect(() => {
    updateTodos();
  }, [currentFilter]);

  return (
    <div className="todo">
      <h1 className="todo_title">Todo List</h1>
      <AddTodoForm updateTodos={updateTodos} />
      <TodoMenu
        todosAllCount={todoCounts.all}
        todosInWorkCount={todoCounts.inWork}
        todosCompletedCount={todoCounts.completed}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <TodoList
        todos={todos}
        updateTodos={updateTodos}
      />
    </div>
  );
};

export default TodosPage;
