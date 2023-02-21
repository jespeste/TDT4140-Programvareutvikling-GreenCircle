import React, { useState } from 'react';

function AvailabilityCalendar() {
  const [availableDates, setAvailableDates] = useState({});

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setAvailableDates(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with availableDates
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        onChange={handleDateChange}
        value={availableDates.date || ''}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AvailabilityCalendar;
