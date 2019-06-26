import React from 'react';
import Card from './Card';
import generateClassName from '../utils/generateClassName';

function GameBoardRow({cards, enemy, player, turn}) {
    return (
        <div className={generateClassName({"EnemyRow": enemy}, "GameBoardRow")}>
            {cards.map((card, index) => <Card key={index} {...card} onBoard={true} turn={turn} player={player} />)}
        </div>
    )
}

export default GameBoardRow;