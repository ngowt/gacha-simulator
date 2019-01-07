const axios = require('axios');
const { Card } = require('../models/card');
const CardSet = require('../models/cardset');

async function getHeroList() {
    const result = await getCardList();
    return result.filter(el => el.card_type === "Hero");
}

async function getItemList() {
    const result = await getCardList();
    return result.filter(el => el.card_type === "Item");
}

async function getCardList() {
    try {
        const setIds = ["00", "01"];
        let result = await CardSet.findOne({ cardset_id: setIds[0] });
        if (!result || Date.now() >= new Date(result.expire_time * 1000)) {
            const pCardSet = setIds.map(async el => {
                const res = await getCardSet(el); 
                return new CardSet(res);
            });
            const cardSet = await Promise.all(pCardSet);
            const pCardList = cardSet.map(async el => {
                return await getCardsList(el.cdn_root, el.url)
            });
            let cardList = await Promise.all(pCardList);
            cardList = cardList.reduce((a, b) => { return a.concat(b) });
            await CardSet.remove({});
            await CardSet.insertMany(cardSet);
            await Card.remove({});
            await Card.insertMany(cardList);
        }
        return await Card.find({});
    } catch (error) {
        console.log(error);
    }
}

async function getCardsList(root, url) {
    try {
        const res = await axios.get(`${root}${url}`);
        return res.data.card_set.card_list;
    } catch (error) {
        console.log(error);
    }
}

async function getCardSet(id) {
    try {
        let res = await axios.get(`https://playartifact.com/cardset/${id}/`);
        res.data.cardset_id = id;
        return res.data;
    } catch(ex) {
        console.log(ex);
    }
}

module.exports = { getCardList, getItemList, getHeroList };