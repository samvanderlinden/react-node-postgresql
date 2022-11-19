import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Todo", () => {
  render(<App />);
  const linkElement = screen.getByText(/My ToDo App/i);
  expect(linkElement).toBeInTheDocument();
});
