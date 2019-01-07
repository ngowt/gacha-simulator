const mongoose = require('mongoose');
const { cardSchema } = require('./card');
const { getCardList } = require('../services/cards');

const cardSessionSchema = mongoose.Schema(
    {
        cards_per_pack: {
            type: Number,
            default: 12
        },
        commons_per_pack: {
            type: Number,
            default: 8
        },
        uncommons_per_pack: {
            type: Number,
            default: 3
        },
        rares_per_pack: {
            type: Number,
            default: 1
        },
        heroes_per_pack: {
            type: Number,
            default: 1
        },
        items_per_pack: {
            type: Number,
            default: 2
        },
        current_session: {
            // num_packs_opened should not be an instance, since it accumulates
            num_packs_opened: {
                type: Number,
                default: 0
            },
            // total_money_spent should not be an instance, since it accumulates
            total_money_spent: {
                type: Number,
                default: 0
            },
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
    }
)
cardSessionSchema.methods.startOpenSession = async function() {
    const result = await getCardList();
    const validCards = result.filter(el => el.card_type !== "Stronghold" && el.card_type !== "Pathing"); 
    const heroes = validCards.filter(el => el.card_type === "Hero");
    const items = validCards.filter(el => el.card_type === "Item");
    
    for (let i = 0; i < this.heroes_per_pack; i++) {
        this.current_session.cards.push(heroes[Math.floor(Math.random() * (heroes.length))]);
    }
    
    for (let i = 0; i < this.items_per_pack; i++) {
        this.current_session.cards.push(items[Math.floor(Math.random() * (items.length))]);
    }

    for (let i = 0; i < this.commons_per_pack; i++) {
        this.current_session.cards.push(validCards[Math.floor(Math.random() * (validCards.length))]);
    }
    return this.current_session.cards;
}

const CardSession = mongoose.model('cardSession', cardSessionSchema);
module.exports = CardSession;