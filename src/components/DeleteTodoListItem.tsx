import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Todo } from "../types/Todo";

type DeleteTodoListItemProps = {
  id: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  index: number;
};

export const DeleteTodoListItem = ({
  id,
  setTodos,
  index,
}: DeleteTodoListItemProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => setOpenDialog(true);

  const handleClose = () => setOpenDialog(false);

  const handleConfirm = () => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Delete TODO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            data-testid={`dialog-button-delete-todo`}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton
        aria-label="delete"
        size="large"
        onClick={handleClickOpen}
        data-testid={`button-delete-todo-${index}`}
      >
        <DeleteRoundedIcon fontSize="medium" />
      </IconButton>
    </>
  );
};
