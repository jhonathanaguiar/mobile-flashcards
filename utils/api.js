import { AsyncStorage } from 'react-native'

const STORAGE_KEY = "MobileFlashCards:decks"

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
}

export function getDeck(title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((decks) => {
      return decks[title]
  })
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

export function clean() {
  return AsyncStorage.clear()
}