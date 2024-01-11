import { useRef } from "react";

interface ProgressBarProps {
  progress: number;
  onSetProgress: (newProgress: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  onSetProgress,
}) => {
  const progressContainerRef = useRef<HTMLDivElement>(null);

  const handleSetProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = progressContainerRef.current?.clientWidth || 0;
    const clickX = e.nativeEvent.offsetX;
    const newProgress = (clickX / width) * 100;
    onSetProgress(newProgress);
  };

  return (
    <div
      className="progress-container flex"
      ref={progressContainerRef}
      onClick={handleSetProgress}
    >
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
