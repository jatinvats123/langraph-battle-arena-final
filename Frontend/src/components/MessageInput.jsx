import { useState, useRef } from 'react';

export default function MessageInput({ onSubmit, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    // Auto-resize
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  return (
    <div
      id="message-input-bar"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        padding: '1rem 0 1.5rem',
        background: 'linear-gradient(to top, var(--bg) 70%, transparent)',
      }}
    >
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '0 1.5rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '0.75rem',
          background: 'var(--surface-high)',
          border: '1px solid rgba(73,68,84,0.4)',
          borderRadius: 'var(--radius-xl)',
          padding: '0.75rem 0.875rem',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(76,215,246,0.05)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(76,215,246,0.35)';
            e.currentTarget.style.boxShadow = '0 -4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(76,215,246,0.1), 0 0 40px rgba(76,215,246,0.06)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(73,68,84,0.4)';
            e.currentTarget.style.boxShadow = '0 -4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(76,215,246,0.05)';
          }}
        >
          {/* Icon */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(76,215,246,0.08)',
            border: '1px solid rgba(76,215,246,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginBottom: 1,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4cd7f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Textarea */}
          <textarea
            id="problem-input"
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Describe your problem… e.g. 'Write a function to reverse a linked list'"
            disabled={isLoading}
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              color: 'var(--on-surface)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              minHeight: '36px',
              maxHeight: '160px',
              overflowY: 'auto',
              padding: '4px 0',
              caretColor: '#4cd7f6',
            }}
          />

          {/* Hint */}
          <div style={{
            fontSize: '0.6875rem',
            color: 'rgba(149,142,160,0.6)',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-end',
            marginBottom: 6,
            display: value ? 'none' : 'block',
          }}>
            ↵ Enter
          </div>

          {/* Send button */}
          <button
            id="send-button"
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: value.trim() && !isLoading
                ? 'linear-gradient(135deg, #4cd7f6, #009eb9)'
                : 'rgba(73,68,84,0.3)',
              border: 'none',
              cursor: value.trim() && !isLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.25s',
              boxShadow: value.trim() && !isLoading ? '0 0 16px rgba(76,215,246,0.35)' : 'none',
            }}
            onMouseEnter={e => {
              if (value.trim() && !isLoading) {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(76,215,246,0.55)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = value.trim() && !isLoading ? '0 0 16px rgba(76,215,246,0.35)' : 'none';
            }}
          >
            {isLoading ? (
              <div style={{
                width: 16,
                height: 16,
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Status text */}
        <div style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          fontSize: '0.6875rem',
          color: 'rgba(149,142,160,0.5)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.04em',
        }}>
          {isLoading
            ? '⚡ AI models are battling…'
            : 'Press Enter to send · Shift+Enter for new line'}
        </div>
      </div>
    </div>
  );
}
