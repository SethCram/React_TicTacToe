import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//In React, it’s conventional to use on[Event] names for props which represent events
// and handle[Event] for the methods which handle the events.

class Square extends React.Component {
    //controlled components. The Board has full control over them.
    render() {
        return (
          //console logging visible w/ inspecting element, called "devtools console"
            <button
                className="square"
                //the Square calls the Board’s onClick function, handleClick(i) when clicked
                onClick={() => this.props.onClick()}
            > 
                {this.props.value}
            </button>
        );
    }
  }
  
  class Board extends React.Component {
    constructor(props)
    {
        //always call super when defining the constructor of a subclass (this isn't a subclass?)
        super(props)

        //init state to null
        this.state = {
            squares: Array(9).fill(null)
        };
      }
      
      handleClick(i)
      {
          //call .slice() to create a copy of the squares array 
          // to modify instead of modifying the existing array
          const squares = this.state.squares.slice();
          
          squares[i] = 'X';
          this.setState({ squares: squares });
      }
      
      renderSquare(i) {
          return (
              <Square
                  value={this.state.squares[i]} 
                  //onClick prop is a function that Square can call when clicked
                  onClick={() => this.handleClick(i)}
                />
          );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  