/// <reference types="jest" />
/* eslint-env jest */
import React from 'react'; 
import { render, screen } from "@testing-library/react";
import Index from "../pages/index";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { RootState } from "../src/store";
import { useSelector } from "react-redux";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ReactNode, useState } from "react";
import { Provider } from 'react-redux'; // Import the Provider
import store from '../src/store';

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
    // Mock the context
    jest.mock('../src/components/AudioPlayerContext', () => ({
      // Provide your mock context object here
      AudioPlayerContext: {
        Provider: ({ children }: { children: React.ReactNode }) => children,
      },
    }));
  });

  it('should render the AudioPlayer component', () => {
    render(
      <Provider store={store}>
        <AudioPlayerContext.Provider value={mockAudioContextValue}>
          <Index />
        </AudioPlayerContext.Provider>
      </Provider>
    );
  });
});
