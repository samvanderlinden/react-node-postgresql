import { screen, fireEvent } from "@testing-library/react";
import { describe, expect } from "@jest/globals";
import { renderWithProviders } from "../utils/test-utils";
import TodoInput from "../components/TodoInput";

describe("TodoInput component", () => {
  test("should render TodoInput button", () => {
    renderWithProviders(<TodoInput />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("should render TodoInput input field", () => {
    renderWithProviders(<TodoInput />);
    const input = screen.getByTestId("todo-input");
    expect(input).toBeInTheDocument();
  });

  test("should allow user to type text to input field", () => {
    renderWithProviders(<TodoInput />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Clean room" } });
    expect(input.value).toBe("Clean room");
  });

  test("should allow user to delete text from input field", () => {
    renderWithProviders(<TodoInput />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Clean room" } });
    expect(input.value).toBe("Clean room");
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });
});
