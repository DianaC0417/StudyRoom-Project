import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/UserMenuNavbar.css';

interface UserMenuNavbarProps {
  title: string;
  onLogout: () => void;
}

const UserMenuNavbar = ({ title, onLogout }: UserMenuNavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const openLogoutModal = () => {
    closeMenu();
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLogoutModal(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const menuItems = [
    {
      path: '/customization',
      label: 'Customization',
      icon: '>',
    },
    {
      path: '/user-settings',
      label: 'User Settings',
      icon: '>',
    },
    {
      path: '/statistics',
      label: 'Statistics',
      icon: '>',
    },
  ];

  return (
    <>
      <nav className="user-navbar">
        <h1 className="user-navbar-title">{title}</h1>

        <button
          className={`user-hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open user menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`user-menu-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      <aside className={`user-menu-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="user-menu-header">
          <img
            src="/assets/extras/BIT_STUDY_WHITE.png"
            alt="BitStudy"
            className="user-menu-logo"
          />
        </div>

        <nav className="user-menu-panel" aria-label="User navigation">
          {menuItems.map((item) =>
            isActive(item.path) ? (
              <span key={item.path} className="user-menu-item active disabled">
                <span className="user-menu-icon">{item.icon}</span>
                {item.label}
              </span>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="user-menu-item"
              >
                <span className="user-menu-icon">{item.icon}</span>
                {item.label}
              </Link>
            )
          )}

          <button
            type="button"
            onClick={openLogoutModal}
            className="user-menu-item logout-item"
          >
            <span className="user-menu-icon">&gt;</span>
            Log out
          </button>
        </nav>
      </aside>

      {showLogoutModal && (
        <div className="logout-modal-backdrop" onClick={cancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Leave site?</h2>
            <p>Are you sure you want to leave?</p>

            <div className="logout-modal-actions">
              <button
                type="button"
                className="logout-cancel-btn"
                onClick={cancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-confirm-btn"
                onClick={confirmLogout}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenuNavbar;
