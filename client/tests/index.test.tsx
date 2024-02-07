import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import Index from "../pages/index";
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

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Index", () => {
  it("renders the AudioPlayer component successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: "Your mock data here" }), { status: 200 });

    render(
      <Provider store={store}>
        <AudioPlayerContext.Provider value={mockAudioContextValue}>
          <Index />
        </AudioPlayerContext.Provider>
      </Provider>
    );

    // Example of waiting for an element to appear as a result of an async operation
    // await waitFor(() => expect(screen.getByTestId("some-element-id")).toBeInTheDocument());
  });

  it("handles fetch error correctly", async () => {
    fetchMock.mockReject(new Error("Failed to fetch"));

    render(
      <Provider store={store}>
        <AudioPlayerContext.Provider value={mockAudioContextValue}>
          <Index />
        </AudioPlayerContext.Provider>
      </Provider>
    );

    // Example of waiting for an error message or some indication of fetch failure
    // await waitFor(() => expect(screen.getByText("Error message or fallback UI")).toBeInTheDocument());
  });
});
