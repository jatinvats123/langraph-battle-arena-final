import React from 'react';

export default function Navbar({ hasResult, onBack }) {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  React.useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <nav
      id="navbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        paddingInline: '2rem',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid var(--border-default)`,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Back Button - Only shown when hasResult */}
      {hasResult && (
        <button
          id="back-button"
          onClick={onBack}
          style={{
            background: isDarkMode ? 'none' : 'var(--button-bg)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.15)' : 'none',
            borderRadius: 'var(--radius-full)',
            color: isDarkMode ? 'var(--text-secondary)' : 'var(--button-text)',
            padding: '8px 16px',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            transition: 'all 0.2s, opacity 0.2s',
            fontWeight: 500,
            marginRight: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Back
        </button>
      )}

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: 'var(--surface-1)',
          border: `1px solid var(--border-default)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracotta)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 18V5"/>
            <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/>
            <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/>
            <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/>
            <path d="M18 18a4 4 0 0 0 2-7.464"/>
            <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/>
            <path d="M6 18a4 4 0 0 1-2-7.464"/>
            <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>
          </svg>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: '1.0625rem',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
        }}>
          Duel AI
        </span>
      </div>

      {/* Center badge */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--surface-2)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-full)',
        padding: '4px 14px',
        fontSize: '0.6875rem',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hasResult ? '#d0d0d0' : '#888',
        }} />
        {hasResult ? 'Battle Complete' : 'Ready to Battle'}
      </div>

      {/* Right actions */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-300"
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center text-sm ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          >
          </div>
        </button>

        <button
          id="nav-docs-btn"
          style={{
            background: isDarkMode ? 'none' : 'var(--button-bg)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderRadius: 'var(--radius-full)',
            color: isDarkMode ? 'var(--text-secondary)' : 'var(--button-text)',
            padding: '8px 16px',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            transition: 'all 0.2s, opacity 0.2s',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.85';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          Docs
        </button>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--surface-4)',
          border: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8125rem',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          flexShrink: 0,
        }}>
          U
        </div>
      </div>
    </nav>
  );
}
