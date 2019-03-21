import React, { Component } from 'react';
import './App.css';


const DICTIONNARY = ['VOITURE', 'ORDINATEUR', 'SNOWBOARD', 'STYLO', 'CISEAUX', 'PAPIER', 'ASSIETTE'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g,
    (letter) => (usedLetters.has(letter) ? letter : '_')
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      value={props.value}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquares(start, end) {
    let squares = [];
    for (let index = start; index < end; index++) {
      const element = ALPHABET[index];
      squares.push(<Square
        key={element}
        value={element}
        onClick={this.props.onClick}
        disabled={this.props.lettersClicked.has(element)}
      />);
    }
    return squares;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquares(0, 13)}
        </div>
        <div className="board-row">
          {this.renderSquares(13, 26)}
        </div>
      </div>
    );
  }
}

function Mask(props) {
  let wordToDisplay = '';
  let wordMasked = computeDisplay(props.wordToFind, props.lettersFind);
  for (let index = 0; index < wordMasked.length; index++) {
    const letter = wordMasked[index];
    wordToDisplay = wordToDisplay.concat(`${letter} `);
  }
  return (
    <div>
      {wordToDisplay}
    </div>
  );
}

function DisplayButtons(props) {
  if (props.reset) {
    return (
      <button onClick={props.onReset}>new game</button>
    );
  }
  return (
    <Board onClick={props.onClick} lettersClicked={props.lettersClicked} />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lettersFind: new Set([]),
      lettersClicked: new Set([]),
      wordToFind: DICTIONNARY[getRandomInt(DICTIONNARY.length)],
      numberTry: 0
    };
    this.handleLetterClick = this.handleLetterClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleLetterClick(event) {
    let letterClicked = event.target.value;
    /* bad practise
    this.setState({
      lettersFind: (this.state.wordToFind.includes(letterClicked)) ? this.state.lettersFind.add(letterClicked) : this.state.lettersFind,
      lettersClicked: this.state.lettersClicked.add(letterClicked),
      numberTry: this.state.numberTry + 1
    });
    */
    this.setState((prevState, props) => ({
      lettersFind: (prevState.wordToFind.includes(letterClicked)) ? prevState.lettersFind.add(letterClicked) : prevState.lettersFind,
      lettersClicked: prevState.lettersClicked.add(letterClicked),
      numberTry: prevState.numberTry + 1
    }));
  }

  handleResetClick() {
    this.setState({
      lettersFind: new Set([]),
      lettersClicked: new Set([]),
      wordToFind: DICTIONNARY[getRandomInt(DICTIONNARY.length)],
      numberTry: 0
    });
  }

  render() {
    return (
      <div className="App">
        <Mask wordToFind={this.state.wordToFind} lettersFind={this.state.lettersFind} />
        <hr />
        <DisplayButtons onClick={this.handleLetterClick} 
            onReset={this.handleResetClick} lettersClicked={this.state.lettersClicked} 
            reset={!(computeDisplay(this.state.wordToFind, this.state.lettersFind)).includes('_')} />
        <hr />
        nombre essais = {this.state.numberTry}
      </div>
    );
  }
}

export default App;
