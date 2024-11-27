import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

const App = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('todoLists');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }, [lists]);

  const addList = () => {
    setLists([...lists, { id: Date.now(), name: '', todos: [], position: { x: 50, y: 50 } }]);
  };

  const removeList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <div className="app-container">
      {lists.length === 0 && (
        <div className="get-started">
          <p>Get started here</p>
          <div className="arrow">⬇️</div>
        </div>
      )}
      <button className="add-list-button" onClick={addList}>
        Add New List
      </button>
      {lists.map((list) => (
        <TodoList key={list.id} list={list} setLists={setLists} removeList={removeList} />
      ))}
    </div>
  );
};

export default App;
