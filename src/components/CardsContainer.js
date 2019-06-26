import React from 'react';
import Card from './Card';

function CardsContainer({player, isPlayerTurn, triggerChoices}) {
    const {cards} = player;
    const styles = 
        !isPlayerTurn ? 
        {
            pointerEvents: 'none',
            opacity: 0.4
        } :
        {};
    
    return (
        <div className="CardsContainer" style={styles}>
            {cards.map((card, index) => <Card key={index} {...card} player={player} cardIndex={index} triggerChoices={triggerChoices} />)}
        </div>
    );
}

export default CardsContainer;