import React from "react";
import "./styles/styles.css";
import $ from "jquery";
import { audioSamples, keyCodeArray } from "./audio";
import { resetWaitingFunc, inactivityAnimation, restartInactivityAnimation, textOnOffFunc, enableBtns, disableBtns } from "./animations";

textOnOffFunc(true);
enableBtns();

export default class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      currentTune: "",
      volume: 0.5,
      display: "",
    };
    this.handleClickPress = this.handleClickPress.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handlePower() {
    this.setState(
      (state) => ({
        power: !state.power,
      }),
      () => {
        textOnOffFunc(this.state.power);
        this.state.power ? enableBtns(this.handleKeyboardPress) : disableBtns(this.handleKeyboardPress);
      }
    );
  }

  handleClickPress(e) {
    let index = e.target.name;
    this.handleKeyPress(index);
  }

  handleKeyPress(index) {
    resetWaitingFunc();
    restartInactivityAnimation();
    document.getElementById(audioSamples[index].keyName).play();
    const currentTune = audioSamples[index];
    this.setState(
      {
        currentTune: currentTune,
      },
      () => {
        this.setState({
          display: this.state.currentTune.name,
        });
      }
    );
    setTimeout(() => {
      document.getElementById("display").innerText = this.state.currentTune.name;
    }, 370);

    inactivityAnimation(5000);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyboardPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyboardPress);
  }

  handleKeyboardPress(event) {
    let index = keyCodeArray.findIndex((keyCode) => keyCode === event.keyCode);
    $(`#${index}`).addClass("keyTrigger");
    setTimeout(() => $(`#${index}`).removeClass("keyTrigger"), 150);

    if (index !== -1) {
      this.handleKeyPress(index);
    }
  }

  handleVolume(e) {
    resetWaitingFunc();
    restartInactivityAnimation();

    document.getElementById("volumeRange").oninput = function () {
      this.style.background = "linear-gradient(to right, rgb(234, 54, 54) 0%, rgb(234, 14, 14) " + this.value + "%, rgb(248, 178, 50) " + this.value + "%, rgb(248, 178, 50) 100%)";
    };
    this.setState(
      {
        volume: e.target.value / 100,
      },
      () => {
        Array.from(document.getElementsByClassName("clip")).forEach((tune) => (tune.volume = this.state.volume));
        this.setState({
          display: `${Math.round(this.state.volume * 100)}%`,
        });
      }
    );

    inactivityAnimation(2000);
  }

  render() {
    return (
      <>
        <div id="drum-machine" className="row">
          <LeftSide handleKeyPress={this.handleClickPress} />
          <RightSide display={this.state.display} handlePower={this.handlePower} handleVolume={this.handleVolume} />
        </div>
        <Footer />
      </>
    );
  }
}

class LeftSide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id="left-side" className="col-6">
          {audioSamples.map((btn, ind) => (
            <button id={ind} key={ind} name={ind} className="drum-pad" onClick={this.props.handleKeyPress}>
              <audio id={audioSamples[ind].keyName} className="clip" src={audioSamples[ind].url} preload="auto"></audio>
              {audioSamples[ind].keyName}
            </button>
          ))}
        </div>
      </>
    );
  }
}

class RightSide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id="right-side" className="col-6">
          <p id="header">DRUM MACHINE</p>
          <label>
            <div id="powerButton">
              Power
              <div id="powerSwitch">
                <input type="checkbox" onChange={this.props.handlePower} />
                <span className="switchThumb"></span>
              </div>
            </div>
          </label>
          <div id="display">{this.props.display}</div>
          <div id="volume">
            <label>
              Volume
              <input id="volumeRange" type="range" min="0" max="100" onChange={this.props.handleVolume} />
            </label>
          </div>
        </div>
      </>
    );
  }
}

function Footer() {
  return (
    <footer>
      <div id="footer">This project was build using: HTML, CSS, JavaScript, React, jQuery, Bootstrap and SASS</div>
    </footer>
  );
}
