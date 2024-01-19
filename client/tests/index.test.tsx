import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import Index from "../pages/index";
import { AudioPlayerContext } from "../src/components/AudioPlayerContext";
import { AudioPlayer } from "../src/components/AudioPlayer";
import { RootState } from "../src/store";

jest.mock("../src/components/AudioPlayer", () => ({
  AudioPlayer: jest.fn(() => null),
}));

describe("Index", () => {
  let mockUseSelector: jest.Mock;
  let mockSetState: jest.Mock;

  beforeEach(() => {
    mockUseSelector = jest.fn((selector: (state: RootState) => any) => {
      return selector({} as RootState);
    });
    mockSetState = jest.fn();
    (useSelector as jest.Mock).mockImplementation(mockUseSelector);
    (useState as jest.Mock).mockImplementation((init) => [init, mockSetState]);
  });

  it("should render the AudioPlayer component", () => {
    render(<Index />);
    expect(screen.getByTestId("audio-player")).toBeInTheDocument();
  });

  it("should call the loadNewSong method of the AudioPlayer component when the component mounts", () => {
    render(<Index />);
    expect(AudioPlayer).toHaveBeenCalledWith({
      loadNewSong: expect.any(Function),
    });
    expect(mockSetState).toHaveBeenCalledWith(0);
    expect(mockUseSelector).toHaveBeenCalledWith((state: RootState) =>
      state.audio.currentSongIndex
    );
    expect(AudioPlayer.mock.instances[0].loadNewSong).toHaveBeenCalledWith(0);
  });
});