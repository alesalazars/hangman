import React, { useState } from 'react';

import Button from '../../components/button';

import { sort, wroteInsideInput, checkLetter, putWrongLetterInBox, playAgain } from './functions'

import './index.css';

const Index = () => {

  // Saves the random word chosen.
  const [randomWord, setRandomWord] = useState()

  // Draws the word in the DOM, shows spaces for each letter.
  const [chosenWord, setChoose] = useState()

  // Saves a copy of the random word chosen, and update removing the letters that are already correct to avoid unnecesarry iterations.
  const [copyOfRandomWord, setCopyOfRandomWord] = useState()

  // Saves the value of the input when onChange is triggered.
  const [valueOfInput, setValueOfInput] = useState('')

  // Sets the "try word" button on disable, and updates to able when a letter is entered into the input above.
  const [buttonAvailability, setButtonAvailability] = useState(true)

  // If true it means the game is over and the input is disabled
  const [inputAvailability, setInputAvailability] = useState(false)

  // Updates with messages for the user as they interact with the app.
  const [response, setResponse] = useState('Tienes 5 vidas para adivinar.')

  // Give winning message
  const [youWon, setWinningMessage] = useState('')

  // Give message when the letter was already tried
  const [tried, setTried] = useState('')

  // Keeps count of number of lives to guess
  const [lives, setLives] = useState(5)

  // Saves the letters that are right
  const [rightLetters, setRightLetters] = useState([])

  // Saves the wrong letter attempts
  const [wrongLetters, setWrongLetters] = useState([])

  // Saves a copy of the wrongLetters array to be processed into the box that shows mistaken letters
  const [copyOfWrongLetters, setCopyOfWrongLetters] = useState([])

  // Puts the wrong letters in a box for the player to see
  const [wrongLettersInBox, setWrongLettersInBox] = useState()

  return(
    <div className="index">
      {console.log('renderizando')}
      <header className="App-header">

        <Button 
          onClick={ () => {sort(setRandomWord, setChoose, setCopyOfRandomWord)} } 
          text={'Sortear palabra'}/>

        <ul id="letters">
          {chosenWord}
        </ul>

        <p>Ingresa una letra para chequear que exista en la palabra:</p>

        <input 
          disabled={inputAvailability} 
          type="text" 
          id="letter" 
          value={valueOfInput} 
          onChange={(event) => {wroteInsideInput(event, inputAvailability, setButtonAvailability, setValueOfInput)}}
        />

        <Button 
          disabled={buttonAvailability} 
          onClick={ () => {
            checkLetter(chosenWord, setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, tried, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox)
          }}
          text={'Chequea la letra'}
        />

        <p>{youWon}</p>
        <p>{tried}</p>
        <p>{response}</p>
        
        <div id="wrongLettersBox">{wrongLettersInBox}</div>

        <Button 
          onClick={() => {playAgain(setRandomWord, setChoose, setCopyOfRandomWord, setValueOfInput, setButtonAvailability, setInputAvailability, setResponse, setWinningMessage, setTried, setLives, setRightLetters, setWrongLetters, setCopyOfWrongLetters, setWrongLettersInBox)}} 
          text={'Jugar de nuevo'}/>

      </header>
    </div>
  )

}

export default Index;