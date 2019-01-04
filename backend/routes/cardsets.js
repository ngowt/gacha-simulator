const axios = require('axios');
const express = require('express');
const CardSet = require('../models/cardset');
const router = express.Router();

router.get('/:id', getCardSet);

async function getCardSet(req, res) {
    try {
        let cardset = await CardSet.findOne({
            cardset_id: req.params.id
        });
        if (!cardset) {
            console.log("No documents existing in DB, calling valve cardset API");
            let result = await axios.get(`https://playartifact.com/cardset/${req.params.id}/`);
            result.data.cardset_id = req.params.id;
            cardSet = new CardSet(result.data);
            await cardSet.save();
        } else {
            if (Date.now() >= new Date(cardset.expire_time * 1000)) {
                console.log("Document expired, calling valve cardset API");
                let result = await axios.get(`https://playartifact.com/cardset/${req.params.id}/`);
                result.data.cardset_id = req.params.id;
                cardSet = new CardSet(result.data);
                await CardSet.updateOne({ cardset_id: req.params.id }, {
                    $set: {
                        cdn_root: cardSet.cdn_root,
                        url: cardSet.url,
                        expire_time: cardSet.expire_time
                    }
                }, { new: true});
            }
        }
        return res.status(200).send(cardSet);
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;