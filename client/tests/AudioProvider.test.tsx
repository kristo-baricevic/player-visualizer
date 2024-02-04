import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AudioProvider, AudioPlayerContext } from "@/src/components/AudioPlayerContext";

describe('<AudioProvider />', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <AudioProvider>
        <div>Test Child</div>
      </AudioProvider>
    );
    expect(container).toBeTruthy();
  });
});

interface WrapperProps {
  children: ReactNode;
}


const mockLoadNewSong = jest.fn();

const mockContextValue = {
  isPlaying: false,
  isLoading: false,
  currentSongIndex: 0,
  progress: 0,
  setProgress: jest.fn(),
  currentSong: null,
  trackLinerNotes: [],
  nextSong: jest.fn(),
  prevSong: jest.fn(),
  isMuted: [false, false, false],
  volume: 1,
  getAudioContext: jest.fn(),
  loadNewSong: mockLoadNewSong, 
  playPauseTracks: jest.fn(),
  toggleMuteTrack: jest.fn(),
};

// Mock child component that uses the AudioPlayerContext
const MockChildComponent = () => {
  const { loadNewSong } = React.useContext(AudioPlayerContext)!;
  
  return <button data-testid="load-song-button" onClick={() => loadNewSong(0)} />;
};

describe('<AudioProvider />', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <AudioProvider>{}</AudioProvider>
    );    expect(container).toBeTruthy();
  });

  it('should call loadNewSong when button is clicked', () => {
    // Provide a mock for loadNewSong in the context value for testing
    const mockLoadNewSong = jest.fn();
    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <AudioPlayerContext.Provider value={mockContextValue}>
      {children}
      </AudioPlayerContext.Provider>
    );

    const { getByTestId } = render(<MockChildComponent />, { wrapper });

    fireEvent.click(getByTestId('load-song-button'));
    expect(mockLoadNewSong).toHaveBeenCalledWith(0);
  });
});
