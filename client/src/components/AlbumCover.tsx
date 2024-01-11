interface AlbumCoverProps {
  currentSongIndex: number;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ currentSongIndex }) => (
  <img
    className="cover-image"
    src={`http://localhost:8080/images/cover${currentSongIndex}.png`}
    onError={(e) => (e.currentTarget.src = "cover1.png")}
    alt="album art"
  />
);

export default AlbumCover;
