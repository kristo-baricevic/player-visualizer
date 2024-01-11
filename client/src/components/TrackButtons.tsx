import { faDrum } from "@fortawesome/free-solid-svg-icons/faDrum";
import { faGuitar } from "@fortawesome/free-solid-svg-icons/faGuitar";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TrackButtonProps {
  isMuted: boolean[];
  onToggleMute: (trackIndex: number) => void;
}

const TrackButtons: React.FC<TrackButtonProps> = ({
  isMuted,
  onToggleMute,
}) => (
  <div className="flex flex-row items-center justify-center z-20 mt-6">
    {[0, 1, 2].map((trackIndex) => (
      <button
        key={trackIndex}
        className="playButton flex mx-4 bg-cyan-700 p-4 hover:bg-cyan-600 active:bg-cyan-900 ml-2 rounded-full"
        onClick={() => onToggleMute(trackIndex)}
      >
        {trackIndex === 0 ? (
          <FontAwesomeIcon
            icon={faGuitar}
            size="2xl"
            color={isMuted[trackIndex] ? "#ccc" : "#000"}
          />
        ) : trackIndex === 1 ? (
          <FontAwesomeIcon
            icon={faMicrophone}
            size="2xl"
            color={isMuted[trackIndex] ? "#ccc" : "#000"}
          />
        ) : (
          <FontAwesomeIcon
            icon={faDrum}
            size="2xl"
            color={isMuted[trackIndex] ? "#ccc" : "#000"}
          />
        )}
      </button>
    ))}
  </div>
);

export default TrackButtons;
