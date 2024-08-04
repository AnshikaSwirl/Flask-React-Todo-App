import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  // State variables
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/todos");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTodo({});
  };

  // Function to open the modal for creating a new todo
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  // Function to open the modal for editing an existing todo
  const openEditModal = (todo) => {
    if (isModalOpen) return;
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  // Callback function to update the todo list and close the modal
  const onUpdate = () => {
    closeModal();
    fetchTodos();
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <TodoList todos={todos} updateTodo={openEditModal} updateCallback={onUpdate} />
      <button id="create-btn" onClick={openCreateModal}>Create New Todo</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <TodoForm existingTodo={currentTodo} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
