import React from 'react';
import GameBoardRow from './GameBoardRow';

function GameBoard({board, turn}) {
    return (
        <div className="GameBoard">
            {Object.keys(board).map(row => <GameBoardRow key={row} {...board[row]} turn={turn} />)}
        </div>
    );
}

export default GameBoard;