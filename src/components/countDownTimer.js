import React, { useState, useEffect } from 'react';

function CountdownTimer(props) {
  const { timeInSeconds } = props;
  // State to keep track of the remaining time
  const [timeLeft, setTimeLeft] = useState(Number(timeInSeconds)); // 120 seconds for 2 minutes

  useEffect(() => {
    // Initialize the timerId variable
    let timerId;
    // Check if timeLeft is greater than 0
    if (timeLeft > 0) {
      // Set up a timer that decreases timeLeft by 1 every second
      timerId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="CountdownTimer">
        Time Left: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default CountdownTimer;
