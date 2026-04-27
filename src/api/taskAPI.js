const BASE_URL = "https://easydev.club/api/v1";
export const getTodos = (filter) => {
  const url = filter
    ? `${BASE_URL}/todos?filter=${filter}`
    : `${BASE_URL}/todos`;

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Ошибка при получении задач");
    return res.json();
  });
};

export const addTodo = (todo) =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при добавлении задачи");
    return res.json();
  });

export const updateTodo = (todoId, newTodoObject) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodoObject),
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при обновлении задачи");
    return res.json();
  });

export const deleteTodo = (todoId) =>
  fetch(`${BASE_URL}/todos/${todoId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Ошибка при удалении задачи");
  });
