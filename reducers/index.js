import {
  ADD_CARD,
  ADD_DECK,
  GET_DECKS,
  SAVE_QUIZ,
  GET_CARDS, DELETE_QUIZ
} from '../actions'

function decks (state = {}, action) {
  const {card, cards, deck, decks = {}, deckTitle} = action
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: state[deckTitle].questions.concat(card)
        }
      }
    case ADD_DECK:
      return {
        ...state,
        [deckTitle]: {
          title: deckTitle,
          questions: []
        }
      }
    case GET_CARDS:
      return {
        ...state,
        [deck.title]: {
          ...state[deckTitle],
          questions: cards
        }
      }
    case GET_DECKS:
      return decks
    case SAVE_QUIZ:
      const { oldState } = action
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          oldState
        }
      }
    case DELETE_QUIZ:
      delete state[deckTitle].oldState
      return {
        ...state
      }
    default:
      return state
  }
}

export default decks