import React, { useState } from 'react';
import './App.css';

function App() {

  const words = ['casa','gato','mesa']

  const [randomWord, setRandomWord] = useState()

  const [chosenWord, setChoose] = useState()

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

  let checkLetter = () => {
    let letter = document.getElementById('letter').value
    for(let i = 0 ; i < randomWord.length ; i++){
      console.log(randomWord[i])
      if(letter === randomWord[i]){
        console.log('le achunté')
        document.getElementById(i).style.color = '#ffffff'
      }
    }
  }
  

  return (
    <div className="App">
      {console.log('renderizando')}
      <header className="App-header">
        <button onClick={ () => {sort() }}>Sortear palabra</button>
        <ul id="letters">
          {console.log('chosenWord =>', chosenWord)}
          {chosenWord}
        </ul>
        <p>Ingresa una letra para chequear que exista en la palabra:</p>
        <input type="text" id="letter"/>
        <button onClick={ () => {checkLetter()} }>Chequea la letra</button>
      </header>
    </div>
  );
}

export default App;
