import { v4 as uuidv4 } from "uuid";
import { IconButton, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { Todo } from "../types/Todo";
import { TodoFormDialog } from "./TodoFormDialog";

type AddTodoListItemProps = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const AddTodoListItem = ({ setTodos }: AddTodoListItemProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (subject: string) => {
    setTodos((prev) => [
      { id: uuidv4(), subject: subject, done: false },
      ...prev,
    ]);
  };

  return (
    <>
      <TodoFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        title="Add TODO"
        description="Enter subject for the new todo!"
      />

      <Stack direction="row">
        <IconButton
          aria-label="add"
          size="large"
          onClick={() => setDialogOpen(true)}
          data-testid="button-add-todo"
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Stack>
    </>
  );
};
