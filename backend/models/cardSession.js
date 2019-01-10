const mongoose = require('mongoose');
const { cardSchema } = require('./card');
const CardSessionAttributes = require('./cardSessionAttributes');
const { getCardList } = require('../services/cards');

const cardSessionSchema = mongoose.Schema(
    {
        num_commons: {
            type: Number,
            default: 0
        },
        num_uncommons: {
            type: Number,
            default: 0
        },
        num_rares: {
            type: Number,
            default: 0
        },
        num_items: {
            type: Number,
            default: 0
        },
        num_heroes: {
            type: Number,
            default: 0
        },
        cards: {
            type: [cardSchema]
        }
    }
)
cardSessionSchema.methods.tallySession = function() {
    this.cards.forEach( el => {
        if (el.card_type === "Hero") { this.num_heroes++ }
        else if (el.card_type === "Item") { this.num_items++ };
    })
}

cardSessionSchema.methods.startOpenSession = async function() {
    try {
        const cardSessionAttributes = new CardSessionAttributes();
        const result = await getCardList();
        const validCards = result.filter(el => el.card_type !== "Stronghold" && el.card_type !== "Pathing"); 
        const heroes = validCards.filter(el => el.card_type === "Hero");
        const items = validCards.filter(el => el.card_type === "Item");
        const allOtherCards = validCards.filter(el => el.card_type !== "Hero" && el.card_type !== "Item");
        
        for (let i = 0; i < cardSessionAttributes.heroes_per_session; i++) {
            this.cards.push(heroes[Math.floor(Math.random() * (heroes.length))]);
        }
        
        for (let i = 0; i < cardSessionAttributes.items_per_session; i++) {
            this.cards.push(items[Math.floor(Math.random() * (items.length))]);
        }

        for (let i = 0; i < cardSessionAttributes.commons_per_session + cardSessionAttributes.rares_per_session; i++) {
            this.cards.push(allOtherCards[Math.floor(Math.random() * (allOtherCards.length))]);
        }

        this.tallySession();
        return this;
    } catch (error) {
        console.log(error);
    }
}

const CardSession = mongoose.model('cardSession', cardSessionSchema);
module.exports = CardSession;