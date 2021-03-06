import React from 'react';
import Board from './Board';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      moveOrder: 'dsc'
    };

    this.restartGame = this.restartGame.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(e, step) {
    e.preventDefault();

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  restartGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    });
  }

  sortMoves = () => {
    this.setState((prevState) => ({
      moveOrder: prevState.moveOrder === 'asc' ? 'dsc' : 'asc'
    }));
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerInfo = calculateWinner(current.squares);

    let moves = history.map((move, step) => {
      const desc = step
        ? 'Move #' + step
        : 'Game start';

      return (
        <li key={step} className={(step === this.state.stepNumber) ? 'selected' : ''}>
          <a href="#" onClick={(e) => this.jumpTo(e, step)}>{desc}</a>
        </li>
      );
    });

    if (this.state.moveOrder === 'asc') {
      moves.reverse();
    }

    let status;
    if (winnerInfo) {
      status = 'Winner: ' + winnerInfo.player;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningLine={winnerInfo && winnerInfo.winningLine} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <h4 onClick={this.sortMoves} className="moves-header">Moves {this.state.moveOrder === 'asc' ? '^' : 'v'}</h4>
          <ol>{moves}</ol>
          <button onClick={this.restartGame}>Restart</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        winningLine: lines[i]
      };
    }
  }
  return null;
}

export default Game;
