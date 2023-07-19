import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GPTVoiceAssist from "./GPTVoiceAssist";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const assistant = new GPTVoiceAssist(
    "http://localhost:3001/api/gpt-voice-assist",
    true
  );

  useEffect(() => {
    const checkProcessingAnswer = setInterval(() => {
      setIsProcessingAnswer(assistant.isProcessingAnswer());
    }, 500);

    const checkListening = setInterval(() => {
      setIsListening(assistant.isListening());
    }, 500);

    const checkIsActive = setInterval(() => {
      setIsActive(assistant.isActive());
    }, 500);

    return () => {
      clearInterval(checkListening);
      clearInterval(checkProcessingAnswer);
      clearInterval(checkIsActive);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Rename <code>.env.example</code> to <code>.env</code> and enter your
          OpenAI API key in the <code>/server</code> directory and run{" "}
          <code>npm i</code> to install the dependencies
        </p>
        <p>
          To start the backend, run <code>node server</code> from the{" "}
          <code>/server</code> directory. To start the frontend, open another
          terminal and enter the <code>/client</code> directory and run{" "}
          <code>npm i</code> to install the dependencies then run{" "}
          <code>npm start</code>.
        </p>
        <p>
          Open the console to see the input and output. Note: logs will display
          only if <code>true</code> is passed as a second parameter to{" "}
          <code>GPTVoiceAssist</code> (it is by default in this app)
        </p>
        <button onClick={() => assistant.listen()}>
          Click to Speak to GPT
        </button>
        {(isListening || isProcessingAnswer) && (
          <p className="flex-align">
            GPT is&nbsp;
            <span className="gradient-text">
              {isActive ? "active" : isListening ? "listening" : "working"}
            </span>
            &ensp;
            <span className="pulse-circle"></span>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
