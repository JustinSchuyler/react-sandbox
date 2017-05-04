import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isOn ? 'On' : 'Off'}
      </button>
    );
  }
}

export default Toggle;
