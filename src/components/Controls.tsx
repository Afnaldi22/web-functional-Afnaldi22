import React from 'react';
import { PlayingState } from '../lib/speech';

interface ControlsProps {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}

export const Controls: React.FC<ControlsProps> = ({ play, pause, loadNewContent, state }) => {
  return (
    <div>
      {state === 'playing' ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={play}>Play</button>
      )}
      <button onClick={loadNewContent}>Muat konten baru</button>
    </div>
  );
};

