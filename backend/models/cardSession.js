const mongoose = require("mongoose");
const { cardSchema } = require("./card");
const CardSessionAttributes = require("./cardSessionAttributes");
const { getCardList } = require("../services/cards");

const KNOWN_CARD_TYPES = {
  Hero: "Hero",
  Item: "Item",
  Pathing: "Pathing",
  Stronghold: "Stronghold",
  Other: "Other"
};

const get_random = max => Math.floor(Math.random() * max);

const pluckCards = (cards, length) => {
  return Array.from({ length }, () => get_random(cards.length)).map(
    id => cards[id]
  );
};

const groupByType = (acc, card) => {
  const { card_type } = card;
  const type = !!KNOWN_CARD_TYPES[card_type]
    ? card_type
    : KNOWN_CARD_TYPES.Other;
  const currentItems = !!acc[type] ? acc[type] : [];
  return {
    ...acc,
    [type]: [...currentItems, card]
  };
};

const cardSessionSchema = mongoose.Schema({
  num_commons: {
    type: Number,
    default: 0
  },
  num_uncommons: {
    type: Number,
    default: 0
  },
  num_rares: {
    type: Number,
    default: 0
  },
  num_items: {
    type: Number,
    default: 0
  },
  num_heroes: {
    type: Number,
    default: 0
  },
  cards: {
    type: [cardSchema]
  }
});

cardSessionSchema.methods.tallySession = function() {
  const cardTypes = (acc, card) => {
    const { card_type: type } = card;
    const updatedValue = !!acc[type] ? acc[type] + 1 : 1;
    return { ...acc, [type]: updatedValue };
  };
  return this.cards.reduce(cardTypes, {});
};

cardSessionSchema.methods.startOpenSession = async function() {
  try {
    const {
      heroes_per_session,
      items_per_session,
      commons_per_session,
      rares_per_session
    } = new CardSessionAttributes();

    console.log(heroes_per_session);
    const others_per_session = commons_per_session + rares_per_session;

    const result = await getCardList();
    const cardsByType = result.reduce(groupByType, {});
    this.cards = [
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.Hero], heroes_per_session),
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.Item], items_per_session),
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.Other], others_per_session)
    ];
    this.tallySession();
    return this;
  } catch (error) {
    console.log(error);
  }
};

const CardSession = mongoose.model("cardSession", cardSessionSchema);
module.exports = CardSession;
