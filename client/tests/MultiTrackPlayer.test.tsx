import React, { PropsWithChildren } from 'react';
import { render, fireEvent } from '@testing-library/react';
import MultiTrackPlayer from '../src/components/MultiTrackPlayer';
import { AudioPlayerContext } from '../src/components/AudioPlayerContext';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockAudioContextValue = {
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
  loadNewSong: jest.fn(),
  playPauseTracks: jest.fn(),
  toggleMuteTrack: jest.fn(),
};

describe('<MultiTrackPlayer />', () => {
  it('should update the play/pause button state when the play/pause button is clicked', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <AudioPlayerContext.Provider value={mockAudioContextValue}>
        {children}
      </AudioPlayerContext.Provider>
    );

    // Use the wrapper option correctly with render
    const { getByTestId } = render(<MultiTrackPlayer />, { wrapper: wrapper });

    const playPauseButton = getByTestId('playPauseBtn');
    fireEvent.click(playPauseButton);
    expect(mockAudioContextValue.playPauseTracks).toHaveBeenCalled();
  });
});

describe('MultiTrackPlayer Next and Previous Buttons', () => {
  const wrapper = ({ children }: PropsWithChildren<{}>) => (
    <AudioPlayerContext.Provider value={mockAudioContextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );

  it('should call prevSong when the previous song button is clicked', () => {
    
    
    const { getByTestId } = render(<MultiTrackPlayer />, { wrapper: wrapper });
    const prevSongButton = getByTestId('prevSongBtn');
    
    fireEvent.click(prevSongButton);
    
    expect(mockAudioContextValue.prevSong).toHaveBeenCalled();
  });

  it('should call nextSong when the next song button is clicked', () => {
    const { getByTestId } = render(<MultiTrackPlayer />, { wrapper: wrapper });
    const nextSongButton = getByTestId('nextSongBtn');
    
    fireEvent.click(nextSongButton);
    
    expect(mockAudioContextValue.nextSong).toHaveBeenCalled();
  });
});

