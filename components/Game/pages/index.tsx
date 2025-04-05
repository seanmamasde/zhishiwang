import React from "react";
import Game from "../modules/Game";

const HomePage: React.FC = () => {
  return (
    <div className="app">
      <h1>Question Answering Game</h1>
      <Game />
    </div>
  );
};

export default HomePage;
