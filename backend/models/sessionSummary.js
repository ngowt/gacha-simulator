const mongoose = require('mongoose');
const { cardSchema } = require('./card');

const sessionSummarySchema = mongoose.Schema(
    {
        num_packs_opened: {
            type: Number,
            default: 0
        },
        total_money_spent: {
            type: Number,
            default: 0
        },
        cards: {
            type: [cardSchema]
        }
    }
);

const SessionSummary = mongoose.model('sessionSummary', sessionSummarySchema);
module.exports = SessionSummary;