// modules/Timer.tsx
import React, { useEffect, useState } from "react";

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onTick: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    onTick(timeLeft);
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp, onTick]);

  return (
    <div className="timer">
      <p>Time Left: {timeLeft} s</p>
    </div>
  );
};

export default Timer;
