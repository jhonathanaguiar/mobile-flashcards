import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform, TouchableOpacity, FlatList } from 'react-native'
import { gray } from '../utils/colors'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { getDecksRedux } from '../actions'
import { CommonStyles } from '../utils/styles'

class Decks extends Component {

  _keyExtractor = (item) => this.props.decks[item].title

  componentDidMount() {
    getDecks()
      .then((decks) =>{
        if(decks !== null) this.props.updateDecks(JSON.parse(decks))
      })

  }

  renderCard = (deckName) => {

    const deck = this.props.decks[deckName.item]
    return (
      <View>
        <TouchableOpacity
            style={CommonStyles.card}
            onPress={() => this.props.toDeckDetails(deck)}
          >
          <Text style={componentStyle.title}>{deck.title}</Text>
          <Text style={componentStyle.subtitle}>{deck.questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    const { decks = {} }  = this.props
    const listTitle = Object.keys(decks)
    return (
      <View style={{marginBottom: Platform.OS === 'ios' ? 48 : 0}}>
        <Text style={componentStyle.header}>{!!listTitle.length ? "Select a deck bellow" : "No Decks to show :("}</Text>
        {!!listTitle.length &&
          <FlatList
            data={listTitle}
            keyExtractor={this._keyExtractor}
            renderItem={(deckName) => this.renderCard(deckName)}
          />
        }
      </View>
    )
  }

}

function mapStateToProps(state = {}) {
  return {decks: state}
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    toDeckDetails: (deck) => navigation.navigate('DeckDetails', {title: deck.title}),
    goBack: () => navigation.goBack(),
    updateDecks: (decks) => dispatch(getDecksRedux(decks))
  }
}

const componentStyle = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 5,
    alignSelf: 'center'
  },
  title: {
    fontSize:20,
    fontWeight: 'bold'
  },
  subtitle: {
    color: gray,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Decks)