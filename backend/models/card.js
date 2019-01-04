const mongoose = require('mongoose');
const Card = mongoose.model('card', mongoose.Schema(
    {
        card_id: {
            type: Number
        },
        base_card_id: {
            type: Number
        },
        card_type: {
            type: String
        },
        card_name: {
            english: {
                type: String
            }
        },
        card_text: {
            english: {
                type: String
            }
        },
        mini_image: {
            default: {
                type: String
            }
        },
        large_image: {
            default: {
                type: String
            }
        },
        ingame_image: {
            default: {
                type: String
            }
        }
    }
));

module.exports = Card;