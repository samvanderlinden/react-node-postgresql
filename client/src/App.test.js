import { render, screen } from "@testing-library/react";
import App from "./App";

test(`renders "My ToDo app"`, () => {
  render(<App />);
  const linkElement = screen.getByText(/My ToDo App/i);
  expect(linkElement).toBeInTheDocument();
});
