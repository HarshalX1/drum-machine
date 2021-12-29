import React, { Component } from "react";
import "./App.css";

const drumSounds = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      display: String.fromCharCode(160),
      volume: 1,
    };

    this.powerToggle = this.powerToggle.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.volControl = this.volControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  powerToggle() {
    this.setState((state) => {
      if (state.active === true) {
        return { active: false };
      } else {
        return { active: true };
      }
    });
  }

  updateDisplay(newString) {
    this.setState({
      display: newString,
    });
  }

  volControl(event) {
    this.setState({
      display: "Volume: " + Math.round(event.target.value * 100),
      volume: event.target.value,
    });
    setTimeout(() => {
      this.clearDisplay();
    }, 1000);
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160),
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="appHead">Drum Machine</h1>
        <div id="drum-machine">
          <div className="drumsGrid">
            {drumSounds.map((tone) => {
              return (
                <DrumPad
                  active={this.state.active}
                  className="drum-pad"
                  key={tone.id}
                  tone={tone}
                  updateDisplay={this.updateDisplay}
                  volume={this.state.volume}
                />
              );
            })}
          </div>
          <Console
            display={this.state.display}
            active={this.state.active}
            powerToggle={this.powerToggle}
            volume={this.state.volume}
            volControl={this.volControl}
          />
        </div>
      </div>
    );
  }
}

class DrumPad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnPress: "#6de5ff",
    };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.keyCode === this.props.tone.keyCode) {
      this.playSound();
      this.props.updateDisplay(this.props.tone.id);
    }
  }

  playSound() {
    const audioTag = document.getElementById(this.props.tone.keyTrigger);
    audioTag.volume = this.props.volume;
    audioTag.currentTime = 0;
    audioTag.play();

    this.setState({
      btnPress: "#ff823c",
    });

    setTimeout(() => {
      this.setState({
        btnPress: "#6de5ff",
      });
    }, 350);
  }

  render() {
    return (
      <button
        className="drum-pad"
        style={{ backgroundColor: this.state.btnPress }}
        id={this.props.tone.id}
        onClick={() => {
          this.playSound();
          this.props.updateDisplay(this.props.tone.id);
        }}
        disabled={!this.props.active}
      >
        {this.props.tone.keyTrigger}
        <audio
          className="clip"
          id={this.props.tone.keyTrigger}
          src={this.props.tone.url}
        />
      </button>
    );
  }
}

class Console extends Component {
  render() {
    const power = this.props.active;

    return (
      <div className="consoleDiv">
        <div className="powerDiv">
          <label for="power">Power</label>
          <input
            className="powerToggle"
            type="checkbox"
            name="power"
            onClick={this.props.powerToggle}
            checked={power}
          />
        </div>

        <div id="display">{this.props.display}</div>

        <div className="volDiv">
          <label for="volume">Volume</label>
          <input
            className="volumeBar"
            type="range"
            name="volume"
            value={this.props.volume}
            onChange={this.props.volControl}
            max="1"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    );
  }
}

export default App;
