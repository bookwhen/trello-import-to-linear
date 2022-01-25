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
      return t.card('all').then(function (card) {
        return [
          makeCopyToLinearCardButton(card)
        ];
      });
    }
  };
}

/**
 * @param {TrelloCard} card
 * @returns {TrelloCardButton}
 **/
function makeCopyToLinearCardButton(card) {
  var url = 'https://trello.com/c/' + card.shortLink;
  var title = card.name;
  var mdDesc = card.desc;
  var formattedAttachments = card.attachments
    .map(attachment => `[${attachment.name}](${attachment.url})`)
    .join("\n");

  var description = `${mdDesc}${
    formattedAttachments && `\n\nAttachments:\n${formattedAttachments}`
  }\n\n[View original card in Trello](${url})`;

  var labels = card.labels.map(l => l.name);

  var linearUrl = new URL('https://linear.app/bookwhen/team/DEV/new')
  linearUrl.searchParams.set('title', title);
  linearUrl.searchParams.set('description', description);
  linearUrl.searchParams.set('status', 'Backlock');
  linearUrl.searchParams.set('project', 'From Trello');
  linearUrl.searchParams.set('labels', labels.join(','));

  return {
    icon: icon,
    text: 'Open in Linear',
    condition: 'edit',
    url: linearUrl.toString(),
    target: '_blank'
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
