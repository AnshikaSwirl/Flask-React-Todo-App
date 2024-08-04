import React from "react";

function TodoList({ todos, updateTodo, updateCallback }) {
  const deleteTodo = async (id) => {
    await fetch(`http://127.0.0.1:5000/todos/${id}`, {
      method: "DELETE",
    });
    updateCallback();
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <div>
              <button id = "edit-btn" onClick={() => updateTodo(todo)}>Edit</button>
              <button id = "delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
