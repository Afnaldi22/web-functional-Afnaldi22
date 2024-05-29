export type SpeechEngineOptions = {
  onBoundary: (e: SpeechSynthesisEvent) => void;
  onEnd: (e: SpeechSynthesisEvent) => void;
  onStateUpdate: (state: PlayingState) => void;
};

export type PlayingState = "initialized" | "playing" | "paused" | "ended";

export type SpeechEngineState = {
  utterance: SpeechSynthesisUtterance | null;
  config: {
    rate: number;
    volume: number;
    voice: SpeechSynthesisVoice;
  };
};

export type SpeechEngine = ReturnType<typeof createSpeechEngine>;

const createSpeechEngine = (options: SpeechEngineOptions) => {
  const state: SpeechEngineState = {
    utterance: null,
    config: {
      rate: 1,
      volume: 1,
      voice: window.speechSynthesis.getVoices()[0] || null,
    },
  };

  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    state.config.voice = voices[0] || state.config.voice;
  };

  const load = (text: string) => {
    if (!text) throw new Error("Text must be provided to load into the speech engine");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.config.rate;
    utterance.volume = state.config.volume;
    utterance.voice = state.config.voice;

    utterance.onboundary = (e) => options.onBoundary(e);
    utterance.onend = (e) => {
      options.onStateUpdate("ended");
      options.onEnd(e);
    };

    state.utterance = utterance;
  };

  const play = () => {
    if (!state.utterance) throw new Error("No active utterance found to play");

    state.utterance.onstart = () => {
      options.onStateUpdate("playing");
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(state.utterance);
  };

  const pause = () => {
    if (!window.speechSynthesis.speaking) return;

    options.onStateUpdate("paused");
    window.speechSynthesis.pause();
  };

  const cancel = () => {
    options.onStateUpdate("initialized");
    window.speechSynthesis.cancel();
  };

  return {
    state,
    play,
    pause,
    cancel,
    load,
  };
};

export { createSpeechEngine };

