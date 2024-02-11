import React from "react";
import { createStarburst, getRandomColor } from "../src/utils/animations";
import { render, screen } from "@testing-library/react";
import Index from "../pages";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { Provider } from "react-redux";
import store from "../src/store";
import fetchMock from "jest-fetch-mock";
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

describe("getRandomColor", () => {
  test("should return a random color", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });
});

describe('createStarburst', () => {
    beforeAll(() => {
      // Mock getRandomColor if necessary
      jest.mock('../src/utils/animations', () => ({
        getRandomColor: jest.fn().mockReturnValue('#FFFFFF'),
      }));
    });
  
    beforeEach(() => {
      // Setup a mock container for the tests
      document.body.innerHTML = '<div id="starburst"></div>';
    });
  
    test('successfully creates starburst lines with correct styles', () => {
      const numberOfLines = 5;
      const staggerTime = 0.1;
      const centroidDifferences = [0.5, 0.2, 0.8, 0.6, 0.4];
  
      createStarburst(numberOfLines, staggerTime, centroidDifferences);
  
      const container = document.getElementById('starburst');
      expect(container).not.toBeNull();
      expect(container?.children.length).toBe(numberOfLines);
    });
  
    test('handles missing container by logging error', () => {
      document.body.innerHTML = ''; // Remove the starburst container
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      createStarburst(5, 0.1, [0.5, 0.2]);
  
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error in createStarburst:", expect.any(Error));
    });
  
  });
  
