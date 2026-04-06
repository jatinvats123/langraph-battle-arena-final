export default function Navbar({ hasResult }) {
  return (
    <nav
      id="navbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        paddingInline: '2rem',
        background: 'rgba(19,19,24,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(73,68,84,0.2)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #4cd7f6 0%, #8B5CF6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(76,215,246,0.3)',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
          </svg>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.125rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #4cd7f6 0%, #d0bcff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          AI Battle Arena
        </span>
      </div>

      {/* Center Badge */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'rgba(27,27,32,0.8)',
        border: '1px solid rgba(73,68,84,0.4)',
        borderRadius: 'var(--radius-full)',
        padding: '4px 14px',
        fontSize: '0.75rem',
        fontWeight: 500,
        color: 'var(--on-surface-muted)',
        fontFamily: 'var(--font-body)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: hasResult ? '#4cd7f6' : '#4ade80',
          boxShadow: hasResult ? '0 0 8px #4cd7f6' : '0 0 8px #4ade80',
          animation: 'pulseGlow 2s ease-in-out infinite',
        }} />
        {hasResult ? 'Battle Complete' : 'Ready to Battle'}
      </div>

      {/* Right Actions */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
        <button
          id="nav-docs-btn"
          style={{
            background: 'none',
            border: '1px solid rgba(73,68,84,0.4)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--on-surface-muted)',
            padding: '6px 16px',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: 500,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(76,215,246,0.4)';
            e.currentTarget.style.color = 'var(--primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(73,68,84,0.4)';
            e.currentTarget.style.color = 'var(--on-surface-muted)';
          }}
        >
          Docs
        </button>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #571bc1, #009eb9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8125rem',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'white',
          cursor: 'pointer',
          flexShrink: 0,
        }}>
          U
        </div>
      </div>
    </nav>
  );
}
