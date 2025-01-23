import React, { useState, useRef } from 'react';
import './Task.css';

const Task = () => {
  const [time, setTime] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);
  const timerIdRef = useRef(null);

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      timerIdRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 1) {
            clearInterval(timerIdRef.current);
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    setIsActive(false);
    setTime(10);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1 className="title">Magical Timer</h1>
      <input
        ref={inputRef}
        type="text"
        className="text-input"
        placeholder="Type something..."
      />
      <button onClick={focusInput} className="button blue">
        Focus Box
      </button>

      <div className="timer">
        <h2>Countdown: {time}</h2>
        {time === 0 && <h2 className="times-up">Time's Up!</h2>}
      </div>

      <button onClick={startTimer} className="button green">
        Start Timer
      </button>
      <button onClick={stopTimer} className="button yellow">
        Stop Timer
      </button>
      <button onClick={resetTimer} className="button red">
        Reset Timer
      </button>
    </div>
  );
};

export default Task;
