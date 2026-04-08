import { useState, useRef } from 'react';
import axios from 'axios';
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
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    }
  };

  const canSend = value.trim() && !isLoading;

  return (
    <div
      id="message-input-bar"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        padding: '1rem 0 1.5rem',
        background: 'linear-gradient(to top, var(--bg) 65%, transparent)',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.625rem',
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 'var(--radius-xl)',
            padding: '0.625rem 0.75rem',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
          }}
        >
          {/* Icon */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-md)',
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginBottom: 1,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
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
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
              minHeight: '34px',
              maxHeight: '160px',
              overflowY: 'auto',
              padding: '3px 0',
              caretColor: '#aaa',
            }}
          />

          {/* Hint */}
          <div style={{
            fontSize: '0.6875rem',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-end',
            marginBottom: 5,
            display: value ? 'none' : 'block',
          }}>
            ↵ Enter
          </div>

          {/* Send button */}
          <button
            id="send-button"
            onClick={handleSubmit}
            disabled={!canSend}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: canSend ? '#2a2a2a' : '#161616',
              border: `1px solid ${canSend ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.06)'}`,
              cursor: canSend ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (canSend) {
                e.currentTarget.style.background = '#383838';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.30)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = canSend ? '#2a2a2a' : '#161616';
              e.currentTarget.style.borderColor = canSend ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.06)';
            }}
          >
            {isLoading ? (
              <div style={{
                width: 14,
                height: 14,
                border: '2px solid rgba(255,255,255,0.15)',
                borderTopColor: 'rgba(255,255,255,0.7)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={canSend ? '#ccc' : '#444'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Status */}
        <div style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          fontSize: '0.6875rem',
          color: 'rgba(255,255,255,0.2)',
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
