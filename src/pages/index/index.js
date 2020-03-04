import React, { useState, useEffect } from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import { sort, wroteInsideInput, checkLetter, playAgain, drawWord, handleKeyPress } from './functions'

import './index.css';

const Index = () => {

  // Saves the random word chosen.
  const [randomWord, setRandomWord] = useState()

  // Saves a copy of the random word chosen, and updates removing the letters that are already correct to avoid unnecesarry iterations.
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

  // Variable that has the li with the letters of the random word
  const [liList, setLiList] = useState()

  // Practice fetch api
  const [planets, setPlanets] = useState({});

  useEffect(() => {
    sort(setRandomWord, setCopyOfRandomWord)

    async function fetchData() {
      const res = await fetch("https://swapi.co/api/planets/4/");
      res
        .json()
        .then(res => setPlanets(res))
    }

    fetchData();

    console.log('planets:', planets)

  }, [])


  return(
    <div className="index">
      {console.log('renderizando')}

      <div className="container">
        <div className="row">

          {/* <Button 
            onClick={ () => {
              sort(setRandomWord, setCopyOfRandomWord)
            }} 
            text={'Sortear palabra'}
            className={'start-btn'}  
          /> */}

          <ul id="letters">
            {randomWord !== undefined ? drawWord(randomWord, setLiList, liList, rightLetters, copyOfRandomWord) : ''}
          </ul>

        </div>

        <div className="row">
          <p className="mb-0">Ingresa una letra:</p>

          <Input 
            disabled={inputAvailability} 
            type="text" 
            id="letter" 
            value={valueOfInput} 
            onChange={(event) => { wroteInsideInput(event, inputAvailability, setButtonAvailability, setValueOfInput) }}
            onKeyPress={(event) => { handleKeyPress(event, checkLetter, setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox) }}
          />

          <Button 
            disabled={buttonAvailability} 
            onClick={ () => {
              checkLetter(setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox)
            }}
            text={'Chequea la letra'}
            className={'check-btn'}
          />
        </div>

        <div className="row">

          <p className="f-bold">{youWon}</p>
          <p>{tried}</p>
          <p>{response}</p>
          
          <div id="wrongLettersBox">
            <h6>Letras erróneas:</h6>
            <p>{wrongLettersInBox}</p>
          </div>

          <Button 
            onClick={() => {
              playAgain(setRandomWord, setCopyOfRandomWord, setValueOfInput, setButtonAvailability, setInputAvailability, setResponse, setWinningMessage, setTried, setLives, setRightLetters, setWrongLetters, setCopyOfWrongLetters, setWrongLettersInBox, setLiList)
              sort(setRandomWord, setCopyOfRandomWord)
              console.log(randomWord)
            }} 
            text={'Jugar de nuevo'}/>

        </div>
      </div>

    </div>
  )

}

export default Index;