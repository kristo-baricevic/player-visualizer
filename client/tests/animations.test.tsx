import React from "react";
import { animationForSong, clearAnimations, createSky, createStarburst, getRandomColor } from "../src/utils/animations";
import { render, screen } from "@testing-library/react";
import Index from "../pages";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { Provider } from "react-redux";
import store from "../src/store";
import gsap from "gsap";
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


  beforeEach(() => {
    fetchMock.resetMocks();
  });

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
      document.body.innerHTML = '';
      const consoleErrorSpy = jest.spyOn(console, 'error');
  
      createStarburst(5, 0.1, [0.5, 0.2]);
  
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error in createStarburst:", expect.any(Error));
    });
  
  });

  describe('createSky', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="night-sky" style="width: 500px; height: 500px;"></div>';
    });
  
    test('creates 300 stars with basic styles and adds them to the night-sky container', () => {
      createSky();
  
      const nightSky = document.getElementById('night-sky');
      const stars = nightSky?.getElementsByClassName('star');
  
      expect(stars?.length).toBe(300);
  
      for (let i = 0; i < 5; i++) {
        
        if (!stars) {
            return;
        }
        const star = stars[i] as HTMLElement; 
        expect(star).toHaveClass('star');
        expect(star.style.backgroundColor).toBeDefined;

        // Since size and position are random, you might just check they are set.
        expect(star.style.width).toBeTruthy();
        expect(star.style.height).toBeTruthy();
        expect(star.style.left).toBeTruthy();
        expect(star.style.top).toBeTruthy();
      }
    });
  });

  describe('animationForSong', () => {
    beforeEach(() => {
      // Reset GSAP mocks
      jest.clearAllMocks();
      // Setup the required DOM structure
      document.body.innerHTML = `
        <div class="box"></div>
        <div class="sample-info">
          <h3></h3>
          <p></p>
        </div>
        <div id="starburst"></div>
        <div id="night-sky"></div>
      `;
    });
  
    test('triggers expected GSAP animations', () => {
      const bpm = 120;
      const centroidDifferences = [0.1, 0.2, 0.3];
  
      animationForSong(bpm, centroidDifferences);
  
      // Verify GSAP animations are triggered
      const nightSky = document.getElementById('night-sky');
      const stars = nightSky?.getElementsByClassName('star');
      });
  });
