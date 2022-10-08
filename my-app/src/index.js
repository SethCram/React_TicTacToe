/*
A game that:
  Lets you play tic-tac-toe,
  Indicates when a player has won the game,
  Stores a game’s history as a game progresses,
  Allows players to review a game’s history and see previous versions of a game’s board.

Possible Improvements: (increasing difficulty)
  Display the location for each move in the format (col, row) in the move history list.
  Bold the currently selected item in the move list.
  Rewrite Board to use two loops to make the squares instead of hardcoding them.
  Add a toggle button that lets you sort the moves in either ascending or descending order.
  When someone wins, highlight the three squares that caused the win.
  When no one wins, display a message about the result being a draw.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//In React, it’s conventional to use on[Event] names for props which represent events
// and handle[Event] for the methods which handle the events.

//function components are a simpler way to write components that only contain a render method and don’t have their own state
function Square(props)
{
    return (
      //console logging visible w/ inspecting element, called "devtools console"
        <button
            className="square"
            //the Square calls the Board’s onClick function, handleClick(i) when clicked
            onClick={props.onClick}
        > 
            {props.value}
        </button>
    );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
          <Square
              value={this.props.squares[i]} 
              //onClick prop is a function that Square can call when clicked
              onClick={() => this.props.onClick(i)}
            />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props)
    {
      //always call super when defining the constructor of a subclass (this isn't a subclass?)
      super(props);

      //init state
      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
          stepNumber: 0,
          //will be flipped to determine which player goes next
          xIsNext: true, 
      };
    }
    
    handleClick(i)
    {
      //make copies
      // throws away all future data if revert
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      //call .slice() to create a copy of the squares array 
      // to modify instead of modifying the existing array
      const squares = current.squares.slice();

      //if someone already won or clicked square is filled
      if (calculateWinner(squares) || squares[i])
      {
        //don't do anything on click
        return;
      }
        
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      
      this.setState({
        //unlike push(), doesn't mutate og arr
        history: history.concat([{
          squares: squares
        }]),
        //update step #
        stepNumber: history.length,
        //flip bit
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({ //dont update history to leave as is
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    
    render() {
      const history = this.state.history;
      //curr move by step #
      const current = history[this.state.stepNumber];
      //calc if winner
      const winner = calculateWinner(current.squares);

      //iterate through history array, step = current history element
      // move = curr history elly index
      const moves = history.map((step, move) => { 
        //tell btn playback or go game start
        const desc = move ? 'go to move #' + move : 'Go to game start';

        return ( //include vars in {} to eval in HTML, need to add a unique key to dynamic lists (don't use add order index as key)
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      //declare status
      let status;
      //display status based on if winner or not
      if (winner)
      {
        status = 'Winner: ' + winner;
      }
      else
      {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
        
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}
  
function calculateWinner(squares)
{
  //all possible lines on 3x3 board
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c] = lines[i];

    //if all sqrs in a line have a val
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    )
    {
      //ret whether X or O won
      return squares[a];
    }
  }
  //if no lines of sqrs filled
  return null;
}
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  