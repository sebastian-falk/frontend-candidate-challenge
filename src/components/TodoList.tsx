import React from "react";
import { Todo } from "../types/Todo";
import { Box, Chip, Stack } from "@mui/material";
import { EditTodoListItem } from "./EditTodoListItem";
import { DeleteTodoListItem } from "./DeleteTodoListItem";
import { CheckboxTodoListItemDone } from "./CheckboxTodoListItemDone";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return (
    <ul className="todoList">
      {todos.map((todo, i) => (
        <li key={`todo-list-item-${i}`} data-testid={`todo-list-item-${i}`}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckboxTodoListItemDone
                id={todo.id}
                initDone={todo.done}
                setTodos={setTodos}
                index={i}
              />
              {todo.done && (
                <Chip
                  label="Done"
                  color="success"
                  data-testid={`todo-list-item-chip-done-${i}`}
                />
              )}
              <div>
                <span data-testid={`todo-list-item-text-${i}`}>
                  {todo.subject}
                </span>
              </div>
            </Stack>
            <Stack direction="row" spacing={1}>
              <EditTodoListItem id={todo.id} setTodos={setTodos} index={i} />
              <DeleteTodoListItem id={todo.id} setTodos={setTodos} index={i} />
            </Stack>
          </Box>
        </li>
      ))}
    </ul>
  );
};
