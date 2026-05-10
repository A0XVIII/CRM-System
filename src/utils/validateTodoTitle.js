export const validateTodoTitle = (title, setError) => {
  if (title.trim() === "") {
    setError("Введите значение");
    return false;
  }
  if (title.trim().length < 2 || title.trim().length > 64) {
    setError("Введите значение от 2 до 64 символов");
    return false;
  }
  setError("");
  return true;
};