// components/TodoFormDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { FormEvent, useState, useEffect } from "react";

type TodoFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (subject: string) => void;
  title: string;
  description?: string;
  initialValue?: string;
};

export const TodoFormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  description,
  initialValue = "",
}: TodoFormDialogProps) => {
  const [subject, setSubject] = useState(initialValue);

  useEffect(() => {
    setSubject(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(subject);
    setSubject(""); // Reset after submit
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        <TextField
          autoFocus
          required
          margin="dense"
          id="subject"
          name="subject"
          label="Subject"
          type="text"
          fullWidth
          variant="standard"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          slotProps={{
            htmlInput: { "data-testid": "dialog-input-todo-subject" },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" data-testid="dialog-button-save-todo">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
