const axios = require('axios');
const express = require('express');
const CardSet = require('../models/cardset');
const router = express.Router();

router.get('/:id', getCardSet);

async function getCardSet(req, res) {
    try {
        const cardset = await CardSet.findOne({
            cardset_id: req.params.id
        });
        if (!cardset) {
            const result = await axios.get(`https://playartifact.com/cardset/${req.params.id}/`);
            result.data.cardset_id = req.params.id;
            cardSet = new CardSet(result.data);
            await cardSet.save();
            return res.status(200).send(cardSet);
        }
        return res.status(200).send(cardset);
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;