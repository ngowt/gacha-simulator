const mongoose = require('mongoose');
const Cardset = mongoose.model('cardset', mongoose.Schema(
    {
        cardset_id: {
            type: String
        },
        cdn_root: {
            type: String
        },
        url: {
            type: String
        },
        expire_time: {
            type: Number
        }
    }
));

module.exports = Cardset;