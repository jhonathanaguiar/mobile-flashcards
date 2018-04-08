import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { CommonStyles } from '../utils/styles'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeckRedux } from '../actions'

class AddDeckForm extends Component {

  state = {
    name: '',
    noName: false,
    existingName: false
  }

  handleChange(text) {
    const { decks } = this.props
    if(this.state.noName){
      this.setState({name: text, noName: false});
    } else if(this.state.existingName && !decks.hasOwnProperty(text)) {
      this.setState({name: text, existingName: false})
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
        this.setState({existingName: true})
      }
    } else {
      this.setState({noName: true})
    }
  }

  render(){
    const { name, existingName, noName } = this.state
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
        {existingName && <Text style={CommonStyles.errorMessage}>There's already a deck with this name, please try another one</Text>}
        {noName && <Text style={CommonStyles.errorMessage}>Please type a name for the deck</Text>}
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