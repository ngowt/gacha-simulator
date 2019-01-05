const axios = require('axios');
const CardSet = require('../models/cardset'); 

async function getCardSets() {
    let cardSets = [];
    const setIds = ["00", "01"];
    for (let i = 0; i < setIds.length; i++) {
        try {
            let cardSet = await CardSet.findOne({ cardset_id: setIds[i] });
            if (!cardSet) {
                const res = await getCardSet(setIds[i]);
                cardSet = new CardSet(res);
                await cardSet.save();
            }
            if (Date.now() >= new Date(cardSet.expire_time * 1000)) {
                const res = await getCardSet(setIds[i]);
                cardSet = new CardSet(res);
                await CardSet.updateOne({ cardset_id: setIds[i] }, {
                    $set: {
                        cdn_root: cardSet.cdn_root,
                        url: cardSet.url,
                        expire_time: cardSet.expire_time
                    }
                }, { new: true});
            }
            cardSets.push(cardSet);
        } catch (error) {
            console.log(error);
        }
    }
    return cardSets;
}

async function getCardSet(id) {
    try {
        let res = await axios.get(`https://playartifact.com/cardset/${id}/`);
        res.data.cardset_id = id;
        return res.data;
    } catch(ex) {
        console.log(ex);
    }
}

module.exports = getCardSets;