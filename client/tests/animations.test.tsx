import React from "react";
import { createStarburst, getRandomColor } from "../src/utils/animations";
import { render, screen } from "@testing-library/react";
import Index from "../pages";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { Provider } from "react-redux";
import store from "../src/store";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();


describe("getRandomColor", () => {
  test("should return a random color", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});

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

describe('createStarburst', () => {
  test('should return an element with the class line', () => {
    render(
        <Provider store={store}>
          <AudioPlayerContext.Provider value={mockAudioContextValue}>
            <Index />
          </AudioPlayerContext.Provider>
        </Provider>
      );
    const element = createStarburst(1, 1, [.943, .443, .243]);
    expect(element).toBeInTheDocument(); 
    expect(element).toHaveClass('line'); 
    expect(element).toBeInstanceOf(Element);
  });
});
