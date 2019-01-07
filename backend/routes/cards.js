const express = require('express');
const { getCardList, getItemList, getRandomItem, getHeroList, getRandomHero } = require('../services/cards');
const router = express.Router();

router.get('/', getAllCards);
router.get('/items/', getAllItemCards)
router.get('/heroes/', getAllHeroCards)

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

async function getRandomHeroCard(req, res) {
    const result = await getRandomHero();
    if (!result) { return res.status(404).send('Unable to fetch cards') };
    return res.status(200).send(result);
}

async function getRandomItemCard(req, res) {
    const result = await getRandomItem();
    if (!result) { return res.status(404).send('Unable to fetch card') };
    return res.status(200).send(result);
}



module.exports = router;