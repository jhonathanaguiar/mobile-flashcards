import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { CommonStyles } from '../utils/styles'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { addCardRedux } from '../actions'

class AddCardForm extends Component {

  state = {
    question: '',
    answer: '',
    noQuestion: false,
    noAnswer: false
  }

  static navigationOptions = () => {
    return {
      title: 'Add card'
    }
  }

  handleChange(text, property) {
    const { noQuestion, noAnswer } = this.state
    if(noQuestion){
      this.setState({[property]: text, noQuestion: false});
    } else if(noAnswer) {
      this.setState({[property]: text, noAnswer: false})
    }else {
      this.setState({
        [property]: text
      });
    }
  }

  submit() {
    const { question, answer } = this.state
    const { deckTitle } = this.props
    if(question !== ''){
        if(answer !== '') {
          const card = {question, answer}
          addCardToDeck(card, deckTitle)
            .then((result) => {
              this.props.dispatchCard(card, deckTitle)
            })
            .then(() => {
              this.setState({question: '', answer: ''})
            })
            .then(() => {
              this.props.goBack()
            })
        } else {
          this.setState({noAnswer: true})
        }
    } else {
        this.setState({noQuestion: true})
    }
  }

  render() {
    const { answer, question, noAnswer, noQuestion } = this.state
    return(
      <KeyboardAvoidingView behavior="padding" style={CommonStyles.container}>
        <Text style={CommonStyles.title}>Question</Text>
        <TextInput
          style={CommonStyles.inputField}
          placeholder={"Type here"}
          value={question}
          onChangeText={(text) => this.handleChange(text, 'question')}
        />
        {noQuestion && <Text style={CommonStyles.errorMessage}>Please, insert the question of the card</Text>}
        <Text style={CommonStyles.title}>Answer</Text>
        <TextInput
          style={CommonStyles.inputField}
          placeholder={"Type here"}
          value={answer}
          onChangeText={(text) => this.handleChange(text, 'answer')}
        />
        {noAnswer && <Text style={CommonStyles.errorMessage}>Please, insert the answer</Text>}
        <TouchableOpacity
          style={CommonStyles.submitButton}
          onPress={() => this.submit()}
        >
          <Text style={CommonStyles.submitLabel}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    deckTitle: navigation.state.params.deckTitle
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    dispatchCard: (card, deckTitle) => dispatch(addCardRedux(card, deckTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCardForm)