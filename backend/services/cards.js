const axios = require('axios');
const getCardSet = require('./cardsets');

async function getCardList() {
    try {
        const cardSets = await getCardSet();
        const pCardList = cardSets.map(async el => {
            let result = await axios.get(el.cdn_root + el.url);
            return result.data.card_set.card_list; 
        });
        const cardList = await Promise.all(pCardList);
        return cardList.reduce((a, b) => { return a.concat(b) });
    } catch(ex) {
        console.log(ex);
    }
}

module.exports = getCardList;