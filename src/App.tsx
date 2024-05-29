import './App.css';
import { useState } from 'react';
import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading'
import { useSpeech } from './lib/useSpeech';


function App() {
  const [sentences, setSentences] = useState<Array<string>>([
    "This is the first sentence.",
    "This is the second sentence.",
    "This is the third sentence.",
  ]);
  
  const { currentWord, currentSentence, controls } = useSpeech(sentences); // Menggunakan hook useSpeech

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        {/* Memasukkan properti yang diperlukan dari hook useSpeech */}
        <CurrentlyReading currentWord={currentWord} currentSentence={currentSentence} />
      </div>
      <div>
        {/* Memasukkan properti yang diperlukan dari hook useSpeech */}
        <Controls {...controls} />
      </div>
    </div>
  );
}

export default App;

