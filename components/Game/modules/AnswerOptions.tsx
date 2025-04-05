import React, { useState, useEffect } from "react";

interface AnswerOptionsProps {
  options: string[];
  playerSelection?: string;
  opponentSelection?: string;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  playerSelection,
  opponentSelection,
}) => {
  const [computerSelection, setComputerSelection] = useState<string>();

  useEffect(() => {
    if (playerSelection && !computerSelection) {
      const delay = Math.random() * 2000 + 500; // Random delay between 0.5-2.5s
      const randomOption = options[Math.floor(Math.random() * options.length)];

      setTimeout(() => {
        setComputerSelection(randomOption);
      }, delay);
    }
  }, [playerSelection, options, computerSelection]);

  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <button
          key={index}
          disabled={playerSelection !== undefined}
          className={
            (option === playerSelection ? "player-selected" : "") ||
            (option === opponentSelection ? "computer-selected" : "")
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
