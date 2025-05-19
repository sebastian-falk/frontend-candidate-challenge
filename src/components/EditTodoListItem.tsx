import { IconButton, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { Todo } from "../types/Todo";
import { TodoFormDialog } from "./TodoFormDialog";

type EditTodoListItemProps = {
  id: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  index: number; // For test
};

export const EditTodoListItem = ({
  id,
  setTodos,
  index,
}: EditTodoListItemProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (subject: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, subject } : todo))
    );
  };

  return (
    <>
      <TodoFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        title="Edit TODO"
        description="Edit subject for the todo!"
      />

      <Stack direction="row">
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => setDialogOpen(true)}
          data-testid={`button-edit-todo-${index}`}
        >
          <EditRoundedIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </>
  );
};
