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
    backgroundColor:
      timeLeft <= initialTime * 0.3 ? "lightcoral" : "lightgreen",
    transition: "width 1s linear",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className="timer">
      <div
        style={{
          width: "100%",
          backgroundColor: "lightgray",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {timeLeft} s
        </div>
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default Timer;
