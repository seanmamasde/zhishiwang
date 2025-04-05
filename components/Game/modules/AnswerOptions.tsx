import React, { useState, useEffect } from "react";

interface AnswerOptionsProps {
  options: string[];
  playerSelection?: string;
  opponentSelection?: string;
  onOptionSelect: (option: string, isPlayer: boolean) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  playerSelection,
  opponentSelection,
  onOptionSelect,
}) => {
  // Computer opponent logic
  useEffect(() => {
    if (!opponentSelection) {
      const delay = Math.random() * 2000 + 500; // Random delay between 0.5-2.5s
      const randomOption = options[Math.floor(Math.random() * options.length)];

      const timeoutId = setTimeout(() => {
        onOptionSelect(randomOption, false); // false indicates computer selection
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [options, opponentSelection, onOptionSelect]);

  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionSelect(option, true)} // true indicates player selection
          disabled={playerSelection !== undefined}
          className={`option-button ${
            option === playerSelection ? "player-selected" : ""
          } ${option === opponentSelection ? "computer-selected" : ""}`}
          style={{
            display: "block",
            margin: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
