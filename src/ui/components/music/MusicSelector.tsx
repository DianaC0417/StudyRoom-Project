import { useMusicContext } from '../../context/MusicContext'; // Importamos el contexto global
import type { MusicMood } from '../../../domain/MusicTrack';
import '../music/MusicPlayer.css';

const moods: {
  id: MusicMood;
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    id: 'lofi',
    icon: '🎧',
    title: 'LOFI CHILL',
    description: 'Beats relajantes',
  },
  {
    id: 'focus',
    icon: '🎹',
    title: 'DEEP FOCUS',
    description: 'Piano y concentración',
  },
  {
    id: 'rain',
    icon: '🌧️',
    title: 'RAINY DAY',
    description: 'Ambient tranquilo',
  },
  {
    id: 'cafe',
    icon: '☕',
    title: 'CAFETERÍA',
    description: 'Jazz suave',
  },
];

export function MusicSelector() {
  // Consumimos el estado global de la radio para que persista entre salas
  const {
    mood,
    tracks,
    selectedTrack,
    isLoading,
    loadMoodTracks,  
    selectTrack, 
  } = useMusicContext();

  return (
    <section className="music-selector">
      <h3 className="music-section-title">RADIO DE ESTUDIO</h3>

      <div className="music-mood-grid">
        {moods.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`music-mood-card ${
              mood === item.id ? 'music-mood-card--selected' : ''
            }`}
            onClick={() => loadMoodTracks(item.id)}
          >
            <span className="music-mood-icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      {/* Nota: Añadimos estilos inline temporales o clases para asegurar que no rompa scrollbars */}
      <div 
        className="music-track-list" 
        style={{ scrollbarWidth: 'none' }}
      >
        {isLoading && <p className="music-message">Cargando estación...</p>}

        {!isLoading &&
          tracks.map((track) => {
            const isSelected = selectedTrack?.id === track.id;

            return (
              <button
                key={track.id}
                type="button"
                className={`music-track-card ${
                  isSelected ? 'music-track-card--selected' : ''
                }`}
                onClick={() => selectTrack(track)}
              >
                {track.imageUrl && (
                  <img
                    className="music-track-cover"
                    src={track.imageUrl}
                    alt={`Portada de ${track.title}`}
                  />
                )}

                <span className="music-track-info">
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </span>
              </button>
            );
          })}
      </div>
    </section>
  );
}