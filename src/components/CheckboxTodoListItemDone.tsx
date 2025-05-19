import { Checkbox } from "@mui/material";
import { Todo } from "../types/Todo";
import { useState } from "react";

type CheckboxTodoListItemDoneProps = {
  id: string;
  initDone: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  index: number;
};

export const CheckboxTodoListItemDone = ({
  id,
  initDone,
  setTodos,
  index,
}: CheckboxTodoListItemDoneProps) => {
  const [done, setDone] = useState(initDone);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: event.target.checked } : t))
    );

    setDone(event.target.checked);
  };

  return (
    <Checkbox
      size="large"
      checked={done}
      onChange={handleChange}
      slotProps={{
        input: {
          "data-testid": `todo-checkbox-${index}`,
        } as any,
      }}
    />
  );
};
