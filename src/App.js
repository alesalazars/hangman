import React, { useState } from 'react';
import './App.css';

function App() {

  const words = ['casa','gato','mesa']

  // Saves the random word chosen.
  const [randomWord, setRandomWord] = useState()

  // Draws the word in the DOM, shows spaces for each letter.
  const [chosenWord, setChoose] = useState()

  // Saves the value of the input when onChange is triggered.
  const [valueOfInput, setValueOfInput] = useState('')

  // Sets the "try word" button on disable, and updates to able when a letter is entered into the input above.
  const [buttonAvailability, setButtonAvailability] = useState(true)

  // Saves the number of clicks of the "try word" button
  const [clicks, setClicks] = useState(0)

  // Updates with messages for the user as they interact with the app.
  const [response, setResponse] = useState()

  // Keeps count of the guessed letters
  const [guessed, setGuessed] = useState(1)

  // Throws a random word and creates the spaces for each letter in the DOM.
  let sort = () => {
    let random = words[Math.floor(Math.random() * words.length)];
    setRandomWord(random)
    console.log(random)
    let aux = []
    for(let i = 0 ; i < random.length ; i++){
      aux.push(<li key={i} id={i}>{random[i]}</li>)
    }
    setChoose(aux)
  }

  // Gets the value of the input when onChange is triggered.
  let wroteInsideInput = (event) => {
    setButtonAvailability(false)
    let tryLetter = event.target.value
    setValueOfInput(tryLetter)
  }

  // Main interactions
  let countClicks = () => {
    if(chosenWord === undefined){
      let haveToClickSortButtonFirst = 'Debes clickear el botón "Sortear palabra" antes de hacer click aquí...'
      setResponse(haveToClickSortButtonFirst)
      setClicks(0)
    }else{
      for(let i = 0 ; i < 5 ; i++){
        if(clicks === i){
          let clicksLeft = 'Te quedan ' + (5 - i) + ' oportunidades para adivinar!' 
          setResponse(clicksLeft)
          let checkLetter = () => {
            console.log('randomWord --> ', randomWord)
            console.log('valueOfInput: ', valueOfInput)
            for(let j = 0 ; j < randomWord.length ; j++){
              if(valueOfInput === randomWord[j]){
                console.log('le achunté')
                document.getElementById(j).style.color = '#ffffff'
                let guessedCounter = guessed + 1
                setGuessed(guessedCounter)
                console.log('guessed: ', guessed)
                if(guessed === randomWord.length){
                  let youWon = 'Ganaste!'
                  setResponse(youWon)
                  setButtonAvailability(true)
                }
              }
            }
          }
          checkLetter()
        }else if(clicks === 5){
          let noClicksLeft = 'Ya no quedan más oportunidades para adivinar :(' 
          setResponse(noClicksLeft)
        }
      }
    }
  }

  // Restart the game
  let playAgain = () => {
    setRandomWord(null)
    setChoose(null)
    setValueOfInput('')
    setButtonAvailability(true)
    setClicks(0)
    setResponse('')
  }

  return (
    <div className="App">
      {console.log('renderizando')}
      <header className="App-header">
        <button onClick={ () => {sort() }}>Sortear palabra</button>
        <ul id="letters">
          {chosenWord}
        </ul>
        <p>Ingresa una letra para chequear que exista en la palabra:</p>
        <input type="text" id="letter" value={valueOfInput} onChange={(event) => {wroteInsideInput(event)}}/>
        <button 
          disabled={buttonAvailability}
          onClick={ () => {
            let clicked = clicks + 1
            setClicks(clicked)
            countClicks()
          }}
        >Chequea la letra</button>
        <p>{response}</p>
        <button onClick={() => {playAgain()}}>Jugar de nuevo</button>

      </header>
    </div>
  );
}

export default App;
