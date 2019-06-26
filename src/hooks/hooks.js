import {useState, useRef} from 'react';
import Cards, {getRandomCard} from '../cards/Cards';

export function usePlayer(drawCardCost, hitPoints = 24, manaPoints = 5) {
    const [hp, setHP] = useState(hitPoints);
    const [mp, setMP] = useState(manaPoints);
    const mpRef = useRef(0);
    const {cards, addCard, removeCard} = useCards([Cards.POOL_OF_BLOOD,Cards.OZYMANDIAS,Cards.POOL_OF_BLOOD]);
    const row1 = useGameBoardRow([getRandomCard()]);
    const row2 = useGameBoardRow([]);

    function drawCard() {
        if (mp < drawCardCost) {
            return alert(`You don't have enough mana`);
        }

        if (cards.length < 4) {
            addCard(getRandomCard());
            setMP(mp-drawCardCost);
        } else {
            alert(`you can't draw more cards 4 is the max`);
        }
    }

    function setCardToBoard(index, rowIndex) {
        const card = cards[index];
        const row = rowIndex === 1 ? row1 : row2;
        if (mp >= card.manaCost) {
            if (row.cards === 3) {
                alert(`Row is full can't play more three cards at one row`);
            } else {
                row.addCard(card);
                removeCard(index);
                setMP(mp - card.manaCost);
            }
        } else {
            alert(`You can't play the card you don't have enough mana`);
        }
    }

    function playCard(card) {
        console.log(card);

        if (card.attack) {
            // monster card
        } else {
            // effect card
        }
    }

    function getCardsOnBoards () {
        return [...row1.cards, ...row2.cards];
    }

    function activiateEffects(effect, args) {
        const cardsOnBoard = getCardsOnBoards();
        for (const cardIndex in cardsOnBoard) {
            const card = cardsOnBoard[cardIndex];
            if (card[effect]) {
                console.log(`\t---${card.name}`)
                card[effect]({...args});
            }
        }
    }

    function onBeforeTurnStart(player, enemy) {
        console.log('\ton before turn start');
        activiateEffects('onBeforeTurnStart', {player, enemy});
    }

    function onBeforeTurnEnd(player, enemy) {
        console.log('\ton before turn end');
        activiateEffects('onBeforeTurnEnd', {player, enemy});
    }

    if (mpRef.current > 0) {
        setMP(mp + mpRef.current);
        mpRef.current = 0;
    }

    return {
        hp,
        mp,
        cards,
        drawCard,
        playCard,
        setHP,
        row1,
        row2,
        setCardToBoard,
        setMP,
        onBeforeTurnStart,
        onBeforeTurnEnd,
        mpRef
    }
}

export function useGameBoardRow(initalState = []) {
    const {cards, addCard, removeCard} = useCards(initalState);

    return {
        cards,
        addCard,
        removeCard
    }
}

export function useCards(initalState = []) {
    const [cards, setCards] = useState(initalState);

    function addCard(card) {
        setCards([
            ...cards,
            card
        ]);
    }

    function removeCard(cardIndex) {
        setCards(
            cards.filter((_, index) => index !== cardIndex)
        );
    }

    return {
        cards,
        addCard,
        removeCard
    }
}

export function useChoicesDialog() {
    const [showChoiceDialog, setShowChoiceDialog] = useState(false);
    const [choices, setChoices] = useState([]);

    function triggerChoices(choices) {
        setChoices(choices);
        setShowChoiceDialog(true);
    }

    function getChoicesDialogProps() {
        return {choices, setShowChoiceDialog};
    }

    return {
        showChoiceDialog,
        triggerChoices,
        getChoicesDialogProps
    }

}

export function useMouseOver() {
    const [mouseOver, setMouseOver] = useState(false);

    function handleMouseOver() {
        setMouseOver(true);
    }

    function handleMouseOut() {
        setMouseOver(false);
    }

    const mouseOverHandler = {
        onMouseOver: handleMouseOver, 
        onMouseOut: handleMouseOut
    }

    return {
        mouseOver,
        mouseOverHandler
    }
}