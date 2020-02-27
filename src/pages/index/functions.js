import React from 'react';
import './index.css';


const words = ['sol', 'nube', 'lluvia']

// Throws a random word.
const sort = (setRandomWord, setCopyOfRandomWord) => {
  let random = words[Math.floor(Math.random() * words.length)];
  setRandomWord(random)

  let randomWordArray= random.split('')
  setCopyOfRandomWord(randomWordArray)
}

const drawWord = (letterPaint, randomWord, setLiList, liList) => {
  let wordDrawn = []
  for(let i = 0 ; i < randomWord.length ; i++){
    wordDrawn.push(<li key={i} id={i} className={letterPaint === true ? 'isGuessed' : 'notGuessed'}>{randomWord[i]}</li>)
    // wordDrawn.push(<li key={i} id={i} className={letterPaint}>{randomWord[i]}</li>)
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
  let livesLeft = 'Te quedan ' + (reduceLife) + ' vidas!' 
  setResponse(livesLeft)
  console.log('lives: ', lives)
}

// No lives left
const zeroLives = (setResponse, setButtonAvailability, setInputAvailability) => {
  let noClicksLeft = 'Ya no quedan más vidas :(' 
  setResponse(noClicksLeft)
  setButtonAvailability(true)
  setInputAvailability(true)
}

// Put wrong letter inside box at the bottom
const putWrongInBox = (copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox) => {
  let auxArr = copyOfWrongLetters
  auxArr.push(valueOfInput)
  setCopyOfWrongLetters(auxArr)
  console.log('copyOfWrongLetters ::::::', copyOfWrongLetters)

  let wrongLettersWithoutDuplicates = [...new Set(copyOfWrongLetters)]
  console.log('wrongLettersWithoutDuplicates (ARRAY FILTRADO SIN DUPLICADOS)=====>', wrongLettersWithoutDuplicates)
  let wrongLettersIntoString = wrongLettersWithoutDuplicates.join(', ')
  console.log('wrongLettersIntoString (LETRAS MALAS UNIDAS POR COMAS)', wrongLettersIntoString)
  setWrongLettersInBox(wrongLettersIntoString)
  console.log('wrongLettersInBox : =======> ', wrongLettersInBox)
}


// Main interactions
const checkLetter = (setResponse, randomWord, copyOfRandomWord, valueOfInput, setRightLetters, rightLetters, setCopyOfRandomWord, wrongLetters, setWrongLetters, setCopyOfWrongLetters, setTried, lives, setWinningMessage, setButtonAvailability, setValueOfInput, tried, setInputAvailability, setLives, setWrongLettersInBox, copyOfWrongLetters, wrongLettersInBox, setLetterPaint, letterPaint, liList) => {
  if(randomWord === undefined){
    let haveToClickSortButtonFirst = 'Debes clickear el botón "Sortear palabra" antes de hacer click aquí...'
    setResponse(haveToClickSortButtonFirst)
  }else{
    console.log('randomWord --> ', randomWord)
    console.log('copyOfRandomWord --> ', copyOfRandomWord)

    if(valueOfInput !== ''){

      for(let i = 0 ; i < copyOfRandomWord.length ; i++){
        console.log('recorriendo string de palabra random como array')
  
        if(valueOfInput === copyOfRandomWord[i]){

          console.log('la letra coincide con un elemento de la lista')

          console.log('liList: ========> ', liList)
          console.log('liList[i].props.children: ', liList[i].props.children)

          if(valueOfInput === liList[i].props.children){
            let getLi = liList[i].props.className
            getLi = true
            setLetterPaint(getLi)
            console.log('letterPaint: ', letterPaint)
          }
          // setLetterPaint(true)
            
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
              let alreadyGuessed = 'Ya ingresaste esta letra, prueba otra vez!'
              setTried(alreadyGuessed)
            }else if(valueOfInput !== rightLetters[j] && lives >= 2){
              takeALife(lives, setLives, setResponse, copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
              putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            }else if(valueOfInput !== rightLetters[j] && lives === 1){
              zeroLives(setResponse, setButtonAvailability, setInputAvailability)
              putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            }
          }
        }else{
          if(lives >= 2){
            takeALife(lives, setLives, setResponse, copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
            putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
          }else if(lives === 1){
            zeroLives(setResponse, setButtonAvailability, setInputAvailability)
            putWrongInBox(copyOfWrongLetters, valueOfInput, setCopyOfWrongLetters, setWrongLettersInBox, wrongLettersInBox)
          }
        }
        
      }
  
      if(rightLetters.length === copyOfRandomWord.length){
        let youWon = 'Ganaste! la palabra es: ' + randomWord
        setWinningMessage(youWon)
        setButtonAvailability(true)
        setInputAvailability(true)
      }
  
      setValueOfInput('')

    }

  }
}

// Restart the game
const playAgain = (setRandomWord, setChoose, setCopyOfRandomWord, setValueOfInput, setButtonAvailability, setInputAvailability, setResponse, setWinningMessage, setTried, setLives, setRightLetters, setWrongLetters, setCopyOfWrongLetters, setWrongLettersInBox) => {
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
  setCopyOfWrongLetters([])
  setWrongLettersInBox()
}


export { sort, wroteInsideInput, checkLetter, playAgain, drawWord };