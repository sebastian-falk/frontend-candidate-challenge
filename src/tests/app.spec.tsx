import React from "react";

import App from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TodoApp", () => {
  it("renders app", () => {
    const view = render(<App />);
    expect(view).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list-item-text-0")).toHaveTextContent(
      "Buy milk"
    );

    // TODO: Verify second todo
    expect(screen.getByText("Buy bread")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list-item-text-1")).toHaveTextContent(
      "Buy bread"
    );
  });

  // TODO: Test app functionality: Create, edit, delete, mark as done.
  it("should create a new todo item with subject Buy everything to top of list", async () => {
    render(<App />);
    const user = userEvent.setup();

    const elementButtonAddTodo = screen.getByTestId("button-add-todo");
    await user.click(elementButtonAddTodo);

    const dialogInputTodoSubject = await screen.findByTestId(
      "dialog-input-todo-subject"
    );
    await user.type(dialogInputTodoSubject, "Buy everything");

    const dialogButtonSaveTodo = screen.getByTestId("dialog-button-save-todo");
    await user.click(dialogButtonSaveTodo);

    expect(screen.getByTestId("todo-list-item-text-0")).toHaveTextContent(
      "Buy everything"
    );
  });

  it("should edit todo subject Buy milk to Buy Dr Pepper", async () => {
    render(<App />);
    const user = userEvent.setup();

    expect(screen.getByTestId("todo-list-item-text-0")).toHaveTextContent(
      "Buy milk"
    );

    const elementButtonEditTodo = screen.getByTestId("button-edit-todo-0");
    await user.click(elementButtonEditTodo);

    const dialogInputTodoSubject = await screen.findByTestId(
      "dialog-input-todo-subject"
    );
    await user.type(dialogInputTodoSubject, "Buy Dr Pepper");

    const dialogButtonSaveTodo = screen.getByTestId("dialog-button-save-todo");
    await user.click(dialogButtonSaveTodo);

    expect(screen.getByTestId("todo-list-item-text-0")).toHaveTextContent(
      "Buy Dr Pepper"
    );
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("should delete todo item after confirmation", async () => {
    render(<App />);
    const user = userEvent.setup();

    expect(screen.getByTestId("todo-list-item-text-0")).toHaveTextContent(
      "Buy milk"
    );

    const elementButtonAddTodo = screen.getByTestId("button-delete-todo-0");
    await user.click(elementButtonAddTodo);

    const dialogButtonDeleteTodo = await screen.findByTestId(
      "dialog-button-delete-todo"
    );
    await user.click(dialogButtonDeleteTodo);

    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });

  it("should set todo item to done after checking checkbox", async () => {
    render(<App />);
    const user = userEvent.setup();

    expect(screen.queryByTestId("todo-list-item-chip-done-1")).toBeNull();

    const elementCheckboxDone = screen.getByTestId("todo-checkbox-1");
    expect(elementCheckboxDone).not.toBeChecked();
    await user.click(elementCheckboxDone);
    expect(elementCheckboxDone).toBeChecked();

    const elementListItemChipDone = await screen.findByTestId(
      `todo-list-item-chip-done-1`
    );
    expect(elementListItemChipDone).toBeInTheDocument();
  });
});
