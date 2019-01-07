const express = require('express');
const CardSession = require('../models/cardSession');
const router = express.Router();

router.get('/', startNewSession);

async function startNewSession(req, res) {
    const session = await CardSession().startOpenSession();
    if (!session) { return res.status(404).send("Unable to retrieve cards") };
    await session.save();
    return res.status(200).send(session);
}

module.exports = router;