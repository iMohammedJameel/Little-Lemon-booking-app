import React, { useReducer } from "react";
import Header from "./components/Header";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import "./App.css";

export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    return action.payload;
  }
  return state;
};

export const initializeTimes = () => ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div className="App">
      <Header />
      <main>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
