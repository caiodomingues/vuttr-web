import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders application", () => {
  render(<App />);
  const textElement = screen.getByText(/VUTTR/i);
  expect(textElement).toBeInTheDocument();
});
