// modules/Game.tsx
import React, { useEffect, useState, useRef } from "react";
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

const INITIAL_TIME = 10;

const Game: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
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
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [timerKey, setTimerKey] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [playerAnswerTime, setPlayerAnswerTime] = useState<number | null>(null);
  const [opponentAnswerTime, setOpponentAnswerTime] = useState<number | null>(
    null,
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const botTimerRef = useRef<NodeJS.Timeout | null>(null);

  // On mount or replay, randomly pick 5 questions.
  useEffect(() => {
    const shuffled = [...questionsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffled);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  // Set bot timer: answer between 0.5 and 3 seconds.
  useEffect(() => {
    if (!currentQuestion) return;
    if (botTimerRef.current) clearTimeout(botTimerRef.current);
    // Delay between 500ms and 3000ms.
    const delay = Math.floor(Math.random() * 2500) + 500;
    botTimerRef.current = setTimeout(() => {
      if (opponentSelection === undefined) {
        const chance = Math.random();
        const chosenOption =
          chance < 0.7
            ? currentQuestion.answer
            : currentQuestion.options.filter(
                (opt) => opt !== currentQuestion.answer,
              )[
                Math.floor(Math.random() * (currentQuestion.options.length - 1))
              ];
        setOpponentSelection(chosenOption);
        setOpponentAnswerTime(timeLeft);
        if (chosenOption === currentQuestion.answer) {
          setOpponentScore((prev) => prev + calculateScore(timeLeft));
        }
      }
    }, delay);
    return () => {
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
    };
  }, [currentQuestion, opponentSelection, timeLeft]);

  // Single timer effect.
  useEffect(() => {
    if (timeLeft <= 0 && !showCorrect) {
      finalizeQuestion();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, showCorrect]);

  // When both answers are in, finalize.
  useEffect(() => {
    if (
      playerSelection !== undefined &&
      opponentSelection !== undefined &&
      !showCorrect
    ) {
      finalizeQuestion();
    }
  }, [playerSelection, opponentSelection, showCorrect]);

  const calculateScore = (answerTime: number): number => {
    const elapsed = INITIAL_TIME - Math.ceil(answerTime);
    return Math.round(1000 * Math.pow(0.9, elapsed));
  };

  const handlePlayerSelect = (option: string) => {
    if (playerSelection === undefined) {
      setPlayerSelection(option);
      setPlayerAnswerTime(timeLeft);
      if (option === currentQuestion.answer) {
        setPlayerScore((prev) => prev + calculateScore(timeLeft));
      }
    }
  };

  const finalizeQuestion = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowCorrect(true);
    // Wait 2 seconds before moving on, to show the correct answer highlighted.
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setPlayerSelection(undefined);
    setOpponentSelection(undefined);
    setPlayerAnswerTime(null);
    setOpponentAnswerTime(null);
    setTimeLeft(INITIAL_TIME);
    setShowCorrect(false);
    setTimerKey((prev) => prev + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleReplay = () => {
    const shuffled = [...questionsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setGameOver(false);
    setPlayerSelection(undefined);
    setOpponentSelection(undefined);
    setPlayerAnswerTime(null);
    setOpponentAnswerTime(null);
    setTimeLeft(INITIAL_TIME);
    setShowCorrect(false);
    setTimerKey((prev) => prev + 1);
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
        <button onClick={handleReplay}>Replay</button>
      </div>
    );
  }

  return (
    <div className="game">
      {currentQuestion && (
        <>
          <div className="score-board">
            <p>
              You
              <br />
              {playerScore}
            </p>
            <p>
              Opponent
              <br />
              {opponentScore}
            </p>
          </div>
          <Question text={currentQuestion.question} />
          <AnswerOptions
            options={currentQuestion.options}
            playerSelection={playerSelection}
            opponentSelection={opponentSelection}
            correctAnswer={currentQuestion.answer}
            showCorrect={showCorrect}
            onSelect={(option, isPlayer) => {
              if (isPlayer) handlePlayerSelect(option);
            }}
          />
          <Timer
            key={timerKey}
            initialTime={INITIAL_TIME}
            onTimeUp={() => {
              if (!showCorrect) finalizeQuestion();
            }}
            onTick={setTimeLeft}
          />
        </>
      )}
    </div>
  );
};

export default Game;
