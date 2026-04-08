export default function ProblemCard({ problem }) {
  return (
    <div
      id="problem-card"
      style={{
        background: 'var(--surface-1)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.75rem',
        border: '1px solid var(--border-subtle)',
        animation: 'fadeInUp 0.4s ease both',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Icon */}
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface-3)',
          border: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-body)',
            marginBottom: '0.5rem',
          }}>
            Problem Statement
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: '1.0625rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
          }}>
            {problem}
          </p>
        </div>
      </div>
    </div>
  );
}
