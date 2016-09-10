import React, { Component } from 'react';
import { render } from 'react-dom';
var timeouts = [];

class Player extends Component {
	constructor() {
		super();
    this.toggleStop = this.toggleStop.bind(this);
    this.toggleStart = this.toggleStart.bind(this);

    this.state = {
      looping: false,
      bpm: 160
    }
	}

//Plays loop.  input is a buffer list of sounds and a speed variable.
//BPM is beats per minute
  playLoop(bufferList, bpm, board, loop = 0) {
    //hard coded for 8 columns.  If you want to add more columns, you have to change this
    let rowLength = 8;
    let buffLen = bufferList.length;
    let speedRatio = bpm / 60;
    // the terminating case for i is hard-coded for 8 columns
    for (var i = 0; i < 8; i++) {
      /* These MUST be "==" because loading boards come back with 
        the values in strings rather than numbers...
      */
      if (board[0][i % rowLength] == 1) {
        this.playSound(bufferList[0], i / speedRatio);
      }
      if (board[1][i % rowLength] == 1) {
        this.playSound(bufferList[1], i / speedRatio);
      }
      if (board[2][i % rowLength] == 1) {
        this.playSound(bufferList[2], i / speedRatio);
      }
      if (board[3][i % rowLength] == 1) {
        this.playSound(bufferList[3], i / speedRatio);
      }
    }

    if (this.state.looping) {
      //params and timeout hardcoded for 160 bpm with 8 columns.
      setTimeout(() => {
          this.playLoop(bufferList, bpm, this.props.board, loop + 8);
      }, 3000) 
    }
  }

  playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime + time);
  }

  //toggle stop terminates the loop.  Audio sounds cued up will continue to play.
  //Will terminate at the end of the loop playing.
  toggleStop() {
    this.setState({
      looping: false
    })
  }

  toggleStart() {
    if (this.state.looping) return;
    this.setState({
      looping: true
    }, () => {
      this.playLoop(bufferList, this.state.bpm, this.props.board)
    })
  }

	render() {
		return (
			<div>
      <button onClick={this.toggleStop}>click here to stop</button>
			<button onClick={this.toggleStart}>click here to start</button>
			</div>
		)
	}
}

module.exports = Player;