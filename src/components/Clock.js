import React from 'react';
import '../components/App.css';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [breakLength, setbreakLength] = useState(5);
  const [sessionLength, setsessionLength] = useState(25);
  const [play, setPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState('SESSION');

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && timingType === 'SESSION') {
      setTimeLeft(breakLength * 60);
      setTimingType('BREAK');
      audio.play();
    }
    if (!timeLeft && timingType === 'BREAK') {
      setTimeLeft(sessionLength * 60);
      setTimingType('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const countdown = setTimeout(() => {
    if (timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    } else {
      resetTimer();
    }
  }, 1000);

  const breakIncrement = () => {
    if (breakLength < 60) {
      setbreakLength(breakLength + 1);
    }
  };

  const breakDecrement = () => {
    if (breakLength > 1) {
      setbreakLength(breakLength - 1);
    }
  };

  const sessionIncrement = () => {
    if (sessionLength < 60) {
      setsessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  };

  const sessionDecrement = () => {
    if (sessionLength > 1) {
      setsessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  };

  const refresh = () => {
    clearTimeout(countdown);
    setPlay(false);
    setTimeLeft(1500);
    setbreakLength(5);
    setsessionLength(25);
    setTimingType('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(countdown);
    setPlay(!play);
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === 'SESSION' ? 'Session' : 'Break';

  return (
    <div className='main'>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'
      />
      <div className='rounded clock'>
        <div className='main-title'>
          <h1>25 + 5 Clock</h1>
        </div>
        <div className='controls-container'>
          <div className='length-control'>
            <div className='labels' id='break-label'>
              Break Length
            </div>
            <span className='break-span'>
              <button
                disabled={play}
                onClick={breakIncrement}
                className='control-button'
              >
                <i id='break-increment' className='fa fa-arrow-up'></i>
              </button>
              <div id='break-length'>{breakLength}</div>
              <button
                disabled={play}
                onClick={breakDecrement}
                className='control-button'
              >
                <i id='break-decrement' className='fa  fa-arrow-down'></i>
              </button>
            </span>
          </div>
          <div className='length-control'>
            <div className='labels' id='session-label'>
              Session Length
            </div>
            <span className='break-span'>
              <button
                disabled={play}
                onClick={sessionIncrement}
                className='control-button'
              >
                <i id='session-increment' className='fa fa-arrow-up'></i>
              </button>
              <div id='session-length'>{sessionLength}</div>
              <button
                disabled={play}
                onClick={sessionDecrement}
                className='control-button'
              >
                <i id='session-decrement' className='fa fa-arrow-down'></i>
              </button>
            </span>
          </div>
        </div>
        <div>
          <div className='timer-container'>
            <div id='timer'>
              <div className='labels' id='timer-label'>
                {title}
              </div>
              <span className='break-span-timer rounded' id='time-left'>
                <div>{timeFormatter()}</div>
              </span>
              <span id='controls'>
                <button
                  onClick={handlePlay}
                  className='control-button'
                  id='start_stop'
                >
                  <i className='fa  fa-play'></i>
                  <i className='fa  fa-pause'></i>
                </button>

                <button onClick={refresh} className='control-button' id='reset'>
                  <i className='fa  fa-refresh'></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      ></audio>
    </div>
  );
}
