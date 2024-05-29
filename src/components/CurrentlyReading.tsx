import React from 'react';

interface CurrentlyReadingProps {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}

export const CurrentlyReading: React.FC<CurrentlyReadingProps> = ({ currentWordRange, currentSentenceIdx, sentences }) => {
  // Handle cases where sentences or currentSentenceIdx might be undefined or out of bounds
  if (!sentences || currentSentenceIdx < 0 || currentSentenceIdx >= sentences.length) {
    return <div>Error: Invalid data</div>;
  }

  const currentSentence = sentences[currentSentenceIdx] || "";
  const words = currentSentence.split(' ');
  const currentWord = words.slice(currentWordRange[0], currentWordRange[1] + 1).join(' ');

  return (
    <div data-testid="currently-reading">
      <div>
        {sentences.map((sentence, index) => (
          <p key={index}>{sentence}</p>
        ))}
      </div>
      <p data-testid="current-sentence">
        {words.map((word, index) => (
          <span
            key={index}
            style={{ fontWeight: index >= currentWordRange[0] && index <= currentWordRange[1] ? 'bold' : 'normal' }}
            data-testid={index >= currentWordRange[0] && index <= currentWordRange[1] ? "current-word" : undefined}
          >
            {word}{' '}
          </span>
        ))}
      </p>
    </div>
  );
};


