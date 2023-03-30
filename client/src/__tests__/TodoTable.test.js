import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import TodoTable from "../components/TodoTable";

// We use msw to intercept the network request during the test,
// and return the response 'Clean room' after 100ms
// when receiving a get request to the `/todos` endpoint
export const handlers = [
  rest.get("http://localhost:5000/todos", (req, res, ctx) => {
    const todos = [{ todo_id: 1, description: "Clean room", completed: false }];
    return res(ctx.json(todos), ctx.delay(100));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("TodoTable component", () => {
  test("should render todo elements in table on component mount", async () => {
    renderWithProviders(<TodoTable />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../i));
    const response = screen.getByText(/Clean room/i);
    expect(response).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});
