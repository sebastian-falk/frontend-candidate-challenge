import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoList } from "./components/TodoList";
import { AddTodoListItem } from "./components/AddTodoListItem";

import "./styles.scss";

export default function App() {
  const [todos, setTodos] = useState([
    { id: uuidv4(), subject: "Buy milk", done: true },
    { id: uuidv4(), subject: "Buy bread", done: false },
  ]);

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <h1>TODO</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodoListItem setTodos={setTodos} />
    </div>
  );
}
