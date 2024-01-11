import { faPause, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayButtonProps {
    isLoading: boolean;
    isPlaying: boolean;
    onClick: () => void;
  }

const PlayButton: React.FC<PlayButtonProps> = ({ isLoading, isPlaying, onClick }) => (
    <button
      className="action-btn action-btn-big"
      onClick={onClick}
      disabled={!isLoading}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      )}
    </button>
  );
  
  export default PlayButton;