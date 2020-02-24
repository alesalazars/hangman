import React, { useState } from 'react';
import './App.css';

function App() {

  const words = ['sol', 'nutria', 'sunny']

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

  // Puts the wrong letters in a box for the player to see
  const [wrongLettersInBox, setWrongLettersInBox] = useState()

  // Saves a copy of the wrongLetters array to be processed into the box that shows mistaken letters
  const [storagingOfWrongLetters, setStoragingOfWrongLetters] = useState()



  // Throws a random word and creates the spaces for each letter in the DOM.
  let sort = () => {
    let random = words[Math.floor(Math.random() * words.length)];
    setRandomWord(random)
    let aux = []
    for(let i = 0 ; i < random.length ; i++){
      aux.push(<li key={i} id={i}>{random[i]}</li>)
    }
    setChoose(aux)
    let randomWordArray= random.split('')
    setCopyOfRandomWord(randomWordArray)
  }

  // Gets the value of the input when onChange is triggered.
  let wroteInsideInput = (event) => {
    document.getElementById("letter").maxLength = "1";
    if(inputAvailability === false){
      setButtonAvailability(false)
      let tryLetter = event.target.value.toLowerCase()
      setValueOfInput(tryLetter)
    }
  }

  // Remove a life
  let takeALife = () => {
    let reduceLife = lives - 1
    setLives(reduceLife)
    let livesLeft = 'Te quedan ' + (reduceLife) + ' vidas!' 
    setResponse(livesLeft)
    console.log('lives: ', lives)
  }

  // No lives left
  let zeroLives = () => {
    let noClicksLeft = 'Ya no quedan más vidas :(' 
    setResponse(noClicksLeft)
    setButtonAvailability(true)
    setInputAvailability(true)
  }

  // Puts the wrong letters inside a box for the player to see
  let putWrongLetterInBox = () => {
    console.log('wrongLetters ::::::', wrongLetters)

    console.log('storagingOfWrongLetters ::::::', storagingOfWrongLetters)

    let wrongLettersWithoutDuplicates = [...new Set(storagingOfWrongLetters)]
    let wrongLettersIntoString = wrongLettersWithoutDuplicates.join(', ')
    setWrongLettersInBox(wrongLettersIntoString)
  }


  // Main interactions
  let checkLetter = () => {
    if(chosenWord === undefined){
      let haveToClickSortButtonFirst = 'Debes clickear el botón "Sortear palabra" antes de hacer click aquí...'
      setResponse(haveToClickSortButtonFirst)
    }else{
      console.log('randomWord --> ', randomWord)
      console.log('copyOfRandomWord --> ', copyOfRandomWord)


      for(let i = 0 ; i < copyOfRandomWord.length ; i++){
        console.log('recorriendo string de palabra random como array')

        if(valueOfInput === copyOfRandomWord[i]){

          console.log('la letra coincide con un elemento de la lista')

          document.getElementById(i).style.color = '#ffffff'
            
          let arrRights = rightLetters
          arrRights.push(valueOfInput)
          setRightLetters(arrRights)
          console.log('rightLetters', rightLetters)

          copyOfRandomWord.splice(i,1,0)
          setCopyOfRandomWord(copyOfRandomWord)
          console.log('copyOfRandomWord menos la letra adivinada --> ', copyOfRandomWord)

        }else{
          console.log('la letra NO coincide, copyOfRandomWord --> ', copyOfRandomWord)

          let arrWrongs = wrongLetters
          arrWrongs.push(valueOfInput)
          setWrongLetters(arrWrongs)
          console.log('wrongLetters', wrongLetters)

          let copyOfWrongLetters = wrongLetters
          setStoragingOfWrongLetters(copyOfWrongLetters)
          
        }

        setWrongLetters([])

      }

      if(wrongLetters.length === copyOfRandomWord.length){

        if(rightLetters.length > 0){
          setTried('')
          for(let j = 0 ; j < rightLetters.length ; j++){
            console.log('recorriendo lista de letras correctas')
            if(valueOfInput === rightLetters[j]){
              console.log('LA LETRA YA LA PROBÉ ANTES!!!!')
              let alreadyGuessed = 'Ya ingresaste esta letra, prueba otra vez!'
              setTried(alreadyGuessed)
              console.log('tried:::', tried)
            }else if(valueOfInput !== rightLetters[j] && lives >= 2){
              takeALife()
            }else if(valueOfInput !== rightLetters[j] && lives === 1){
              zeroLives()
            }
          }
        }else{
          if(lives >= 2){
            takeALife()
          }else if(lives === 1){
            zeroLives()
          }
        }
        
      }

      if(rightLetters.length === copyOfRandomWord.length){
        let youWon = 'Ganaste! la palabra es: ' + randomWord
        setWinningMessage(youWon)
        setButtonAvailability(true)
      }

      setValueOfInput('')

    }
  }

  // Restart the game
  let playAgain = () => {
    setRandomWord()
    setChoose()
    setCopyOfRandomWord()
    setValueOfInput('')
    setButtonAvailability(true)
    setInputAvailability(false)
    setResponse('Tienes 5 vidas para adivinar.')
    setWinningMessage('')
    setTried('')
    setLives(5)
    setRightLetters([])
    setWrongLetters([])
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
        <input disabled={inputAvailability} type="text" id="letter" value={valueOfInput} onChange={(event) => {wroteInsideInput(event)}}/>
        <button 
          disabled={buttonAvailability} 
          onClick={ () => { 
            checkLetter()
            putWrongLetterInBox()
          }}>Chequea la letra</button>
        <p>{youWon}</p>
        <p>{tried}</p>
        <p>{response}</p>
        <div id="wrongLettersBox">{wrongLettersInBox}</div>
        <button onClick={() => {playAgain()}}>Jugar de nuevo</button>

      </header>
    </div>
  );
}

export default App;
