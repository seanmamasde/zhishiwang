// modules/Question.tsx
import React from "react";

interface QuestionProps {
  text: string;
}

const Question: React.FC<QuestionProps> = ({ text }) => {
  return (
    <div className="question">
      <h2>{text}</h2>
    </div>
  );
};

export default Question;
