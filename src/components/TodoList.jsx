import React, { useState, useRef } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const TodoList = ({ list, setLists, removeList }) => {
  const [isEditing, setIsEditing] = useState(!list.name); // Start in edit mode if no name is set
  const [name, setName] = useState(list.name || "");
  const listRef = useRef();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    setLists((prevLists) =>
      prevLists.map((l) => (l.id === list.id ? { ...l, name } : l))
    );
  };

  const handleEditName = (e) => {
    e.stopPropagation(); // Prevent dragging the box
    setIsEditing(true);
  };

  const startDrag = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "SPAN" ||
      e.target.classList.contains("list-name")
    ) {
      e.stopPropagation(); // Prevent dragging when interacting with interactive elements
      return;
    }

    const touch = e.touches ? e.touches[0] : e;
    const initialX = touch.clientX - listRef.current.offsetLeft;
    const initialY = touch.clientY - listRef.current.offsetTop;

    const moveAt = (event) => {
      const touchMove = event.touches ? event.touches[0] : event;
      listRef.current.style.left = `${touchMove.clientX - initialX}px`;
      listRef.current.style.top = `${touchMove.clientY - initialY}px`;
    };

    document.addEventListener(e.touches ? "touchmove" : "mousemove", moveAt);

    document.addEventListener(
      e.touches ? "touchend" : "mouseup",
      () => {
        document.removeEventListener(e.touches ? "touchmove" : "mousemove", moveAt);
      },
      { once: true }
    );
  };

  return (
    <div
      className="list-container"
      ref={listRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        left: list.position.x,
        top: list.position.y,
      }}
    >
      {isEditing ? (
        <input
          type="text"
          className="todo-input"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameSubmit} // Submit the name when input loses focus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNameSubmit();
            }
          }}
          autoFocus
        />
      ) : (
        <h3
          className="list-name"
          onClick={handleEditName}
          style={{
            cursor: "pointer",
            marginBottom: "10px",
            userSelect: "none", // Prevent accidental text selection
          }}
        >
          {name || "Untitled List"}
        </h3>
      )}
      <TodoInput list={list} setLists={setLists} />
      {list.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} listId={list.id} setLists={setLists} />
      ))}
      <button className="remove-list-button" onClick={() => removeList(list.id)}>
        Remove List
      </button>
    </div>
  );
};

export default TodoList;
