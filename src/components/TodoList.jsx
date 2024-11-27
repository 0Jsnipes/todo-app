import React, { useState, useRef } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

const TodoList = ({ list, setLists, removeList }) => {
  const [name, setName] = useState(list.name);
  const listRef = useRef();

  const startDrag = (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT" || e.target.tagName === "SPAN") {
      e.stopPropagation(); // Prevent dragging when interacting with buttons or inputs
      return;
    }

    listRef.current.style.position = "absolute";
    listRef.current.style.zIndex = 1000;

    const moveAt = (pageX, pageY) => {
      listRef.current.style.left = pageX - listRef.current.offsetWidth / 2 + "px";
      listRef.current.style.top = pageY - listRef.current.offsetHeight / 2 + "px";
    };

    const onMouseMove = (event) => moveAt(event.pageX, event.pageY);

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );

    moveAt(e.pageX, e.pageY);
  };

  const stopDrag = () => {
    listRef.current.style.zIndex = 1;
  };

  return (
    <div
      className="list-container"
      ref={listRef}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      style={{
        left: list.position.x,
        top: list.position.y,
      }}
    >
      <input
        type="text"
        className="todo-input"
        placeholder="List Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
