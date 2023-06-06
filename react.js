import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Calendar = () => {
  const [date, setDate] = useState('');
  const [color, setColor] = useState('');
  const [suggestedColor, setSuggestedColor] = useState('');

  useEffect(() => {
    fetchDressColor();
  }, [date]);

  const fetchDressColor = async () => {
    try {
      const response = await axios.get(`/api/dress-color/${date}`);
      if (response.data) {
        setSuggestedColor(response.data.color);
      } else {
        setSuggestedColor('');
      }
    } catch (error) {
      console.error('Failed to fetch dress color:', error);
    }
  };

  const saveDressColor = async () => {
    try {
      await axios.post('/api/dress-color', { date, color });
      fetchDressColor();
    } catch (error) {
      console.error('Failed to save dress color:', error);
    }
  };

  return (
    <div>
      <h1>Daily Dress Color Suggestion</h1>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <button onClick={saveDressColor}>Save</button>
      {suggestedColor && (
        <div>
          <h2>Suggested Color:</h2>
          <p>{suggestedColor}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
