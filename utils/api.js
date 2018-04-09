import { AsyncStorage } from 'react-native'

const STORAGE_KEY = "MobileFlashCards:decks"
const QUIZ_KEY = "MobileFlashCards:quiz"

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((decks) => JSON.parse(decks))
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(card, deckTitle) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckTitle].questions.push(card)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function getQuizState(deckName) {
  return AsyncStorage.getItem(QUIZ_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      if(data) {
        return data[deckName]
      } else {
        return {}
      }
      }
    )
}

export function saveQuizState(deckName, state) {
  delete state.questionQtd
  return AsyncStorage.mergeItem(QUIZ_KEY, JSON.stringify({
    [deckName]: {
      ...state
    }
  })).then(()=> state)
}

export function deleteQuizState(deckName) {
  return AsyncStorage.getItem(QUIZ_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckName] = undefined
      delete data[deckName]
      AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(data))
    })
}