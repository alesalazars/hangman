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

  // Updates with messages for the user as they interact with the app.
  const [response, setResponse] = useState('Tienes 5 vidas para adivinar.')

  // Give winning message
  const [youWon, setWinningMessage] = useState('')

  // Keeps count of the guessed letters
  const [guessed, setGuessed] = useState(1)

  // Keeps count of number of lives to guess
  const [lives, setLives] = useState(6)

  // Saves the letters that are right
  const [rightLetters, setRightLetters] = useState([])



  // Throws a random word and creates the spaces for each letter in the DOM.
  let sort = () => {
    let random = words[Math.floor(Math.random() * words.length)];
    setRandomWord(random)
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
  let checkLetter = () => {
    if(chosenWord === undefined){
      let haveToClickSortButtonFirst = 'Debes clickear el botón "Sortear palabra" antes de hacer click aquí...'
      setResponse(haveToClickSortButtonFirst)
    }else{
      console.log('randomWord --> ', randomWord)
    

      for(let j = 0 ; j < randomWord.length ; j++){
        console.log('recorriendo string de palabra random')

        if(rightLetters.length === 0 && valueOfInput === randomWord[j]){
          document.getElementById(j).style.color = '#ffffff'

          let arr = rightLetters
          arr.push(valueOfInput)
          setRightLetters(arr)
          console.log('rightLetters', rightLetters)

          let guessedCounter = guessed + 1
          setGuessed(guessedCounter)
          console.log('guessed: ', guessed)
          break;
        }else if(rightLetters.length > 0){
          
          for(let i = 0 ; i < rightLetters.length ; i++){
            console.log('recorriendo lista de letras correctas')
  
            if(valueOfInput === randomWord[j] && valueOfInput !== rightLetters[i]){
              document.getElementById(j).style.color = '#ffffff'
    
              let arr = rightLetters
              arr.push(valueOfInput)
              setRightLetters(arr)
              console.log('rightLetters', rightLetters)
    
              let guessedCounter = guessed + 1
              setGuessed(guessedCounter)
              console.log('guessed: ', guessed)
    
              if(guessed === randomWord.length){
                let youWon = 'Ganaste! la palabra es: ' + randomWord
                setWinningMessage(youWon)
                setButtonAvailability(true)
              }
            }else if(valueOfInput === randomWord[j] && valueOfInput === rightLetters[i]){
              let alreadyGuessed = 'Ya ingresaste esta letra, prueba otra vez!'
              setResponse(alreadyGuessed)
            }else{
              let reduceLife = lives - 1
              console.log('lives: ', lives)
              setLives(reduceLife)
              let livesLeft = 'Te quedan ' + (reduceLife) + ' vidas!' 
              setResponse(livesLeft)
              if(lives === 0){
                let noClicksLeft = 'Ya no quedan más vidas :(' 
                setResponse(noClicksLeft)
              }
            }
  
          }

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
    setResponse('')
    setWinningMessage('')
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
        <button disabled={buttonAvailability} onClick={ () => { checkLetter() }}>Chequea la letra</button>
        <p>{youWon}</p>
        <p>{response}</p>
        <button onClick={() => {playAgain()}}>Jugar de nuevo</button>

      </header>
    </div>
  );
}

export default App;
