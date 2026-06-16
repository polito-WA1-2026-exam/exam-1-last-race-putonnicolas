import { useState, useEffect } from 'react';

const Timer = ({ initialSeconds = 90, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); 
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
    
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isDanger = timeLeft <= 15;

  return (
    <div className={`timer-display px-3 py-2 rounded-3 text-center text-nowrap ${isDanger ? 'text-danger' : 'text-info'}`}>
      <div className="fw-bold d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>
        <span>⏳</span>
        <span>{formattedTime}</span>
      </div>

    </div>
  );
};

export default Timer;