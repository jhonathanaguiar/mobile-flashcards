import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CommonStyles } from '../utils/styles'
import { connect } from 'react-redux'
import { gray, blue, white, green } from '../utils/colors'

class DeckDetails extends Component {
  static navigationOptions = () => {
    return {
      title: 'Deck details'
    }
  }
  render(){
    const { title, deck } = this.props
    return(
      <View style={CommonStyles.container}>
        <Text style={componentStyle.title}>{title}</Text>
        <Text style={componentStyle.subtitle}>{deck.questions.length} cards</Text>
        <TouchableOpacity
          style={[componentStyle.btn, {backgroundColor: blue}]}
          onPress={() => this.props.goToAddCard(title)}
        >
          <Text style={componentStyle.btnLabel}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[componentStyle.btn, {backgroundColor: green}]}
          onPress={() => this.props.goToQuiz(title)}
        >
          {!!deck.questions.length && <Text style={componentStyle.btnLabel}>Start Quiz</Text>}
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { title } = navigation.state.params

  return {
    deck: state[title],
    title
  }
}

function mapDispatchToProps (dispatch, { navigation }){
  return {
    goBack: () => navigation.goBack(),
    goToAddCard: (deckTitle) => navigation.navigate('AddCard', {deckTitle: deckTitle}),
    goToQuiz: (deckTitle) => navigation.navigate('Quiz', {deckTitle: deckTitle})
  }
}

const componentStyle = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    color: gray,
    marginBottom: 10
  },
  btn: {
    backgroundColor: blue,
    marginVertical: 10
  },
  btnLabel: {
    color: white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontSize: 15,
    fontWeight: 'bold'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)