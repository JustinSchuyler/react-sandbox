import React from 'react';

function Square(props) {
  let classes = ['square'];
  if (props.isWinningSquare) {
    classes.push('winning-line');
  }

  return (
    <button className={classes.join(' ')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  checkIfWinningSquare(i) {
    return (this.props.winningLine && this.props.winningLine.indexOf(i) !== -1);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinningSquare={this.checkIfWinningSquare(i)} />
    );
  }

  render() {
    let step = 0;
    const rows = Array(3).fill(null);
    const cols = Array(3).fill(null);

    const squares = rows.map((v, i) => {
      return (
        <div key={i} className="board-row">
          {
            cols.map((v2, i2) => {
              return <span key={i2}>{this.renderSquare(step++)}</span>;
            })
          }
        </div>
      );
    })

    return (
      <div>{squares}</div>
    );
  }
}

export default Board;
