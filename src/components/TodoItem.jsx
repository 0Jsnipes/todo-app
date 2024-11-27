import React from "react";

const TodoItem = ({ todo, listId, setLists }) => {
  const toggleTodo = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((t) =>
                t.id === todo.id ? { ...t, completed: !t.completed } : t
              ),
            }
          : list
      )
    );
  };

  return (
    <div
      className="todo-item"
      onClick={toggleTodo}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
        style={{ pointerEvents: "none" }} // Prevent click conflicts between checkbox and parent
      />
      <span>{todo.text}</span>
    </div>
  );
};

export default TodoItem;
