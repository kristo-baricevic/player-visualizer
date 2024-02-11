import React, { PropsWithChildren } from 'react';
import { render, fireEvent } from '@testing-library/react';
import MultiTrackPlayer from '../src/components/MultiTrackPlayer';
import { AudioPlayerContext } from '../src/components/AudioPlayerContext';
import fetchMock from 'jest-fetch-mock';
import { Howl } from 'howler';

fetchMock.enableMocks();

interface TestAudioContextState {
  isPlaying: boolean,
  isLoading: boolean,
  currentSongIndex: number,
  progress: number,
  currentSong: { [key: string]: Howl } | null;
  trackLinerNotes: [],
  setProgress: jest.Mock;
  nextSong: jest.Mock;
  prevSong: jest.Mock;
  isMuted: [boolean, boolean, boolean],
  volume: number,
  getAudioContext: jest.Mock;
  loadNewSong: jest.Mock;
  playPauseTracks: jest.Mock;
  toggleMuteTrack: jest.Mock;
};
const mockAudioContextValue: TestAudioContextState = {
  isPlaying: false,
  isLoading: false,
  currentSongIndex: 0,
  progress: 0,
  currentSong: null,
  trackLinerNotes: [],
  setProgress: jest.fn<void, [number]>(),
  nextSong: jest.fn<void, []>(),
  prevSong: jest.fn<void, []>(),
  isMuted: [false, false, false],
  volume: 1,
  getAudioContext: jest.fn(),
  loadNewSong: jest.fn(),
  playPauseTracks: jest.fn(),
  toggleMuteTrack: jest.fn(),
};

jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    duration: jest.fn().mockReturnValue(120),
    seek: jest.fn(),
  })),
}));

// Adjusting the function to correctly mock 'currentSong' based on the argument.
type CustomHowl = Partial<Howl> & {
  play: (spriteOrId?: string | number) => number;
  pause: (id?: number) => Howl;
  duration: () => number;
  seek: (time?: number) => number;
  stop: () => Howl;
  mute: {
    (): boolean;
    (muted: boolean, id?: number): Howl;
  };
  volume: {
    (): number;
    (idOrSetVolume: number): number | Howl;
    (volume: number, id: number): Howl;
  };
  fade?: (from: number, to: number, duration: number, id?: number) => Howl;
}


function setCurrentSongToMock() {
  const customHowl: CustomHowl = {
    play: jest.fn(),
    pause: jest.fn(),
    duration: jest.fn().mockReturnValue(120),
    seek: jest.fn(),
    stop: jest.fn(), 
    mute: jest.fn().mockReturnValue(false),
    volume: jest.fn().mockReturnValue(1),
    fade: jest.fn() as ((from: number, to: number, duration: number, id?: number) => Howl) | undefined,
  };

  mockAudioContextValue.currentSong = {
    track1: customHowl as Howl
  };
}


beforeEach(() => {
  // Reset mock functions before each test
  mockAudioContextValue.setProgress.mockReset();
  mockAudioContextValue.nextSong.mockReset();
  mockAudioContextValue.prevSong.mockReset();
  mockAudioContextValue.playPauseTracks.mockReset();

  // Ensure currentSong is null or appropriately mocked here if needed for specific tests
  mockAudioContextValue.currentSong = null;
});


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

// describe('MultiTrackPlayer Progress Bar', () => {
//   beforeEach(() => {
//     setCurrentSongToMock(); 
//     mockAudioContextValue.setProgress.mockReset(); 
//   });

//   it('should calculate and set the new progress when clicked', () => {
//     const { getByTestId } = render(<MultiTrackPlayer />, {
//       wrapper: ({ children }) => (
//         <AudioPlayerContext.Provider value={mockAudioContextValue}>
//           {children}
//         </AudioPlayerContext.Provider>
//       ),
//     });
  
//     // Mock the current song duration
//     const duration = 120; // example duration in seconds
//     console.log('Duration set for track1:', duration);

//     mockAudioContextValue.currentSong = {
//       track1: {
//         duration: jest.fn().mockReturnValue(duration),
//         seek: jest.fn(),
//       } as any, // mock as any for simplicity
//     };
//     console.log('Duration set for track1:', duration);

  
//     // Simulate a click event on the progress container
//     const progressContainer = getByTestId('progressContainer');
//     Object.defineProperty(progressContainer, 'clientWidth', { value: 500 }); // example clientWidth value

//     fireEvent.click(progressContainer, { nativeEvent: { offsetX: 250 } });
//     const width = 500; // example clientWidth value
//     const clickX = 250; // example click position
//     console.log('clickX:', clickX);
//     console.log('width:', width);
//     console.log('typeof clickX:', typeof clickX);
//     console.log('typeof width:', typeof width);
    
//     const expectedProgress = (clickX / width) * 100;
//     console.log('expectedProgress:', expectedProgress);
//     // Expect setProgress to be called with the calculated progress
//     expect(mockAudioContextValue.setProgress).toHaveBeenCalledWith(expectedProgress);
//   });
  
// });
