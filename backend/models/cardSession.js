const mongoose = require("mongoose");
const { cardSchema } = require("./card");
const CardSessionAttributes = require("./cardSessionAttributes");
const { getCardList } = require("../services/cards");

const KNOWN_CARD_TYPES = {
  HERO: "Hero",
  ITEM: "Item",
  PATHING: "Pathing",
  STRONGHOLD: "Stronghold",
  OTHER: "Other"
};

const get_random = max => Math.floor(Math.random() * max);

const pluckCards = (cards, length) =>
  Array.from({ length }, get_random(cards.length)).map(id => cards[id]);

const groupByType = (acc, card) => {
  const { card_type } = card;
  const currentItems = !!acc[type] ? acc[type] : [];
  const type = !!KNOWN_CARD_TYPES[card_type]
    ? card_type
    : KNOWN_CARD_TYPES.OTHER;

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

    const others_per_session = commons_per_session + rares_per_session;

    const result = await getCardList();
    const cardsByType = result.reduce(groupByType, {});

    this.cards = [
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.HERO], heroes_per_session),
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.ITEM], items_per_session),
      ...pluckCards(cardsByType[KNOWN_CARD_TYPES.OTHER], others_per_session)
    ];

    this.tallySession();
    return this;
  } catch (error) {
    console.log(error);
  }
};

const CardSession = mongoose.model("cardSession", cardSessionSchema);
module.exports = CardSession;
