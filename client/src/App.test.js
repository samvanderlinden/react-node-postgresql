import { render, screen } from "@testing-library/react";
import { describe } from "@jest/globals";
import App from "./App";

describe("App", () => {
  test(`renders "My ToDo app"`, () => {
    render(<App />);
    const linkElement = screen.getByText(/My ToDo App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
