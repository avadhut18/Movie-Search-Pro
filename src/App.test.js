import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders the search page heading", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(
    screen.getByRole("heading", { name: /find your next watch/i })
  ).toBeInTheDocument();
});

test("renders the search input", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByLabelText(/search for a movie/i)).toBeInTheDocument();
});
