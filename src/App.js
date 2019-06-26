import React, {useState} from 'react';
import CardsContainer from './components/CardsContainer';
import GameBoard from './components/GameBoard';
import {usePlayer, useChoicesDialog} from './hooks/hooks';
import GameHeader from './components/GameHeader';
import ChoiceDialog from './components/ChoiceDialog';

// let turnStart = true;

function App() {
  // true user :: false enemy;
  const [turn, setTurn] = useState(true);
  const [turnStart, setTurnStart] = useState(true);
  const [turnCount, setTurnCount] = useState(1);
  const [drawCardCost, setDrawCardCost] = useState(1);
  //  choices state
  const { showChoiceDialog, triggerChoices, getChoicesDialogProps } = useChoicesDialog();

  const player = usePlayer(drawCardCost,999,999);
  const enemy = usePlayer(drawCardCost,10,3);

  console.log('-----------------RERENDER OCCURED');




  if (turnStart) {
    console.log(getWhoseTurn(), 'TURN STARTED');
    turnStartInit();
    setTurnStart(false);
  }


  function nextTurn() {
    turnEndInit();

    // END TURN INITALIZATION
    console.log(getWhoseTurn(), 'TURN ENDED');

    setTurn(!turn);
    setTurnCount(turnCount + 1);
    // every 20 turns increase drawCardCost
    if (turnCount % 20 === 0) {
      setDrawCardCost(drawCardCost + 1);
    }
    if (turn) player.setMP(player.mp + 1);
    if (!turn) enemy.setMP(player.mp + 1);

    setTurnStart(true);
  }

  function getWhoseTurn() {
    return turn ? 'Player' : 'Enemy';
  }

  function turnStartInit() {
    if (!turn) {
      enemy.onBeforeTurnStart(enemy, player);
      // handle enemy logic
      setTimeout(() => {
        nextTurn();
      }, 1000);
    } else {
      // player turn initalization
      player.onBeforeTurnStart(player, enemy);
    }
  }
  function turnEndInit() {
    if (!turn) {
      enemy.onBeforeTurnEnd(enemy, player);
    } else {
      player.onBeforeTurnEnd(player, enemy);
    }
  }

  const gameHeaderProps = {player, enemy, turn, nextTurn, drawCardCost, turnCount};
  const choicesDialogProps = getChoicesDialogProps();
  const board = {
    row1: {
      cards: enemy.row2.cards,
      enemy
    },
    row2: {
      cards: enemy.row1.cards,
      enemy
    },
    row3: {
      cards: player.row1.cards,
      player
    },
    row4: {
      cards: player.row2.cards,
      player
    },
  };


  return (
    <div className="GameContainer">
      <GameHeader {...gameHeaderProps} />
      <GameBoard board={board} turn={turn}  />
      <CardsContainer player={player} isPlayerTurn={turn} triggerChoices={triggerChoices} />
      {showChoiceDialog && <ChoiceDialog {...choicesDialogProps} />}
    </div>
  );
}

export default App;
