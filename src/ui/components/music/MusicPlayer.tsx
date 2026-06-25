import { useMusicContext } from '../../context/MusicContext'; // Importamos el contexto global
import '../music/MusicPlayer.css';

/*
  ¡Nota pro! Mantuvimos la definición de Props por si se sigue requiriendo en herencias, 
  pero ahora el componente se conecta de forma autónoma al MusicProvider global.
  De esta forma, cuando cambies de sala, el estado persistirá en la app.
*/
export function MusicPlayer() {
  // Consumimos directamente del estado global de música de la aplicación
  const {
    selectedTrack,
    isPlaying,
    volume,
    error,
    togglePlay,
    changeVolume,
    playNextTrack,
  } = useMusicContext();

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
              onClick={togglePlay}
            >
              {isPlaying ? 'PAUSAR' : 'PLAY'}
            </button>

            <button
              className="music-next-button"
              type="button"
              onClick={playNextTrack}
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
              onChange={(event) => changeVolume(Number(event.target.value))}
            />
          </label>
        </div>
      )}

      {error && <p className="music-error">{error}</p>}
    </section>
  );
}