/// Componente para mostrar el reproductor de música
import type { MusicTrack } from '../../../domain/MusicTrack';
import '../music/MusicPlayer.css';
type MusicPlayerProps = {
  selectedTrack: MusicTrack | null;
  isPlaying: boolean;
  volume: number;
  error: string;
  onTogglePlay: () => void;
  onChangeVolume: (volume: number) => void;
  onNextTrack: () => void;
};

export function MusicPlayer({
  selectedTrack,
  isPlaying,
  volume,
  error,
  onTogglePlay,
  onChangeVolume,
  onNextTrack,
}: MusicPlayerProps) {
  return (
    <section className="music-player">
      <h3 className="music-section-title">REPRODUCTOR</h3>

      {!selectedTrack ? (
        <p className="music-message">Elige una vibra para estudiar.</p>
      ) : (
        <div className="music-now-playing">
          {selectedTrack.imageUrl && (
            <img
              className="music-player-cover"
              src={selectedTrack.imageUrl}
              alt={`Portada de ${selectedTrack.title}`}
            />
          )}

          <div className="music-player-info">
            <strong>{selectedTrack.title}</strong>
            <span>{selectedTrack.artist}</span>
          </div>

          <div className="music-player-actions">
            <button
              className="music-play-button"
              type="button"
              onClick={onTogglePlay}
            >
              {isPlaying ? 'PAUSAR' : 'PLAY'}
            </button>

            <button
              className="music-next-button"
              type="button"
              onClick={onNextTrack}
            >
              SIG.
            </button>
          </div>

          <label className="music-volume">
            VOLUMEN
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => onChangeVolume(Number(event.target.value))}
            />
          </label>
        </div>
      )}

      {error && <p className="music-error">{error}</p>}
    </section>
  );
}
