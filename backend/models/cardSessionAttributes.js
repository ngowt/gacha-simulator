const mongoose = require('mongoose');

const cardSessionAttributesSchema = mongoose.Schema(
    {
        cards_per_session: {
            type: Number,
            default: 12
        },
        commons_per_session: {
            type: Number,
            default: 8
        },
        uncommons_per_session: {
            type: Number,
            default: 3
        },
        rares_per_session: {
            type: Number,
            default: 1
        },
        heroes_per_session: {
            type: Number,
            default: 1
        },
        items_per_session: {
            type: Number,
            default: 2
        }
    }
);

const CardSessionAttributes = mongoose.model('cardSessionAttributes', cardSessionAttributesSchema);
module.exports = CardSessionAttributes;