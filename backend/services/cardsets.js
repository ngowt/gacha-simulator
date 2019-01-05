const axios = require('axios');

async function getCardSet(id) {
    try {
        let res = await axios.get(`https://playartifact.com/cardset/${id}/`);
        res.data.cardset_id = id;
        return res.data;
    } catch(ex) {
        console.log(ex);
    }
}

module.exports = getCardSet;