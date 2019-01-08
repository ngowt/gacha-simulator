const express = require('express');
const { getCardList, getItemList, getHeroList } = require('../services/cards');
const asyncAwaitMiddleware = require('../middleware/asyncAwait');
const router = express.Router();

router.get('/', asyncAwaitMiddleware(getAllCards));
router.get('/items/', asyncAwaitMiddleware(getAllItemCards));
router.get('/heroes/', asyncAwaitMiddleware(getAllHeroCards));

async function getAllCards(req, res) {
    const result = await getCardList();
    if (!result) { return res.status(404).send('Unable to fetch list of cards') };
    return res.status(200).send(result);
}

async function getAllHeroCards(req, res) {
    const result = await getHeroList();
    if (!result) { return res.status(404).send('Unable to fetch list of cards') };
    return res.status(200).send(result);
}

async function getAllItemCards(req, res) {
    const result = await getItemList();
    if (!result) { return res.status(404).send('Unable to fetch list of cards') };
    return res.status(200).send(result);
}

module.exports = router;