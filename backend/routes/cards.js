const express = require('express');
const getCardList = require('../services/cards');
const router = express.Router();

router.get('/', getCards);

async function getCards(req, res) {
    const cardList = await getCardList();
    return res.status(200).send(cardList);
}


module.exports = router;