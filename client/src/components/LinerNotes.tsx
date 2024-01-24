import { fetchSongs } from "../redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import ErrorBoundary from "./ErrorBoundary";

export const useAppDispatch: () => AppDispatch = useDispatch;

const LinerNotes = () => {
  const dispatch = useAppDispatch();
  const trackLinerNotes = useSelector(
    (state: RootState) => state?.audio?.trackLinerNotes
  );
  const currentSongIndex = useSelector(
    (state: RootState) => state?.audio?.currentSongIndex
  );
  const error = useSelector((state: RootState) => state?.audio?.error);
  useEffect(() => {
    dispatch(fetchSongs());
    console.log("liner notes song index", currentSongIndex);
  }, [dispatch, currentSongIndex]); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentSong = trackLinerNotes?.find(track => track.id === currentSongIndex + 1);
  if (!currentSong) {
    return <div>Loading song information...</div>;
  }

  if (currentSong) {
    console.log("currentSong", currentSongIndex);
  }

  const samplesList =
    currentSong && Array.isArray(currentSong.samples) ? (
      currentSong?.samples?.map((sample, sampleIndex) => (
        <p key={sampleIndex}>
          {sample?.parts?.map((part, partIndex) =>
            part.link ? (
              <a key={partIndex} href={part.link} className="text-sky-400">
                {part.text}
              </a>
            ) : (
              <span key={partIndex}>{part.text}</span>
            )
          )}
        </p>
      ))
    ) : (
      <p>No samples available.</p>
    );

  return (
    <ErrorBoundary>
      <div className="sample-info mt-10 px-6">
        <h3>Samples used in &rdquo;{currentSong.title}&rdquo;: </h3>
        {samplesList}
      </div>
    </ErrorBoundary>
  );
};

export default LinerNotes;
