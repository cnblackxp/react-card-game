import React from 'react';
import generateClassName from '../utils/generateClassName';
import {useMouseOver} from '../hooks/hooks';
import { getCardByName } from '../cards/Cards';

function AttackCardStats({attackMana, attack}) {
    return (
        attack ?
        <>
            <div className="CardAttackMana">{attackMana}</div>
            <div className="CardAttack">{attack}</div>
        </> :
        ''
    );
}

function Card({manaCost, name, attackMana, attack, description, styles, onBoard, player, cardIndex, turn, triggerChoices}) {
    const {mouseOver, mouseOverHandler} = useMouseOver();

    const cardNameStyles = {color: attack ? '#000' : '#96281b'};
    styles = styles || {};
    
    

    const className = generateClassName({
        "CardContainerHover": mouseOver
    }, "CardContainer");


    let cardEvents;

    if (!onBoard) {
        cardEvents = {
            ...mouseOverHandler,
            onClick() {
                triggerChoices([
                    {
                        label: 'Top Row',
                        onClick() {
                            player.setCardToBoard(cardIndex, 1);
                        }
                    },
                    {
                        label: 'Bottom Row',
                        onClick() {
                            player.setCardToBoard(cardIndex, 2);
                        }
                    },
                ])
            }
        }
    } else if (turn && player) {
        cardEvents = {
            onClick() {
                player.playCard(getCardByName(name));
            }
        }
    }
            

    return (
        <div className={className} style={styles} {...cardEvents}>
            <div className="CardHeader">
                <div className="CardMana">{manaCost}</div>
                <div className="CardName" style={cardNameStyles}>{name}</div>
                <AttackCardStats {...{attackMana, attack}} />
            </div>
            <div className="CardImage"></div>
            <div className="CardDescription">{description}</div>
        </div>
    );
}

export default Card;