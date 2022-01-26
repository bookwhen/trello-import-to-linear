// @ts-check
var TrelloPowerUp = /** @type {ExtendedWindow} */(window).TrelloPowerUp;

console.log('henlo, am client');

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
    icon: null,
    text: 'Open in Linear',
    condition: 'edit',
    url: linearUrl.toString(),
    target: '_blank'
  };
}
