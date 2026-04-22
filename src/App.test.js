import { render, screen, fireEvent } from "@testing-library/react";
import App, { updateTimes, initializeTimes } from "./App";

test("initializeTimes returns non-empty array", () => {
  expect(initializeTimes().length).toBeGreaterThan(0);
});

test("updateTimes returns new times on UPDATE_TIMES", () => {
  const newTimes = ["18:00", "19:00"];
  expect(updateTimes([], { type: "UPDATE_TIMES", payload: newTimes })).toEqual(newTimes);
});

test("updateTimes returns current state for unknown action", () => {
  const state = ["17:00"];
  expect(updateTimes(state, { type: "UNKNOWN" })).toEqual(state);
});

test("renders booking form heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /Reserve a Table/i })).toBeInTheDocument();
});

test("renders all form fields", () => {
  render(<App />);
  expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
});

test("shows validation errors on empty submit", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: /Submit reservation/i }));
  expect(screen.getByText(/Please select a date/i)).toBeInTheDocument();
  expect(screen.getByText(/Please select a time/i)).toBeInTheDocument();
  expect(screen.getByText(/Please select an occasion/i)).toBeInTheDocument();
});

test("shows confirmation on valid submit", () => {
  render(<App />);
  const today = new Date().toISOString().split("T")[0];
  fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: today } });
  fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: "18:00" } });
  fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: "2" } });
  fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: "Birthday" } });
  fireEvent.click(screen.getByRole("button", { name: /Submit reservation/i }));
  expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
});
