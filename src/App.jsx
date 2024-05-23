import { useState } from "react";
import Player from "./component/Player.jsx";
import Gameboard from "./component/Gameboard.jsx";
import Log from "./component/log.jsx";
import GameOver from "./component/GameOver.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js";

const PLAYERS = {
  "X": "Player 1",
  "O": "Player 2"
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameturn) {
  let currPlayer = "X";
  if(gameturn.length > 0 && gameturn[0].player === "X"){
    currPlayer = "O";
  }
  return currPlayer;
}

function derivedWinner(gameBoard ) {
  let winner = null;
  for( const comb of WINNING_COMBINATIONS) {
    const firstSymb = gameBoard[comb[0].row][comb[0].column];
    const secondSymb = gameBoard[comb[1].row][comb[1].column];
    const thirdSymb = gameBoard[comb[2].row][comb[2].column];

    if(firstSymb && firstSymb === secondSymb && firstSymb === thirdSymb ) {
      winner = firstSymb;
    }
  }

  return winner;
}

function getDerivedGameBoard(gameTurn) {
  let gameboard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for( const turn of gameTurn) {
      const {square, player} = turn;
      const {row, col} = square;
      gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurn);
  const gameboard = getDerivedGameBoard(gameTurn);
  const winner = derivedWinner(gameboard)
  let hasDraw = null;
  if(gameTurn.length === 9  && !winner){
    hasDraw = true;
  }

  function handleSelectActivePlayer(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const activePlayer = deriveActivePlayer(prevTurn);
      const updateTurn = [{
        square: {row: rowIndex, col: colIndex}, player: activePlayer }, 
        ...prevTurn];
      return updateTurn;
    })
  }

  function handleGameReset() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name
      };
    })
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} handleSave={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} handleSave={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={players[winner]} handleGameReset={handleGameReset}/>}
        <Gameboard inputHandler={handleSelectActivePlayer} 
          board={gameboard}
        />
      </div>
      <Log turns={gameTurn}/>
    </main>
  )
}

export default App
