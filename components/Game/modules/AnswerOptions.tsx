// modules/AnswerOptions.tsx
import React from "react";

interface AnswerOptionsProps {
  options: string[];
  playerSelection?: string;
  opponentSelection?: string;
  correctAnswer: string;
  showCorrect: boolean;
  onSelect: (option: string, isPlayer: boolean) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  playerSelection,
  opponentSelection,
  correctAnswer,
  showCorrect,
  onSelect,
}) => {
  return (
    <div className="answer-options">
      {options.map((option, index) => {
        let btnClass = "option-button";
        let icon = null;
        if (playerSelection !== undefined) {
          if (option === playerSelection) {
            if (option === correctAnswer) {
              btnClass += " selected-correct";
              icon = <span className="icon">✔</span>;
            } else {
              btnClass += " selected-wrong";
              icon = <span className="icon">✖</span>;
            }
          } else if (showCorrect && option === correctAnswer) {
            // Show correct answer indicator even if not selected.
            icon = <span className="icon">✔</span>;
          }
        }
        return (
          <div key={index} className="option-slot">
            <div className="icon-slot">{icon}</div>
            <button
              onClick={() => onSelect(option, true)}
              disabled={playerSelection !== undefined}
              className={btnClass}
            >
              {option}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
