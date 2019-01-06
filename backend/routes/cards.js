const express = require('express');
const getCardList = require('../services/cards');
const router = express.Router();

router.get('/', getCards);

async function getCards(req, res) {
    const cardList = await getCardList();
    if (!cardList) { return res.status(404).send('Unable to fetch list of cards') };
    return res.status(200).send(cardList);
}

module.exports = router;   