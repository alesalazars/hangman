import React, { useState } from 'react';
import './App.css';

function App() {

  const words = ['casa']

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

  // Updates with messages for the user as they interact with the app.
  const [response, setResponse] = useState('Tienes 5 vidas para adivinar.')

  // Give winning message
  const [youWon, setWinningMessage] = useState('')

  // Keeps count of number of lives to guess
  const [lives, setLives] = useState(5)

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
    let randomWordArray= random.split('')
    setCopyOfRandomWord(randomWordArray)
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
      console.log('copyOfRandomWord --> ', copyOfRandomWord)

      for(let j = 0 ; j < copyOfRandomWord.length ; j++){
        console.log('recorriendo string de palabra random como array')

        if(valueOfInput === copyOfRandomWord[j]){

          console.log('la letra coincide con un elemento de la lista')

          document.getElementById(j).style.color = '#ffffff'
            
          let arr = rightLetters
          arr.push(valueOfInput)
          setRightLetters(arr)
          console.log('rightLetters', rightLetters)

          copyOfRandomWord.splice(j,1,0)
          setCopyOfRandomWord(copyOfRandomWord)
          console.log('copyOfRandomWord menos la letra adivinada --> ', copyOfRandomWord)


          // if(rightLetters.length === 0){
          //   document.getElementById(j).style.color = '#ffffff'
  
          //   let arr = rightLetters
          //   arr.push(valueOfInput)
          //   setRightLetters(arr)
          //   console.log('rightLetters', rightLetters)
  
          // }else if(rightLetters.length > 0){
            
          //   for(let i = 0 ; i < rightLetters.length ; i++){
          //     console.log('recorriendo lista de letras correctas')
    
          //     if(valueOfInput === rightLetters[i]){
          //       let alreadyGuessed = 'Ya ingresaste esta letra, prueba otra vez!'
          //       setResponse(alreadyGuessed)
          //     }else{
          //       document.getElementById(j).style.color = '#ffffff'
      
          //       let arr = rightLetters
          //       arr.push(valueOfInput)
          //       setRightLetters(arr)
          //       console.log('rightLetters', rightLetters)
  
          //       setResponse('')
      
          //       if(rightLetters.length === randomWord.length){
          //         let youWon = 'Ganaste! la palabra es: ' + randomWord
          //         setWinningMessage(youWon)
          //         setButtonAvailability(true)
          //       }
          //     }
    
          //   }
  
          // }


        }else{
          console.log('la letra NO coincide')
        }


          if(lives >= 1){
            let reduceLife = lives - 1
            setLives(reduceLife)
            let livesLeft = 'Te quedan ' + (reduceLife) + ' vidas!' 
            setResponse(livesLeft)
            console.log('lives: ', lives)
          }else if(lives === 1){
            let noClicksLeft = 'Ya no quedan más vidas :(' 
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
