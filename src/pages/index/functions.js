import React from 'react';
import './index.css';


// Throws a random word.
const sort = async(setRandomWord, setCopyOfRandomWord) => {

  const response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
  const data = await response.json()
  const englishWord = data[0]
  console.log('englishWord:', englishWord)

  setRandomWord(englishWord)

  let randomWordArray = englishWord.split('')
  setCopyOfRandomWord(randomWordArray)
}

// Draw word in the DOM
const drawWord = (randomWord, setLiList, liList, rightLetters, copyOfRandomWord) => {
  let wordDrawn = []

  if( rightLetters !== undefined ){

    for(let i = 0 ; i < copyOfRandomWord.length ; i++){
      if(randomWord[i] !== copyOfRandomWord[i]){
        wordDrawn.push(<li key={i} id={i} className={'isGuessed'}>{randomWord[i]}</li>)
      }else{
        wordDrawn.push(<li key={i} id={i} className={'notGuessed'}>{randomWord[i]}</li>)
      }
    }

  }else{
    for(let i = 0 ; i < copyOfRandomWord.length ; i++){
      wordDrawn.push(<li key={i} id={i} className={'notGuessed'}>{randomWord[i]}</li>)
    }
  }

  console.log('randomWord: ', randomWord)
  console.log('wordDrawn: ', wordDrawn)

  if(liList === undefined){
    let helper = wordDrawn
    setLiList(helper)
  }

  return(
    wordDrawn
  )
}


// Gets the value of the input when onChange is triggered.
const wroteInsideInput = (event, inputAvailability, setButtonAvailability, setValueOfInput) => {
  document.getElementById("letter").maxLength = "1";
  if(inputAvailability === false){
    setButtonAvailability(false)
    let tryLetter = event.target.value.toLowerCase()
    setValueOfInput(tryLetter)
  }
}


// Remove a life
const takeALife = (lives, setLives, setResponse) => {
  let reduceLife = lives - 1
  setLives(reduceLife)
  let livesLeft = 'Lives: ' + (reduceLife)
  setResponse(livesLeft)
}

// No lives left
const zeroLives = (setResponse, setButtonAvailability, setInputAvailability, randomWord) => {
  let noClicksLeft = 'No lives left :( the word was: ' + randomWord 
  setResponse(noClicksLeft)
  setButtonAvailability(true)
  setInputAvailability(true)
}

// Put wrong letter inside box at the bottom
const putWrongInBox = (copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox) => {
  let auxArr = copyOfWrongLetters
  auxArr.push(valueOfInput)
  setCopyOfWrongLetters(auxArr)

  let wrongLettersWithoutDuplicates = [...new Set(copyOfWrongLetters)]
  let wrongLettersIntoString = wrongLettersWithoutDuplicates.join(', ')
  setWrongLettersInBox(wrongLettersIntoString)
}

// Make enter key equivalent to clicking the button with the cursor
const handleKeyPress = (event, checkLetter, setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox) => {
  if(event.which === 13){
    checkLetter(setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox)
  }
}


// Main interactions, check if the letter is in the word and show it
const checkLetter = (setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox) => {

    if(valueOfInput !== ''){

      for(let i = 0 ; i < copyOfRandomWord.length ; i++){
        console.log('recorriendo string de palabra random como array')
  
        if(valueOfInput === copyOfRandomWord[i]){

          console.log('la letra SI coincide con un elemento de la lista')
            
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
        }
  
        setWrongLetters([])
  
      }
  
      if(wrongLetters.length === copyOfRandomWord.length){
  
        if(rightLetters.length > 0){
          setTried('')
          for(let j = 0 ; j < rightLetters.length ; j++){
            console.log('recorriendo lista de letras correctas:', rightLetters)
            if(valueOfInput === rightLetters[j]){
              console.log('LA LETRA YA LA PROBÉ ANTES!!!!')
              let alreadyGuessed = 'You already tried this one, silly! Try again!'
              setTried(alreadyGuessed)
            }else if(valueOfInput !== rightLetters[j] && lives >= 2){
              takeALife(lives, setLives, setResponse, copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
              putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            }else if(valueOfInput !== rightLetters[j] && lives === 1){
              zeroLives(setResponse, setButtonAvailability, setInputAvailability, randomWord)
              putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            }
          }
        }else{
          if(lives >= 2){
            takeALife(lives, setLives, setResponse, copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
          }else if(lives === 1){
            zeroLives(setResponse, setButtonAvailability, setInputAvailability, randomWord)
            putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
          }
        }
        
      }
  
      if(rightLetters.length === copyOfRandomWord.length){
        let youWon = 'You won! The word is: ' + randomWord
        setWinningMessage(youWon)
        setButtonAvailability(true)
        setInputAvailability(true)
      }
  
      setValueOfInput('')

    }

}

// Restart the game
const playAgain = (setRandomWord, setCopyOfRandomWord, setValueOfInput, setButtonAvailability, setInputAvailability, setResponse, setWinningMessage, setTried, setLives, setRightLetters, setWrongLetters, setCopyOfWrongLetters, setWrongLettersInBox, setLiList) => {
  setRandomWord()
  setCopyOfRandomWord([])
  setValueOfInput('')
  setButtonAvailability(true)
  setInputAvailability(false)
  setResponse('You have 5 lives to guess.')
  setWinningMessage('')
  setTried('')
  setLives(5)
  setRightLetters([])
  setWrongLetters([])
  setCopyOfWrongLetters([])
  setWrongLettersInBox()
  setLiList()
}


export { sort, wroteInsideInput, checkLetter, playAgain, drawWord, handleKeyPress };