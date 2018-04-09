import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {gray, white, red, green, blue} from '../utils/colors'
import { connect } from 'react-redux'
import { CommonStyles } from '../utils/styles'
import { deleteQuizState, saveQuizState } from '../utils/api'
import {deleteQuizStateRedux, saveQuizStateRedux} from '../actions'

class Quiz extends Component {
    state = {
      currentCount: 0,
      questionQtd: this.props.deck.questions.length,
      showAnswer: false,
      correct: 0,
      incorrect: 0,
      showResults: false
    }


  static navigationOptions = () => {
    return {
      title: 'Quiz',
    }
  }

  showAnswer() {
    this.setState({showAnswer: true});
  }

  componentDidMount() {
    const { title } = this.props.deck
    if(this.props.continueQuiz && this.state.currentCount === 0) {
      this.setState({...this.props.deck.oldState})
    } else {
      deleteQuizState(title)
        .then(()=> this.props.dispatchDeleteQuis(title))
    }
  }

  componentDidUpdate(){
      const { title } = this.props.deck
      if(this.props.currentCountStored < this.state.currentCount && !this.state.showResults) {
        saveQuizState(title, {...this.state})
          .then((savedState) => {
            this.props.dispatchQuizState(title, {...savedState})
          })
      } else if(this.state.showResults) {
        deleteQuizState(title)
          .then(()=> this.props.dispatchDeleteQuis(title))
      }
  }

  increment(option) {
      const { currentCount, questionQtd } = this.state
      if(currentCount < (questionQtd - 1)) {
        this.setState({[option]: this.state[option] + 1, currentCount: currentCount + 1, showAnswer: false})
      } else {
        this.setState({[option]: this.state[option] + 1, currentCount: currentCount + 1, showResults: true})
      }
  }

  render() {
      const QuestionCard = () => (
        <View>
          <View style={componentStyle.counter}>
            <Text style={componentStyle.counterLabel}>{currentCount + 1}/{questionQtd}</Text>
          </View>
          <View style={CommonStyles.card}>
            <Text style={componentStyle.question}>{currentQuestion.question}</Text>
            {!showAnswer ?
              <TouchableOpacity
                style={componentStyle.smallBtn}
                onPress={() => this.showAnswer()}
              >
                <Text  style={[componentStyle.label, {color: red}]}>See answer</Text>
              </TouchableOpacity> : <AnswerCard />}
          </View>
        </View>
    )

    const AnswerCard = () => (
      <View>
        <Text style={[componentStyle.question, {marginLeft: 20}]}>Answer: {currentQuestion.answer}</Text>
        <TouchableOpacity style={componentStyle.smallBtn}>
        </TouchableOpacity>
        <View style={componentStyle.inlineBtn}>
          <TouchableOpacity
            style={[componentStyle.btn, {backgroundColor: green}]}
            onPress={() => this.increment('correct')}
          >
            <Text  style={componentStyle.btnLabel}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[componentStyle.btn, {backgroundColor: red}]}
            onPress={() => this.increment('incorrect')}
          >
            <Text  style={componentStyle.btnLabel}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    const Results = () => {

      const { correct, incorrect, questionQtd } = this.state

      const percentCorrect = ((correct/questionQtd)*100).toFixed(2)
      const percentIncorrect = ((incorrect/questionQtd)*100).toFixed(2)

      return (
        <View>
          <View style={componentStyle.counter}>
            <Text style={componentStyle.counterLabel}>🏁 Finished 🏁</Text>
          </View>
          <View style={CommonStyles.card}>
            <Text style={[componentStyle.resultsLabel, {fontWeight: 'bold'}]}>Congratulations you finished the quiz</Text>
            <Text style={[componentStyle.resultsLabel, {color: green}]}>You got {correct} questions ({percentCorrect}%)</Text>
            <Text style={[componentStyle.resultsLabel, {color: red}]}>You miss {incorrect} questions ({percentIncorrect}%)</Text>
            <View style={componentStyle.inlineBtn}>
              <TouchableOpacity
                style={[componentStyle.smallerBtn, {backgroundColor: blue}]}
                onPress={() => this.setState({
                  currentCount: 0,
                  showAnswer: false,
                  correct: 0,
                  incorrect: 0,
                  showResults: false})}
              >
                <Text style={componentStyle.smallerBtnLabel}>Restart quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[componentStyle.smallerBtn, {backgroundColor: blue}]}
                onPress={() => this.props.goBack()}
              >
                <Text style={componentStyle.smallerBtnLabel}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    const { showAnswer, questionQtd, currentCount, showResults } = this.state
    const { deck } = this.props
    const currentQuestion = deck.questions[currentCount]

    return (
      <View>
        {!showResults ? <QuestionCard/> : <Results/>}
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const deck = state[navigation.state.params.deckTitle]
  const currentCountStored = deck.hasOwnProperty('oldState') ? deck.oldState.currentCount : 0
  return {
    deck,
    continueQuiz: navigation.state.params.continueQuiz,
    currentCountStored
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    goBack: () => navigation.goBack(),
    dispatchQuizState: (deckTitle, oldState) => dispatch(saveQuizStateRedux(deckTitle, oldState)),
    dispatchDeleteQuis: (deckTitle) => dispatch(deleteQuizStateRedux(deckTitle))
  }
}

const componentStyle = StyleSheet.create({
  counter: {
    backgroundColor: gray,
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  question: {
    fontSize: 25,
    marginVertical: 10
  },
  smallerBtn: {
    paddingVertical: 10,
    width: 120,
    margin: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  smallerBtnLabel: {
    fontSize: 16,
    color: white,
    fontWeight: 'bold'
  },
  smallBtn: {
    alignItems: 'center',
    margin: 30
  },
  btn: {
    paddingVertical: 10,
    width: 150,
    margin: 15,
    alignItems: 'center'
  },
  btnLabel: {
    color: white,
    fontSize: 20,
  },
  counterLabel: {
    color: white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inlineBtn: {
    flexDirection: 'row',
  },
  resultsLabel: {
    padding: 10,
    fontSize: 16
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
