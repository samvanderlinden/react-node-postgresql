import { screen } from "@testing-library/react";
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
});
