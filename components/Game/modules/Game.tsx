import React, { useEffect, useState } from "react";
import Question from "./Question";
import AnswerOptions from "./AnswerOptions";
import Timer from "./Timer";
import questionsData from "../data/questions.json";

interface QuestionType {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const Game: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // This key resets the timer on each new question
  const [timerKey, setTimerKey] = useState(0);

  const questions: QuestionType[] = questionsData;

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (selectedOption) return; // Prevent multiple selections
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    // Wait a moment then move to next question
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleTimeUp = () => {
    if (!selectedOption) {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // Reset timer by changing key
      setTimerKey((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over</h2>
        <p>
          Your score: {score} / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="game">
      <Question text={currentQuestion.question} />
      <AnswerOptions
        options={currentQuestion.options}
        onSelect={handleOptionSelect}
      />
      <Timer key={timerKey} initialTime={5} onTimeUp={handleTimeUp} />
      <p>Score: {score}</p>
    </div>
  );
};

export default Game;
