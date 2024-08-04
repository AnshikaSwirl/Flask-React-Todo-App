import { useState, useEffect } from "react";

function TodoForm({ existingTodo, updateCallback }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (existingTodo && existingTodo.text) {
      setText(existingTodo.text);
    } else {
      setText("");
    }
  }, [existingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingTodo && existingTodo.id ? "PUT" : "POST";
    const url = existingTodo && existingTodo.id 
      ? `http://127.0.0.1:5000/todos/${existingTodo.id}` 
      : "http://127.0.0.1:5000/todos";
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Result:', result);
      updateCallback();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Todo:
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default TodoForm;
