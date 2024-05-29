import { useState, useEffect, useRef } from 'react';
import { createSpeechEngine, PlayingState, SpeechEngineOptions } from './speech';

const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const speechEngineRef = useRef<ReturnType<typeof createSpeechEngine> | null>(null);

  useEffect(() => {
    const onBoundary = (e: SpeechSynthesisEvent) => {
      const charIndex = e.charIndex;
      const words = sentences[currentSentenceIdx].split(' ');
      let wordStartIndex = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (charIndex >= wordStartIndex && charIndex < wordStartIndex + word.length) {
          setCurrentWordRange([i, i]);
          break;
        }
        wordStartIndex += word.length + 1; // +1 for the space
      }
    };

    const onEnd = () => {
      if (currentSentenceIdx < sentences.length - 1) {
        setCurrentSentenceIdx((prev) => prev + 1);
        setCurrentWordRange([0, 0]);
        speechEngineRef.current?.load(sentences[currentSentenceIdx + 1]);
        speechEngineRef.current?.play();
      } else {
        setPlaybackState("ended");
      }
    };

    const onStateUpdate = (state: PlayingState) => {
      setPlaybackState(state);
    };

    const options: SpeechEngineOptions = {
      onBoundary,
      onEnd,
      onStateUpdate,
    };

    speechEngineRef.current = createSpeechEngine(options);
    speechEngineRef.current.load(sentences[0]);

    return () => {
      speechEngineRef.current?.cancel();
    };
  }, [currentSentenceIdx, sentences]);

  const play = () => {
    speechEngineRef.current?.play();
  };

  const pause = () => {
    speechEngineRef.current?.pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };

