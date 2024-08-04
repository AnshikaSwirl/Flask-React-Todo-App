from flask import request, jsonify
from config import app

# In-memory storage for todos
todos = []
next_id = 1

# Route to get all todos
@app.route("/todos", methods=["GET"])
def get_todos():
    """
    This route handles GET requests to fetch all todos.
    Returns a JSON response with the list of todos.
    """
    return jsonify({"todos": todos})

# Route to create a new todo
@app.route("/todos", methods=["POST"])
def create_todo():
    """
    This route handles POST requests to create a new todo.
    Expects a JSON body with a 'text' field.
    Returns a success message upon creation.
    """
    global next_id
    text = request.json.get("text")

    if not text:
        return jsonify({"message": "Todo text is required"}), 400

    new_todo = {"id": next_id, "text": text}
    todos.append(new_todo)
    next_id += 1

    return jsonify({"message": "Todo created!"}), 201

# Route to update an existing todo
@app.route("/todos/<int:todo_id>", methods=["PUT"])
def update_todo(todo_id):
    """
    This route handles PUT requests to update an existing todo.
    Expects a JSON body with a 'text' field.
    Returns a success message upon updating, or an error if the todo is not found.
    """
    for todo in todos:
        if todo["id"] == todo_id:
            todo["text"] = request.json.get("text", todo["text"])
            return jsonify({"message": "Todo updated."}), 200

    return jsonify({"message": "Todo not found"}), 404

# Route to delete an existing todo
@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    """
    This route handles DELETE requests to delete an existing todo.
    Returns a success message upon deletion.
    """
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return jsonify({"message": "Todo deleted!"}), 200

if __name__ == "__main__":
    app.run(debug=True)
