export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'
export const GET_CARDS = 'GET_CARDS'
export const SAVE_QUIZ = 'SAVE_QUIZ'
export const DELETE_QUIZ = 'DELETE_QUIZ'

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

export function getDecksRedux (decks) {
  return {
    type: GET_DECKS,
    decks,
  }
}

export function saveQuizStateRedux (deckTitle, oldState) {
  return {
    type: SAVE_QUIZ,
    deckTitle,
    oldState
  }
}

export function deleteQuizStateRedux (deckTitle) {
  return {
    type: DELETE_QUIZ,
    deckTitle,
  }
}