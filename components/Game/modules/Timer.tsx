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

  const progressBarStyle = {
    width: `${(timeLeft / initialTime) * 100}%`,
    height: "20px",
    backgroundColor: "green",
    transition: "width 1s linear",
  };

  return (
    <div className="timer">
      <p>Time Left: {timeLeft} s</p>
      <div
        style={{
          width: "100%",
          backgroundColor: "lightgray",
          borderRadius: "5px",
        }}
      >
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default Timer;
