const axios = require("axios");
const { Card } = require("../models/card");
const CardSet = require("../models/cardset");

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
      const pCardSet = setIds.map(async setId => {
        const res = await fetchArtifactCardSet(setId);
        return new CardSet(res);
      });
      const cardSets = await Promise.all(pCardSet);
      const pCardList = cardSets.map(async cardSet => {
        return await fetchArtifactCards(cardSet.cdn_root, cardSet.url);
      });
      const cardList = await Promise.all(pCardList);
      const cards = cardList.reduce((a, b) => {
        return a.concat(b);
      });
      await CardSet.remove({});
      await CardSet.insertMany(cardSets);
      await Card.remove({});
      await Card.insertMany(cards);
    }
    return await Card.find({});
  } catch (error) {
    console.log(error);
  }
}

async function fetchArtifactCards(root, url) {
  try {
    const res = await axios.get(`${root}${url}`);
    return res.data.card_set.card_list;
  } catch (error) {
    console.log(error);
  }
}

async function fetchArtifactCardSet(id) {
  try {
    let res = await axios.get(`https://playartifact.com/cardset/${id}/`);
    res.data.cardset_id = id;
    return res.data;
  } catch (ex) {
    console.log(ex);
  }
}

module.exports = { getCardList, getItemList, getHeroList };
