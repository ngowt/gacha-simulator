const express = require('express');
const CardSession = require('../models/cardSession');
const router = express.Router();

router.get('/', startNewSession);

async function startNewSession(req, res) {
    const cardSession = new CardSession();
    const cards = await cardSession.startOpenSession();
    if (!cards) { return res.status(404).send("Unable to retrieve cards") };
    return res.status(200).send(cards);
}

module.exports = router;