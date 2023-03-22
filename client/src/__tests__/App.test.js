import { screen } from "@testing-library/react";
import { describe } from "@jest/globals";
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";

describe("App component", () => {
  test(`should render "My ToDo app"`, () => {
    renderWithProviders(<App />);
    const linkElement = screen.getByText(/My ToDo App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
