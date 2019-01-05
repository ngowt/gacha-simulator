const express = require('express');
const CardSet = require('../models/cardset');
const getCardSet = require('../services/cardsets');
const router = express.Router();

router.get('/:id', getCardSets);

async function getCardSets(req, res) {
    try {
        let cardSet = await CardSet.findOne({ cardset_id: req.params.id });
        if (!cardSet) {
            const res = await getCardSet(req.params.id);
            cardSet = new CardSet(res);
            await cardSet.save();
        }
        if (Date.now() >= new Date(cardSet.expire_time * 1000)) {
            const res = await getCardSet(req.params.id);
            cardSet = new CardSet(res);
            await CardSet.updateOne({ cardset_id: req.params.id }, {
                $set: {
                    cdn_root: cardSet.cdn_root,
                    url: cardSet.url,
                    expire_time: cardSet.expire_time
                }
            }, { new: true});
        }
        return res.status(200).send(cardSet);
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;