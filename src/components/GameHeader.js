import React from 'react';

function GameHeader({player, enemy, turn, nextTurn, drawCardCost, turnCount}) {
    return (
        <div className="GameHeader">
            <div>
                <div>Turn: {turn ? 'Player' : 'Enemy'}</div>
                <div>Turn Count: {turnCount}</div>
            </div>
            <div>
                <div className="PlayerStats">HP: {player.hp}</div>
                <div className="EnemyStats">HP: {enemy.hp}</div>
            </div>
            <div>
                <div className="PlayerStats">MP: {player.mp}</div>
                <div className="EnemyStats">MP: {enemy.mp}</div>
            </div>
            <h1 style={{textAlign: 'center'}}>Cards</h1>
            <div><button onClick={player.drawCard} disabled={!turn}>Draw Card ({drawCardCost} MP)</button></div>
            <div><button onClick={_ => nextTurn()} disabled={!turn}>End Turn</button></div>
        </div>
    );
}

export default GameHeader;