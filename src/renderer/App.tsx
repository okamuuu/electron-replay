import './App.sass';
import React from 'react';
import styled from 'styled-components';

import ReactPlayer from 'react-player'

import { faPlus, faMinus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const {
    BrowserWindow,
    dialog
} = require("electron").remote;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; 
`;

class App extends React.Component {

  state = {
    url: "",
    // url: "file:///Users/okamuuu/Desktop/IMG_7175.mp4",
    // url: "//player.vimeo.com/video/277572065",
    playing: true,
    controls: true,
    volume: 1.0,
    muted: false,
    played: 0,
    playbackRate: 100,
    loop: true
  }

  handleSpeedUp = () => {
    if (this.state.playbackRate >= 200) {
      return
    }
    this.setState({ playbackRate: this.state.playbackRate + 10 })
  }

  handleSpeedDown = () => {
    if ( this.state.playbackRate <= 10) {
      return
    }
    this.setState({ playbackRate: this.state.playbackRate - 10 })
  }

  handleClickUpload = () => {
    console.log("handleClickUpload")
    const win = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(
      win,
      {
        properties: ["openFile"],
        filters: [
          { name: 'Movies', extensions: ['mp4'] }
        ]
      },
      fileNames => {
        if (fileNames) {
          this.setState({playing: true, url: `file://${fileNames[0]}`})
        }
      }
    );
  }

  render() {
    const { url, playing, playbackRate } = this.state
    return (
      <div className="App">
        <PlayerWrapper>
          <ReactPlayer 
            controls
            pip={false}
            url={url} 
            playing={playing}
            playbackRate={playbackRate / 100}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            width='100%'
            height='100%'
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </PlayerWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
            <a className="button is-dark" onClick={this.handleClickUpload}>
              <FontAwesomeIcon icon={faUpload} />
            </a>
          <div className="buttons has-addons">
            <a className="button is-dark" onClick={this.handleSpeedDown}>
              <FontAwesomeIcon icon={faMinus} />
            </a>
            <a className="button is-dark">
              speed: { playbackRate } %
            </a>
            <a className="button is-dark" onClick={this.handleSpeedUp}>
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
