export default function Navbar({ hasResult }) {
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
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#e0e0e0" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.0625rem',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
        }}>
          AI Battle Arena
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
        <button
          id="nav-docs-btn"
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-secondary)',
            padding: '5px 14px',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.color = 'var(--text-secondary)';
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
