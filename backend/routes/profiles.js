const express = require('express');
const Profile = require('../models/profile');
const asyncAwaitMiddleware = require('../middleware/asyncAwait');
const router = express.Router();

router.post('/', asyncAwaitMiddleware(insertProfile));

async function insertProfile(req, res) {
    const result = await Profile.findOne({ name: req.body.name.toLowerCase() });
    if (result) return res.status(400).send('This profile already exists');
    const profile = new Profile({
        name: req.body.name.toLowerCase(),
        num_packs: req.body.num_packs
    });
    await profile.save();   
    return res.status(200).send(profile);
}

module.exports = router;