import React, { useState } from "react";

const TodoInput = ({ list, setLists }) => {
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      setLists((prevLists) =>
        prevLists.map((l) =>
          l.id === list.id ? { ...l, todos: [...l.todos, { id: Date.now(), text, completed: false }] } : l
        )
      );
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger addTodo on Enter
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

export default TodoInput;
