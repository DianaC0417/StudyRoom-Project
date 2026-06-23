import { useEffect, useState } from 'react';
import UserMenuNavbar from '../components/UserMenuNavBar';
import {
  fetchTasks,
  fetchPomodoroSessions,
} from '../../aplication/statsService';
import type { Task, PomodoroSession } from '../../aplication/statsService';
import '../styles/UserPrivatePages.css';

interface StatisticsPageProps {
  onLogout: () => void;
}

const StatisticsPage = ({ onLogout }: StatisticsPageProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionFilter, setSessionFilter] = useState<
    'all' | 'completed' | 'cancelled'
  >('all');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [tasksData, sessionsData] = await Promise.all([
          fetchTasks(),
          fetchPomodoroSessions(),
        ]);
        setTasks(tasksData);
        setSessions(sessionsData);
      } catch (err) {
        setError(
          'No se pudieron cargar las estadísticas. Asegúrate de haber iniciado sesión.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const filteredSessions = sessions.filter((s) => {
    if (sessionFilter === 'all') return true;
    return s.status === sessionFilter;
  });

  const completedSessionsCount = sessions.filter(
    (s) => s.status === 'completed'
  ).length;
  const cancelledSessionsCount = sessions.filter(
    (s) => s.status === 'cancelled'
  ).length;

  return (
    <div className="private-page">
      <UserMenuNavbar title="Statistics" onLogout={onLogout} />

      <main className="private-page-content">
        <section className="private-card user-settings-card stats-full-width">
          <h2>📊 Estadísticas</h2>

          {loading && (
            <p className="stats-loading-text">Cargando estadísticas...</p>
          )}
          {error && (
            <p className="settings-message settings-message-error stats-error-msg">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              {/* ═══════════ SECCIÓN TAREAS ═══════════ */}
              <div className="stats-section">
                <h3 className="stats-section-title">📋 Tareas</h3>
                <div className="stats-cards">
                  <div className="stat-card">
                    <span className="stat-icon">⏳</span>
                    <span className="stat-value">{pendingTasks.length}</span>
                    <span className="stat-label">Pendientes</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-icon">✅</span>
                    <span className="stat-value">{completedTasks.length}</span>
                    <span className="stat-label">Completadas</span>
                  </div>
                </div>

                {tasks.length === 0 ? (
                  <p className="stats-empty-msg">No hay tareas registradas.</p>
                ) : (
                  <ul className="task-list">
                    {pendingTasks.map((task) => (
                      <li key={task.id} className="task-item task-pending">
                        <span className="task-title">{task.title}</span>
                        <span className="task-status">Pendiente</span>
                      </li>
                    ))}
                    {completedTasks.map((task) => (
                      <li key={task.id} className="task-item task-completed">
                        <span className="task-title">{task.title}</span>
                        <span className="task-status">Completada</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ═══════════ SECCIÓN POMODORO ═══════════ */}
              <div className="stats-section">
                <h3 className="stats-section-title">⏱️ Pomodoro</h3>
                <div className="stats-cards">
                  <div className="stat-card">
                    <span className="stat-icon">🎯</span>
                    <span className="stat-value">{completedSessionsCount}</span>
                    <span className="stat-label">Completados</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-icon">❌</span>
                    <span className="stat-value">{cancelledSessionsCount}</span>
                    <span className="stat-label">Cancelados</span>
                  </div>
                </div>

                <div className="session-filter-bar">
                  <button
                    className={`filter-btn ${sessionFilter === 'all' ? 'filter-btn--active' : ''}`}
                    onClick={() => setSessionFilter('all')}
                  >
                    Todas
                  </button>
                  <button
                    className={`filter-btn ${sessionFilter === 'completed' ? 'filter-btn--active' : ''}`}
                    onClick={() => setSessionFilter('completed')}
                  >
                    Completadas
                  </button>
                  <button
                    className={`filter-btn ${sessionFilter === 'cancelled' ? 'filter-btn--active' : ''}`}
                    onClick={() => setSessionFilter('cancelled')}
                  >
                    Canceladas
                  </button>
                </div>

                {filteredSessions.length === 0 ? (
                  <p className="stats-empty-msg">
                    No hay sesiones con este filtro.
                  </p>
                ) : (
                  <ul className="session-list">
                    {filteredSessions.map((session) => (
                      <li
                        key={session.id}
                        className={`session-item ${session.status}`}
                      >
                        <span className="session-date">
                          {new Date(session.startTime).toLocaleString()}
                        </span>
                        <span className="session-status-badge">
                          {session.status === 'completed'
                            ? '✅ Completado'
                            : '❌ Cancelado'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default StatisticsPage;
