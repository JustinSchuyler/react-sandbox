import React from 'react';
import './Toggle.css';

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
      <div className="Toggle-wrapper">
        <button className={this.state.isOn ? 'Toggle-on' : 'Toggle-off'} onClick={this.handleClick}>
          {this.state.isOn ? 'On' : 'Off'}
        </button>
      </div>
    );
  }
}

export default Toggle;
