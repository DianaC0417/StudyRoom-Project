//ui/components/music/MusicSelector.tsx
import type { MusicMood, MusicTrack } from '../../../domain/MusicTrack';

type MusicSelectorProps = {
  mood: MusicMood;
  tracks: MusicTrack[];
  selectedTrack: MusicTrack | null;
  isLoading: boolean;
  onSelectMood: (mood: MusicMood) => void;
  onSelectTrack: (track: MusicTrack) => void;
};

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

export function MusicSelector({
  mood,
  tracks,
  selectedTrack,
  isLoading,
  onSelectMood,
  onSelectTrack,
}: MusicSelectorProps) {
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
            onClick={() => onSelectMood(item.id)}
          >
            <span className="music-mood-icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      <div className="music-track-list">
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
                onClick={() => onSelectTrack(track)}
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
