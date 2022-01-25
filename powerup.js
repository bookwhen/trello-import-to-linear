// @ts-check
var TrelloPowerUp = /** @type {ExtendedWindow} */(window).TrelloPowerUp;

console.log('henlo, am client');

var icon = 'https://henryblyth.com/images/watercolour-circle-light.svg';

window.Promise = TrelloPowerUp.Promise; // for browser compatibility

TrelloPowerUp.initialize(makeConfig());

/** @returns {TrelloInitConfig} */
function makeConfig() {
  return {
    'card-buttons': function (t, opts) {
      console.log('card-buttons initialize', arguments);
      return [
        makeCopyToLinearCardButton()
      ];
    }
  };
}

/** @returns {TrelloCardButton} */
function makeCopyToLinearCardButton() {
  return {
    icon: icon,
    text: 'Copy to Linear',
    condition: 'edit',
    callback: function (t, opts) {
      console.log('card-buttons callback', arguments);
      return t.card('all').then(function (card) {
        console.log(JSON.stringify(card, null, 2));
      });
    },
  };
}

/**
 * @param {Trello} t
 * @returns {Promise<TrelloCard[]>}
 */
function getAllBoardCards(t) {
  return t.lists('id', 'name', 'cards').then(function (lists) {
    console.log(lists.map(l => `${l.name} (${l.cards.length})`));
    return lists.map(list => list.cards).flat();
  });
}

/**
 * @param {Trello} t
 * @returns {Promise<TrelloPopupItem[]>}
 */
function getUpNextItems(t) {
  return new Promise(function (resolve, reject) {
    console.log('popup items, return promise');

    console.log('fetching lists…');
    return getAllBoardCards(t).then(function (cards) {
      var cardItems = cards.map(function (card) {
        return {
          text: card.name,
          callback: function (t, opts) {
            console.log('chosen', card.name, card.id);
          }
        };
      });
      return resolve(cardItems);
    });
  });
}
