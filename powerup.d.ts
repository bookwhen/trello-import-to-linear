type GlobalTrello = { TrelloPowerUp: TrelloPowerUp };

type ExtendedWindow = Window & GlobalTrello;

type TrelloPowerUp = {
  Promise: PromiseConstructor;
  initialize: (config: TrelloInitConfig) => void;
}

type TrelloInitConfig = {
  ['board-buttons']?: (t: Trello, opts: any) => TrelloBoardButton[] | Promise<TrelloBoardButton[]>;
  ['card-buttons']?: (t: Trello, opts: any) => TrelloCardButton[] | Promise<TrelloCardButton[]>;
  ['list-sorters']?: (t: Trello) => TrelloListSorter[] | Promise<TrelloListSorter[]>;
}

type TrelloPowerUpShowCondition = 'admin' | 'edit' | 'readOnly' | 'signedIn' | 'signedOut' | 'always';

type TrelloBoardButton = {
  icon: { dark: string, light: string };
  text: string;
  condition: TrelloPowerUpShowCondition;
  callback: (t: Trello, opts: any) => void;
}

type TrelloCardButton = TrelloCardButtonUrl | TrelloCardButtonCallback;
type TrelloCardButtonUrl = {
  icon: string | null;
  text: string;
  condition: TrelloPowerUpShowCondition;
  url: string;
  target?: string;
}
type TrelloCardButtonCallback = {
  icon: string | null;
  text: string;
  condition: TrelloPowerUpShowCondition;
  callback: (t: Trello, opts: any) => void;
}

type TrelloListSorter = {
  text: string;
  callback: (t: Trello, opts: TrelloListOpts) => { sortedIds: ID[] };
}

type TrelloListOpts = {
  cards: TrelloCard[]
}

type TrelloPopupItem = {
  text: string;
  callback: (t: Trello, opts: any) => void;
}

type TrelloPopup      = (config: { title: string, items: TrelloPopupItem[] }) => void;
type TrelloPopupAsync = (config: { title: string, items: (t: Trello, opts: any) => Promise<TrelloPopupItem[]> }) => void;

type Trello = {
  list:  (key: 'all' | keyof TrelloList, ...keys: (keyof TrelloList)[]) => Promise<TrelloList>;
  lists: (key: 'all' | keyof TrelloList, ...keys: (keyof TrelloList)[]) => Promise<TrelloList[]>;
  card:  (key: 'all' | keyof TrelloCard, ...keys: (keyof TrelloCard)[]) => Promise<TrelloCard>;
  cards: (key: 'all' | keyof TrelloCard, ...keys: (keyof TrelloCard)[]) => Promise<TrelloCard[]>;
  popup: TrelloPopup & TrelloPopupAsync;
}

type ID = string;

type TrelloBoard = {
  id: ID;
  name: string;
  url: string;
  shortLink: string;
  members: string[];
  dateLastActivity: Date;
  idOrganization: string;
  customFields: string[];
  labels: TrelloLabel[];
}

type TrelloList = {
  id: ID;
  name: string;
  cards: TrelloCard[];
}

type TrelloCard = {
  id: ID;
  name: string;
  desc: string;
  due: Date;
  dueComplete: boolean;
  closed: boolean;
  labels: TrelloLabel[];
  url: string;
  shortLink: string;
  idList: string;
  badges: string;
  pos: string;
  attachments: TrelloAttachment[];
}

type TrelloAttachment = {
  id: ID;
  idMember: ID;
  name: string;
  url: string;
}

type TrelloLabel = {
  id: ID;
  idBoard: string;
  name: string;
  color: string;
}
