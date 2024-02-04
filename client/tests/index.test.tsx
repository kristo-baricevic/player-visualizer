/// <reference types="jest" />
/* eslint-env jest */

import { render, screen } from "@testing-library/react";
import Index from "../pages/index";
import { AudioPlayerContext } from "@/src/components/AudioPlayerContext";
import { RootState } from "../src/store";
import { useSelector } from "react-redux";
import { ReactNode, useState } from "react";
import "@testing-library/jest-dom/extend-expect";

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
  isMuted: [false],
  volume: 1,
  getAudioContext: jest.fn(),
  loadNewSong: jest.fn(),
  playPauseTracks: jest.fn(),
  toggleMuteTrack: jest.fn(),
};

interface AudioProviderProps {
  children: ReactNode;
}


describe('Index', () => {
  beforeEach(() => {
    // Other mock setups...

    // Mock the context
    jest.mock('@/src/components/AudioPlayerContext', () => ({
      // Provide your mock context object here
      AudioPlayerContext: {
        Provider: ({ children }: { children: React.ReactNode }) => children,
      },
    }));
  });

  it('should render the AudioPlayer component', () => {
    // Wrap your render in the Provider if your component directly consumes the context
    render(
      <AudioPlayerContext.Provider value={mockAudioContextValue}>
        <Index />
      </AudioPlayerContext.Provider>
    );
  });
});