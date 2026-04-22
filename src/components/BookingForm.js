import React, { useState } from "react";

const validateForm = (data) => {
  const errors = {};
  if (!data.date) errors.date = "Please select a date.";
  if (!data.time) errors.time = "Please select a time.";
  if (!data.guests || data.guests < 1 || data.guests > 10)
    errors.guests = "Guests must be between 1 and 10.";
  if (!data.occasion) errors.occasion = "Please select an occasion.";
  return errors;
};

function BookingForm({ availableTimes, dispatch }) {
  const [form, setForm] = useState({ date: "", time: "", guests: 1, occasion: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "date") dispatch({ type: "UPDATE_TIMES", payload: availableTimes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="confirmation" aria-live="polite">
        <h2>🎉 Booking Confirmed!</h2>
        <p>Date: {form.date}</p>
        <p>Time: {form.time}</p>
        <p>Guests: {form.guests}</p>
        <p>Occasion: {form.occasion}</p>
        <button onClick={() => { setSubmitted(false); setForm({ date: "", time: "", guests: 1, occasion: "" }); }}>
          Make Another Booking
        </button>
      </section>
    );
  }

  return (
    <section id="booking" className="booking-section">
      <h2>Reserve a Table</h2>
      <form onSubmit={handleSubmit} aria-label="Table booking form" noValidate>

        <div className="form-group">
          <label htmlFor="date">Choose date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            aria-required="true"
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && <span id="date-error" className="error" role="alert">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Choose time</label>
          <select
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.time ? "time-error" : undefined}
          >
            <option value="">-- Select time --</option>
            {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.time && <span id="time-error" className="error" role="alert">{errors.time}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={form.guests}
            onChange={handleChange}
            min="1"
            max="10"
            aria-required="true"
            aria-describedby={errors.guests ? "guests-error" : undefined}
          />
          {errors.guests && <span id="guests-error" className="error" role="alert">{errors.guests}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={form.occasion}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.occasion ? "occasion-error" : undefined}
          >
            <option value="">-- Select occasion --</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
          {errors.occasion && <span id="occasion-error" className="error" role="alert">{errors.occasion}</span>}
        </div>

        <button type="submit" aria-label="Submit reservation">Make Your Reservation</button>
      </form>
    </section>
  );
}

export default BookingForm;
