import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faForward } from "@fortawesome/free-solid-svg-icons/faForward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavigationButtonsProps {
    onPrevClick: () => void; 
    onNextClick: () => void;
    isValidIndex: boolean;
  }

  const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevClick, onNextClick, isValidIndex }) => (
    <div className="navigation">
      <button
        className="action-btn"
        onClick={onPrevClick}
        disabled={!isValidIndex}
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button
        className="action-btn"
        onClick={onNextClick}
        disabled={!isValidIndex}
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
  
export default NavigationButtons;