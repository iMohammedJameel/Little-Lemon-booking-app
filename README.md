# 🍋 Little Lemon - Table Booking App

A React web application for the Little Lemon restaurant that allows customers to reserve a table online.

## Features

- Table booking form with date, time, guests, and occasion selection
- Form validation with meaningful error messages
- Booking confirmation screen
- Accessible UI (ARIA labels, semantic HTML)
- Responsive design (mobile-friendly)
- Unit tests with React Testing Library

## Tech Stack

- React 18
- React Testing Library / Jest
- CSS (no external UI library)

## Getting Started

### Prerequisites
- Node.js >= 14
- npm >= 6

### Installation

```bash
git clone <your-repo-url>
cd little-lemon
npm install
```

### Run the app

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run tests

```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── BookingForm.js
│   └── Footer.js
├── App.js
├── App.css
└── App.test.js
```

## Accessibility

- All form inputs have associated `<label>` elements
- Error messages use `role="alert"` for screen readers
- Navigation uses `aria-label`
- Confirmation section uses `aria-live="polite"`
