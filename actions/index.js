export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const GET_CARDS = 'GET_CARDS'
export const GET_DECKS = 'GET_DECKS'

export function addCardRedux (card, deckTitle) {
  return {
    type: ADD_CARD,
    deckTitle,
    card,
  }
}

export function addDeckRedux (deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function getCardsRedux (deckTitle, cards) {
  return {
    type: GET_CARDS,
    deckTitle,
    cards,
  }
}

export function getDecksRedux (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}