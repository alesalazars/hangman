import React, { useState } from 'react';
import './App.css';

function App() {

  const words = ['casa','gato','mesa']

  const [randomWord, setRandomWord] = useState()

  const [chosenWord, setChoose] = useState()

  const [valueOfInput, setValueOfInput] = useState()

  const [buttonAvailability, setButtonAvailability] = useState(true)

  const [clicks, setClicks] = useState(0)

  const [response, setResponse] = useState()

  
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

  let wroteInsideInput = () => {
    setButtonAvailability(false)
    // como valueOfInput esta undefined, decirle de alguna forma al value que se actualice cuando onchange se actualiza, y asignarle el string ingresado.
    // setValueOfInput()
  }

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
            console.log('entré a checkLetter')
            console.log('randomWord --> ', randomWord)
            console.log('valueOfInput: ', valueOfInput)
            for(let j = 0 ; j < randomWord.length ; j++){
              console.log(randomWord[j])
              if(valueOfInput === randomWord[j]){
                console.log('le achunté')
                document.getElementById(j).style.color = '#ffffff'
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
  

  return (
    <div className="App">
      {console.log('renderizando')}
      <header className="App-header">
        <button onClick={ () => {sort() }}>Sortear palabra</button>
        <ul id="letters">
          {chosenWord}
        </ul>
        <p>Ingresa una letra para chequear que exista en la palabra:</p>
        <input type="text" id="letter" value={valueOfInput} onChange={() => {wroteInsideInput()}}/>
        <button 
          disabled={buttonAvailability}
          onClick={ () => {
            // checkLetter()
            let clicked = clicks + 1
            setClicks(clicked)
            countClicks()
          }}
        >Chequea la letra</button>
        <p>{response}</p>
      </header>
    </div>
  );
}

export default App;
