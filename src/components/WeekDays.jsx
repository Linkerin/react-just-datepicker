import React from 'react';

function WeekDays({ weekDays, styles }) {
  return (
    <div className={styles}>
      {weekDays.map((day, index) => (
        <p key={index}>{day}</p>
      ))}
    </div>
  );
}

export default WeekDays;
