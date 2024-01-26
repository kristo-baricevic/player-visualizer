import { fetchSongs } from "../redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ErrorBoundary from "./ErrorBoundary";
export const useAppDispatch: () => AppDispatch = useDispatch;


const LinerNotes = () => {
  const dispatch = useAppDispatch();
  const audioState = useSelector((state: RootState) => state.audio);

  const trackLinerNotes = useSelector(
    (state: RootState) => state.audio.trackLinerNotes
  );

  const currentSongIndex = useSelector(
    (state: RootState) => state.audio.currentSongIndex
  );

  const error = useSelector((state: RootState) => state.audio.error);

  useEffect(() => {
    if (!trackLinerNotes || trackLinerNotes.length === 0) {
      dispatch(fetchSongs());
    }
  }, [dispatch]);

  console.log('Audio State:', audioState);


  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentSong = trackLinerNotes && trackLinerNotes[currentSongIndex];

  if (!currentSong) {
    return <div>Loading song information...</div>;
  }

  const samplesList = currentSong.samples.map((sample, sampleIndex) => (
    <p key={sampleIndex}>
      {sample.parts.map((part, partIndex) => (
        part.link ? (
          <a key={partIndex} href={part.link} className="text-sky-400">
            {part.text}
          </a>
        ) : (
          <span key={partIndex}>{part.text}</span>
        )
      ))}
    </p>
  ));

  return (
    <ErrorBoundary>
      <div className="sample-info mt-10 px-6">
        <h3>Samples used in &rdquo;{currentSong.title}&rdquo;:</h3>
        {samplesList}
      </div>
    </ErrorBoundary>
  );
};

export default LinerNotes;
