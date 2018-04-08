import { Platform, StyleSheet } from 'react-native'
import { darkRed, lightRed, purple, white } from './colors'

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputField: {
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
    padding: 10,
    margin: 10,
  },
  title : {
    fontSize: 25,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 10
  },
  submitButton: {
    backgroundColor: purple,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  submitLabel: {
    color: white
  },
  errorMessage: {
    backgroundColor: lightRed,
    color: darkRed,
    margin: 10,
    padding: 10
  },
  card: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    alignItems: 'center'
  },
});