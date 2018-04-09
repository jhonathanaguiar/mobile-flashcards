import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { CommonStyles } from '../utils/styles'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeckRedux } from '../actions'

class AddDeckForm extends Component {

  state = {
    name: '',
    error: 0, //0 = no errors, 1 = no name, 2 = existing name
  }

  handleChange(text) {
    const { decks } = this.props
    if(this.state.error === 1){
      this.setState({name: text, error: 0});
    } else if(this.state.error === 2 && !decks.hasOwnProperty(text)) {
      this.setState({name: text, error: 0})
    }else {
      this.setState({
        name: text
      });
    }
  }

  submit() {
    const { name } = this.state
    const { decks } = this.props
    if(name !== ''){
      if(!decks.hasOwnProperty(name)) {
        saveDeckTitle(name)
          .then(() => {
            this.props.dispatchDeck(name)
          })
          .then(() => {this.setState({name: ''})})
          .then(() => {
            this.props.goBack()
          })
      } else {
        this.setState({error: 2})
      }
    } else {
      this.setState({error: 1})
    }
  }

  render(){
    const { name, error } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={CommonStyles.container}>
        <Text style={CommonStyles.title}>What is the title of the new deck?</Text>
        <TextInput
          style={CommonStyles.inputField}
          placeholder={"Deck name"}
          value={name}
          onChangeText={(text) => this.handleChange(text)}
          autoCapitalize={"sentences"}
          returnKeyType={"next"}/>
        <TouchableOpacity
          style={CommonStyles.submitButton}
          onPress={() => this.submit()}
        >
          <Text style={CommonStyles.submitLabel}>Submit</Text>
        </TouchableOpacity>
        {error === 2 && <Text style={CommonStyles.errorMessage}>There's already a deck with this name, please try another one</Text>}
        {error === 1 && <Text style={CommonStyles.errorMessage}>Please type a name for the deck</Text>}
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state){
  return {decks: state}
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    dispatchDeck: (deckTitle) => dispatch(addDeckRedux(deckTitle))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddDeckForm)