import React from "react";

interface AnswerOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="answer-options">
      {options.map((option, index) => (
        <button key={index} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
