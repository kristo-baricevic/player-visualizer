import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

interface NavigationDashboardProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  isValidIndex: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
}

const NavigationDashboard: React.FC<NavigationDashboardProps> = ({
  onPrevClick,
  onNextClick,
  isValidIndex,
  isLoading,
  isPlaying,
  onPlayPauseClick,
}) => (
  <div className="container-background">
    <div className="navigation">
      <button
        className="action-btn"
        onClick={onPrevClick}
        disabled={!isValidIndex}
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className="action-btn action-btn-big"
        onClick={onPlayPauseClick}
        disabled={!isValidIndex}
      >
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        )}
      </button>
      <button
        className="action-btn"
        onClick={onNextClick}
        disabled={!isValidIndex}
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  </div>
);

export default NavigationDashboard;
