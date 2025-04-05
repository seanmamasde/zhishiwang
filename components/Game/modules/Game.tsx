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
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerSelection, setPlayerSelection] = useState<string | undefined>(
    undefined,
  );
  const [opponentSelection, setOpponentSelection] = useState<
    string | undefined
  >(undefined);
  const [timerKey, setTimerKey] = useState(0);

  const questions: QuestionType[] = [...questionsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string, isPlayer: boolean) => {
    if (isPlayer) {
      setPlayerSelection(option);
    } else {
      setOpponentSelection(option);
    }

    // Check if both player and opponent have made their selections
    const updatedPlayerSelection = isPlayer ? option : playerSelection;
    const updatedOpponentSelection = isPlayer ? opponentSelection : option;

    if (updatedPlayerSelection && updatedOpponentSelection) {
      // Update scores
      if (updatedPlayerSelection === currentQuestion.answer) {
        setPlayerScore((prev) => prev + 1);
      }
      if (updatedOpponentSelection === currentQuestion.answer) {
        setOpponentScore((prev) => prev + 1);
      }
      // Move to next question after a short delay
      setTimeout(() => {
        nextQuestion();
      }, 1000);
    }
  };

  const handleTimeUp = () => {
    if (!playerSelection) {
      setOpponentScore((prev) => prev + 1);
    }
    if (!opponentSelection) {
      setPlayerScore((prev) => prev + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    setPlayerSelection(undefined);
    setOpponentSelection(undefined);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
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
          Your score: {playerScore} / {questions.length}
        </p>
        <p>
          Opponent score: {opponentScore} / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="game">
      <Question text={currentQuestion.question} />
      <AnswerOptions
        options={currentQuestion.options}
        playerSelection={playerSelection}
        opponentSelection={opponentSelection}
        onOptionSelect={handleOptionSelect}
      />
      <Timer key={timerKey} initialTime={10} onTimeUp={handleTimeUp} />
      <p>Your Score: {playerScore}</p>
      <p>Opponent Score: {opponentScore}</p>
    </div>
  );
};

export default Game;
