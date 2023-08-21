import { useState } from "react";
import "./App.css";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.onresult = (event: any) => {
    const speechResult = event.results[0][0].transcript;
    setTranscribedText(speechResult);
  };

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  const startListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  const synthesizeText = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(transcribedText);
    synth.speak(utterance);
  };

  const clearText = () => {
    setTranscribedText("");
  };

  return (
    <div className="app-web">
      <h1>Petite App Web Speech en React/Typescript</h1>
      <div className="app-button">
        <button onClick={startListening}>
          {isListening ? "Arrêter l'Écoute" : "Commencer l'Écoute"}
        </button>
        {transcribedText && (
          <>
            <button onClick={synthesizeText}>Synthétiser</button>
            <button onClick={clearText}>Effacer le Texte</button>
          </>
        )}
      </div>
      <p>
        {transcribedText ? (
          transcribedText
        ) : (
          <span className="app-no-text">
            Votre texte sera retranscrit ci-dessous.
          </span>
        )}
      </p>
    </div>
  );
}

export default App;
