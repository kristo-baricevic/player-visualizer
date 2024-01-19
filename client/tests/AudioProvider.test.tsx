import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AudioProvider from './AudioProvider';

describe('<AudioProvider />', () => {
  it('should render without crashing', () => {
    const { container } = render(<AudioProvider />);
    expect(container).toBeTruthy();
  });

  it('should call loadNewSong when loadNewSong is called', () => {
    const loadNewSong = jest.fn();
    const { getByTestId } = render(
      <AudioProvider>
        <button data-testid="load-song-button" onClick={loadNewSong} />
      </AudioProvider>
    );

    fireEvent.click(getByTestId('load-song-button'));
    expect(loadNewSong).toHaveBeenCalled();
  });
});