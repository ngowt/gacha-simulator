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
  const { card_type: type } = card;

  if (KNOWN_CARD_TYPES[type] === undefined)
    return {
      ...acc,
      [KNOWN_CARD_TYPES.OTHER]: [...acc[KNOWN_CARD_TYPES.OTHER], card]
    };

  return { ...acc, [type]: [...acc[type], card] };
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
  const cardTypes = (acc, card) => ({
    ...acc,
    [card.type]: acc[card.type] + 1
  });

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
