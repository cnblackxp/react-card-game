const Cards = {
    SKELETON: {
        name: 'Skeleton',
        manaCost: 2,
        attack: 3,
        attackMana: 1,
        description: 'death costs nothing, living costs everything.'
    },
    POOL_OF_BLOOD: {
        name: 'Pool of Blood',
        manaCost: 5,
        description: '+1 mana at the beginning of every turn',
        onBeforeTurnStart({player}) {
            console.log(`\t${player.mpRef.current} using pool of blood effect`)
            player.mpRef.current += 1;
        }
        // styles: {
        //   transform: 'rotate(-20deg)'
        // }
    },
    KNIGHT: {
        name: 'Knight',
        manaCost: 3,
        attack: 5,
        attackMana: 2,
        description: 'a loyal knight at your service'
    },
    OZYMANDIAS: {
        name: 'Ozymandias',
        manaCost: 20,
        attack: 20,
        attackMana: 0,
        description: 'My name is Ozymandias, King of Kings; Look on my Works, ye Mighty, and despair!',
        onBeforeTurnEnd({player}) {
            console.log('\tozymandias destroyed', player);

        }
    }
}

export function getRandomCard() {
    const cardKeys = Object.keys(Cards);
    const randomCardIndex = Math.floor(Math.random() * cardKeys.length);
    const cardKey = cardKeys[randomCardIndex];
    const randomCard = Cards[cardKey]
    return randomCard;
}

export function getCardByName(name) {
    for (const key in Cards) {
        if (Cards[key].name === name) {
            return Cards[key];
        }
    }
}

export default Cards;