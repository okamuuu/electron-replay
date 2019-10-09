import React from 'react';
import "~/video-react/dist/video-react.css";
import ReactPlayer from 'react-player'

import { faPlay, faPause, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

declare global {
  interface Window {
    require: any;
  }
}

class Player extends React.Component {

  state = {
    url: "file:///Users/okamuuu/Desktop/IMG_7175.mp4",
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handlePlay = () => {
    this.setState({ playing: true })
  }

  render() {
    const { url, playing } = this.state

    // getFiles('test')

    return (
      <div>
        <ReactPlayer 
          url={url} 
          playing={playing}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={this.handlePlay}
        />
        <div className="buttons has-addons">
          <a className="button" onClick={this.handlePlay} >
            <FontAwesomeIcon icon={faPlay} />
          </a>
          <a className="button" onClick={this.handlePlayPause} >
            <FontAwesomeIcon icon={faPause} />
          </a>
        </div>
        <div className="file">
          <label className="file-label">
            <input className="file-input" type="file" name="video" />
            <span className="file-cta">
              <span className="file-icon">
                <FontAwesomeIcon icon={faUpload} />
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
          </label>
        </div>
        <div>
          <h2>State</h2>
          { this.state.url }
        </div>
      </div>
    );
  }
}

export default Player;
